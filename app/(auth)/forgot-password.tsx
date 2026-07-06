import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenContainer from "@/components/ScreenContainer";
import { Colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import forgotPasswordImage from "@/assets/images/forgetPasswordScreenImage.png";

const ForgetPassword = () => {
  const router = useRouter();
  const { userRole } = useLocalSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Top Left Circles */}
        <View style={styles.largeCircle} />
        <View style={styles.smallCircle} />

        {/* Illustration */}
        <View style={styles.imageContainer}>
          <Image style={styles.containerImage} source={forgotPasswordImage} />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.headingText}>Forget Password</Text>

            <Text style={styles.subHeadingText}>
              Opps. It happens to the best of us. Input your email to fix the
              issue.
            </Text>
          </View>

          <View style={styles.formInputContainer}>
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
          </View>

          <Button
            onPress={() => {}}
            textColor={Colors.white}
            style={{
              backgroundColor: isFormValid ? Colors.primary : "#BFC8D4",
              borderRadius: 30,
            }}
          >
            Submit
          </Button>
        </View>

        {/* Footer */}
      </View>
    </ScreenContainer>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    position: "relative",
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    paddingTop: 10,
  },

  containerImage: {
    width: 170,
    height: 170,
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
    marginTop: 40,
    gap: 20,
  },

  formInputContainer: {
    flex: 1,
    gap: 20,
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
