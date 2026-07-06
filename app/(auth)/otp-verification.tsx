import Button from "@/components/Button";
import ScreenContainer from "@/components/ScreenContainer";
import { Colors } from "@/constants/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

import accountVerifySuccessImage from "../../assets/images/accountVerifySuccessImage.png";

const AccountVerificationScreen = () => {
  const router = useRouter();
  const { userRole } = useLocalSearchParams();

  const [otpCode, setOtpCode] = useState(["", "", "", ""]);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  const isFormValid = otpCode.every((digit) => digit !== "");

  const handleOtpChange = (text: string, index: number) => {
    // Allow only numbers
    if (!/^\d?$/.test(text)) return;

    const updatedOtp = [...otpCode];
    updatedOtp[index] = text;
    setOtpCode(updatedOtp);

    // Move to next input
    if (text && index < otpCode.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otp = otpCode.join("");

    console.log("OTP:", otp);

    // Verify API here
    // router.push(...)
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Top Left Circles */}
        <View style={styles.largeCircle} />
        <View style={styles.smallCircle} />

        {/* Illustration */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.containerImage}
            source={accountVerifySuccessImage}
          />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.headingText}>Enter OTP</Text>

            <Text style={styles.subHeadingText}>
              Enter the OTP sent to your email for verification.
            </Text>
          </View>

          <View style={styles.formInputContainer}>
            {otpCode.map((code, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={styles.otpCodeBox}
                value={code}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === "Backspace" &&
                    !otpCode[index] &&
                    index > 0
                  ) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
              />
            ))}
          </View>

          <Button
            onPress={handleVerify}
            textColor={Colors.white}
            style={{
              backgroundColor: isFormValid ? Colors.primary : "#BFC8D4",
              borderRadius: 30,
            }}
          >
            Verify
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default AccountVerificationScreen;

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
    width: 180,
    height: 180,
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
    color: Colors.heading,
    marginBottom: 5,
  },

  subHeadingText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.placeholder,
    lineHeight: 22,
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
