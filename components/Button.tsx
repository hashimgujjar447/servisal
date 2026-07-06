import React, { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  children: ReactNode | string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textColor: string;
};

const Button = ({
  children,
  onPress,
  style,
  textColor = "#FFFFFF",
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, style]}
    >
      <Text style={[styles.text, { color: textColor }]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 50,

    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
