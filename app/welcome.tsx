import Button from "@/components/Button";
import ScreenContainer from "@/components/ScreenContainer";
import WelcomePageCard, { type UserRole } from "@/components/WelcomePageCard";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import roleScreenImageOne from "../assets/images/roleScreenImageOne.png";
import roleScreenImageTwo from "../assets/images/roleScreenImageTwo.png";
const Welcome = () => {
  const [agree, setAgree] = useState<UserRole>("");
  const router = useRouter();

  const handlePress = () => {
    if (!agree.trim()) {
      return Alert.alert("Role", "Please select a valid role");
    }

    router.push({
      pathname: "/(tabs)",
      params: {
        userRole: agree,
      },
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View>
          <Text style={styles.headingText}>Are You!</Text>
          <Text style={styles.subHeadingText}>
            Please Select your role for this app.
          </Text>
        </View>
        <View style={styles.cardsContainer}>
          <WelcomePageCard
            checkboxLabel="User Side"
            role="user"
            agree={agree}
            setAgree={setAgree}
            image={roleScreenImageOne}
          />

          <Text style={styles.orText}>-Or-</Text>
          <WelcomePageCard
            checkboxLabel="Service Provider"
            role="provider"
            agree={agree}
            setAgree={setAgree}
            image={roleScreenImageTwo}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button
            onPress={handlePress}
            style={{ backgroundColor: "#0474ED", width: 140, borderRadius: 70 }}
            textColor="white"
          >
            Continue
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
  },
  headingText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeadingText: {
    fontSize: 13,
    fontWeight: "regular",
    color: Colors.placeholder,
    marginBottom: 10,
  },
  cardsContainer: {
    flex: 1,
    width: "100%",
    gap: 20,
    paddingTop: 20,
  },
  orText: {
    color: Colors.placeholder,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "medium",
  },
  btnContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row",
    position: "relative",
    bottom: 20,
  },
});
