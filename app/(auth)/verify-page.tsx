import Button from "@/components/Button";
import ScreenContainer from "@/components/ScreenContainer";
import { Colors } from "@/constants/colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { useRouter } from "expo-router";
import accountSendMail from "../../assets/images/accountSendMail.png";

const AccountVerifyScreen = () => {
  const router = useRouter();
  const handleVerify = () => {
    router.push("/(auth)/login");
  };
  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Top Left Circles */}
        <View style={styles.largeCircle} />
        <View style={styles.smallCircle} />

        {/* Illustration */}
        <View style={styles.imageContainer}>
          <Image style={styles.containerImage} source={accountSendMail} />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.headingText}>Email verification</Text>

            <Text style={styles.subHeadingText}>
              We send link at your email abc123@gmail.com verify it
            </Text>
          </View>

          <Button
            onPress={handleVerify}
            textColor={Colors.white}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 30,
            }}
          >
            Back to Login
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default AccountVerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 10,
  },

  containerImage: {
    width: 150,
    height: 150,
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
    marginTop: 30,
    gap: 20,
  },

  formInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  headingText: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 5,
    textAlign: "center",
  },

  subHeadingText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.placeholder,
    lineHeight: 22,
    textAlign: "center",
  },

  otpCodeBox: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 15,
    fontSize: 24,
    fontWeight: "700",
    color: Colors.heading,
    textAlign: "center",
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
