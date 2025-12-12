import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneNumberScreen from "../screens/PhoneNumberScreen";
import OTPScreen from "../screens/OTPScreen";

export type AuthStackParamList = {
    PhoneNumber: undefined;
    OTP: { phone: string };
  };

const StackNavigator = () => {
 

  const Stack = createNativeStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PhoneNumber"
        component={PhoneNumberScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
