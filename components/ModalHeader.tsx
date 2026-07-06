import { Colors } from "@/constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type ModalHeaderProps = {
  text: string;
};
const ModalHeader = ({ text }: ModalHeaderProps) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => router.back()}
      >
        <Entypo name="chevron-left" size={22} color="white" />

        <Text style={styles.textColor}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: Colors.headerBackground,

    borderBottomLeftRadius: 50,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textColor: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});
