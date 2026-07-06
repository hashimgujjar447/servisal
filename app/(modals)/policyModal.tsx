import Button from "@/components/Button";
import Checkbox from "@/components/CheckBox";
import ModalHeader from "@/components/ModalHeader";
import { useAuth } from "@/context/RegisterContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

const PolicyModal = () => {
  const [accepted, setAccepted] = useState(false);
  const { registerData, setRegisterData } = useAuth();
  const router = useRouter();

  const handleSubmit = () => {
    if (!accepted) {
      Alert.alert(
        "Privacy Policy",
        "Please accept the Privacy Policy to continue.",
      );
      return;
    }

    setRegisterData((prev) => {
      const data = { ...prev };
      prev.acceptedPolicy = accepted;
      return data;
    });

    router.push("/(auth)/verify-page");
  };

  return (
    <View style={{ flex: 1 }}>
      <ModalHeader text="Privacy Policy" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.paragraph}>
          Welcome to Sarcon Services. Your privacy is important to us. This
          Privacy Policy explains how we collect, use, and protect your personal
          information when you use our application.
        </Text>

        <Text style={styles.heading}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We may collect your name, email address, phone number, profile
          information, location, and other information required to provide our
          services.
        </Text>

        <Text style={styles.heading}>2. Location Access</Text>
        <Text style={styles.paragraph}>
          We use your location to help you find nearby services and improve your
          experience within the app.
        </Text>

        <Text style={styles.heading}>3. Data Usage</Text>
        <Text style={styles.paragraph}>
          Your information is used only to provide services, improve the app,
          and communicate with you when necessary.
        </Text>

        <Text style={styles.heading}>4. Data Security</Text>
        <Text style={styles.paragraph}>
          We take reasonable measures to protect your personal information from
          unauthorized access or misuse.
        </Text>

        <Text style={styles.heading}>5. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions regarding this Privacy Policy, please
          contact the Sarcon Services support team.
        </Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            checked={accepted}
            onPress={() => setAccepted(!accepted)}
            label="I have read and accept all Privacy Policies."
          />
        </View>

        <Button
          onPress={handleSubmit}
          textColor="#fff"
          style={[
            styles.button,
            {
              backgroundColor: accepted ? "#0474ED" : "#BFC5D2",
            },
          ]}
        >
          Submit
        </Button>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default PolicyModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: "#555",
  },
  checkboxContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    height: 50,
    borderRadius: 10,
  },
});
