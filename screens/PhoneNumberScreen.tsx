import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Colors } from "../constants/colors";
import { AuthStackParamList } from "../navigation/StackNavigator";
import { supabase } from "../config/supabaseClient";

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "PhoneNumber"
>;

const PhoneNumberScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert("Error", "Please enter a valid 10 digit no");
      return;
    }

    setLoading(true);
    const fullNumber = `+90${phoneNumber}`;

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: fullNumber,
        options: {
          channel: "sms",
        },
      });
      console.log("Error", error);
      if (error) {
        Alert.alert("Error", error.message);
        setLoading(false);
        return;
      }

      Alert.alert("Succes", "otp Sent successfully");
      navigation.navigate("OTP",{
          phone:fullNumber
      })
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login or Sign Up</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Enter your phone number to continue</Text>

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor={Colors.gray}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
            autoFocus
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
        onPress={handleSendOtp}
          style={[styles.continueButton, loading && styles.buttonDisabled]}
          disabled={loading}
        >
          <Text style={styles.continueButtonText}>
            {loading ? "Sending..." : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  content: {
    paddingHorizontal: 15,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    paddingVertical: 15,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: Colors.gray,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PhoneNumberScreen;
