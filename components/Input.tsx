import { Colors } from "@/constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import React, { ReactNode, useState } from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type InputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;

  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;

  leftIcon?: ReactNode;
  eyeOpenIcon?: ReactNode;
  eyeCloseIcon?: ReactNode;

  style?: StyleProp<ViewStyle>;
} & TextInputProps;

const Input = ({
  placeholder,
  value,
  onChangeText,

  keyboardType = "default",
  secureTextEntry = false,

  leftIcon,
  eyeOpenIcon,
  eyeCloseIcon,

  style,

  ...rest
}: InputProps) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[styles.container, isFocused && styles.focusedContainer, style]}
    >
      {leftIcon}

      <TextInput
        {...rest}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={hidePassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {secureTextEntry && (
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          {hidePassword ? eyeCloseIcon : eyeOpenIcon}
        </TouchableOpacity>
      )}

      {placeholder.includes("Search") && value.length > 0 && (
        <Entypo
          onPress={() => {
            onChangeText("");
          }}
          name="cross"
          size={24}
          color="black"
        />
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    height: 55,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 24,

    paddingHorizontal: 16,

    flexDirection: "row",
    alignItems: "center",
    gap: 10,

    backgroundColor: Colors.inputBg,
  },

  focusedContainer: {
    borderColor: Colors.primary,
    color: Colors.primary,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.heading,
  },
});
