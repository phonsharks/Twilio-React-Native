import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "./config/supabaseClient";
import HomeStack from "./navigation/HomeStack";
import StackNavigator from "./navigation/StackNavigator";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const debugAsyncStorage = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const sessionKey = keys.find(
          (key) => key.includes("sb-") && key.includes("-authtoken")
        );
        if (sessionKey) {
          const sessionData = await AsyncStorage.getItem(sessionKey);
          console.log("Supabase session data in asyncstorage", sessionData);
        } else {
          console.log("No supabase session found in AsyncStorage");
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    const checkSession = async () => {
      try {
        await debugAsyncStorage();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log(
          "Initial session",
          session ? "User is authenticated" : "No session is found"
        );
        setIsAuthenticated(!!session);
      } catch (error) {
        console.log("Error checking session", error);
        setIsAuthenticated(false);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth State Changed:", { event, session });
        setIsAuthenticated(!!session);

        debugAsyncStorage();
      }
    );

    // Cleanup the listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <HomeStack/> : <StackNavigator/>}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
