import { Colors } from "@/constants/colors";
import { Category } from "@/types/categories";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
const CategoryCard = ({
  category,
  selectedCategory,
}: {
  category: Category;
  selectedCategory: string;
}) => {
  console.log(category);
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor:
            selectedCategory === category.id ? Colors.primary : "#FAFAFB",
        },
      ]}
    >
      <Image
        style={{ height: 62, width: 62, resizeMode: "contain" }}
        source={category.icon}
      />
      <Text
        style={{
          textAlign: "center",
          paddingTop: 5,
          fontSize: 12,
          fontWeight: "500",
          color: selectedCategory === category.id ? "#fff" : Colors.black,
        }}
      >
        {category.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    width: "29%",
    height: 130,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    padding: 10,
  },
});
