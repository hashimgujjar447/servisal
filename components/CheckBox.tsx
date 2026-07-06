import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  checked: boolean;
  onPress: () => void;
  label: string;
};

const Checkbox = ({ checked, onPress, label }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Ionicons
        name={checked ? "checkbox" : "square-outline"}
        size={22}
        color="#0474ED"
      />

      <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: "bold" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Checkbox;
