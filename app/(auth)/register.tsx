import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenContainer from "@/components/ScreenContainer";
import { Colors } from "@/constants/colors";
import { useAuth } from "@/context/RegisterContext";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";

import registerScreenFrontImage from "../../assets/images/registerScreenFrontImage.png";

const Register = () => {
  const router = useRouter();
  const { userRole } = useLocalSearchParams();

  const { setRegisterData } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "";

  const handleSignUp = () => {
    if (!isFormValid) {
      Alert.alert("Required", "Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password", "Passwords do not match.");
      return;
    }

    setRegisterData({
      role: userRole as string,
      name,
      email,
      phone,
      password,
      confirmPassword,
      location: "",
      acceptedPolicy: false,
    });

    router.push("/(modals)/locationModal");
  };

  return (
    <ScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Top Left Circles */}
          <View style={styles.largeCircle} />
          <View style={styles.smallCircle} />

          {/* Illustration */}
          <View style={styles.imageContainer}>
            <Image
              style={styles.containerImage}
              source={registerScreenFrontImage}
            />
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View>
              <Text style={styles.headingText}>Sign Up</Text>

              <Text style={styles.subHeadingText}>
                Please Sign Up to join us
              </Text>
            </View>

            <View style={styles.formInputContainer}>
              <Input
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                leftIcon={
                  <Feather name="user" size={18} color={Colors.placeholder} />
                }
              />

              <Input
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={
                  <Feather name="mail" size={18} color={Colors.placeholder} />
                }
              />

              <Input
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                leftIcon={
                  <Feather name="phone" size={18} color={Colors.placeholder} />
                }
              />

              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                leftIcon={
                  <Feather name="lock" size={18} color={Colors.placeholder} />
                }
                eyeOpenIcon={
                  <Feather name="eye" size={18} color={Colors.placeholder} />
                }
                eyeCloseIcon={
                  <Feather
                    name="eye-off"
                    size={18}
                    color={Colors.placeholder}
                  />
                }
              />

              <Input
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                leftIcon={
                  <Feather name="lock" size={18} color={Colors.placeholder} />
                }
                eyeOpenIcon={
                  <Feather name="eye" size={18} color={Colors.placeholder} />
                }
                eyeCloseIcon={
                  <Feather
                    name="eye-off"
                    size={18}
                    color={Colors.placeholder}
                  />
                }
              />
            </View>

            <Button
              onPress={handleSignUp}
              textColor={Colors.white}
              style={{
                backgroundColor: isFormValid ? Colors.primary : "#BFC8D4",
                borderRadius: 30,
              }}
            >
              Sign Up
            </Button>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text
                style={styles.signUpText}
                onPress={() => router.push("/login")}
              >
                Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    position: "relative",
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 10,
  },

  containerImage: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },

  largeCircle: {
    position: "absolute",
    top: -30,
    left: -80,

    width: 120,
    height: 120,
    borderRadius: 60,

    backgroundColor: Colors.primary,
    zIndex: 1,
  },

  smallCircle: {
    position: "absolute",
    top: -60,
    left: -35,

    width: 100,
    height: 100,
    borderRadius: 50,

    backgroundColor: Colors.primaryLight,
    zIndex: 2,
  },

  formContainer: {
    flex: 1,
    marginTop: 10,
    gap: 20,
  },

  formInputContainer: {
    gap: 20,
    paddingBottom: 20,
  },

  headingText: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.heading,
    marginBottom: 5,
  },

  subHeadingText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.placeholder,
  },

  forgotPasswordText: {
    textAlign: "right",
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 14,
  },

  footer: {
    marginTop: 20,
    marginBottom: 10,
  },

  footerText: {
    textAlign: "center",
    fontSize: 15,
    color: Colors.heading,
  },

  signUpText: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
