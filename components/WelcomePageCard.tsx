import React, { Dispatch, SetStateAction } from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import Checkbox from "./CheckBox";

export type UserRole = "" | "user" | "provider";

type WelcomePageCardProps = {
  checkboxLabel: string;
  image: ImageSourcePropType;
  role: Exclude<UserRole, "">;
  agree: UserRole;
  setAgree: Dispatch<SetStateAction<UserRole>>;
};

const WelcomePageCard = ({
  checkboxLabel,
  image,
  role,
  agree,
  setAgree,
}: WelcomePageCardProps) => {
  return (
    <View style={styles.container}>
      <Checkbox
        checked={agree === role}
        onPress={() => setAgree(role)}
        label={checkboxLabel}
      />

      <Image source={image} style={styles.image} />
    </View>
  );
};

export default WelcomePageCard;

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  image: {
    resizeMode: "cover",
  },
});
