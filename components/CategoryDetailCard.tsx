import { Colors } from "@/constants/colors";
import { Service } from "@/types/service";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type ServiceCardProps = {
  item: Service;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const CategoryDetailCard = ({ item, onPress, style }: ServiceCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <AntDesign
              key={star}
              name={star <= Math.floor(item.rating) ? "star" : "staro"}
              size={10}
              color="#FFC107"
            />
          ))}
        </View>
        <Text style={styles.price}>${item.price}/hr</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryDetailCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 10,
    width: 165,
    height: 180,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  image: {
    height: 110,
    width: "100%",
    resizeMode: "cover",
  },

  content: {
    padding: 10,
    gap: 4,
  },

  ratingRow: {
    flexDirection: "row",
    gap: 2,
  },

  title: {
    fontSize: 12,
    fontWeight: "700",
    color: "#222",
  },

  price: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.primary,
  },
});
