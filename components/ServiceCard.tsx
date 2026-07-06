import { Service } from "@/types/service";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ServiceCardProps = {
  item: Service;
  onPress: () => void;
};

const ServiceCard = ({ item, onPress }: ServiceCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}/hr</Text>
        </View>

        <View style={styles.ratingRow}>
          <Text style={styles.stars}>
            {"★".repeat(item.rating)}
            {"☆".repeat(5 - item.rating)}
          </Text>

          <Text style={styles.reviewText}>({item.reviewCount} Reviews)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  image: {
    width: "100%",
    height: 170,
  },

  content: {
    padding: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  stars: {
    color: "#1976D2",
    fontSize: 16,
    marginRight: 6,
  },

  reviewText: {
    color: "#777",
    fontSize: 14,
  },
});
