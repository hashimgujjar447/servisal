import Input from "@/components/Input";
import ModalHeader from "@/components/ModalHeader";
import { Colors } from "@/constants/colors";
import { useCategory } from "@/context/CategoriesContext";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoriesModal = () => {
  const { allCategories } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <ModalHeader text="All Categories" />

      <View style={styles.container}>
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          style={{ borderColor: Colors.placeholder }}
          leftIcon={<EvilIcons name="search" size={24} color="#999" />}
        />

        <View style={styles.listContainer}>
          {allCategories.map((item) => {
            const isSelected = selectedCategory === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedCategory(item.id);
                  router.push({
                    pathname: "/category/[id]",
                    params: { id: item.id },
                  });
                }}
                style={[styles.categoryCard, isSelected && styles.selectedCard]}
              >
                <View style={styles.iconContainer}>
                  <Image source={item.icon} style={styles.icon} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.title, isSelected && styles.selectedTitle]}
                  >
                    {item.title} Tools
                  </Text>

                  <Text
                    style={[
                      styles.serviceText,
                      isSelected && styles.selectedServiceText,
                    ]}
                  >
                    7 Service
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default CategoriesModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  listContainer: {
    marginTop: 20,
    gap: 14,
  },

  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 16,
    backgroundColor: "#FAFAFB",
    borderWidth: 1,
    borderColor: "#F3F3F3",
  },

  selectedCard: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 14,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  icon: {
    width: 42,
    height: 42,
    resizeMode: "contain",
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },

  selectedTitle: {
    color: "#fff",
  },

  serviceText: {
    marginTop: 4,
    fontSize: 13,
    color: "#8A8A8A",
  },

  selectedServiceText: {
    color: "#fff",
    opacity: 0.9,
  },
});
