import { Colors } from "@/constants/colors";
import { useCategory } from "@/context/CategoriesContext";
import { Category } from "@/types/categories";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CategoriesScreen() {
  const { allCategories } = useCategory();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Categories</Text>
          <Text style={styles.headerSub}>
            {allCategories.length} categories available
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={() => router.push("/(modals)/addCategoryModal")}
        >
          <AntDesign name="plus" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {allCategories.map((item: Category) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={styles.categoryCard}
            onPress={() =>
              router.push({
                pathname: "/category/[id]",
                params: { id: item.id },
              })
            }
          >
            <View style={styles.iconContainer}>
              <Image source={item.icon} style={styles.icon} />
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSub}>Tap to browse services</Text>
            </View>

            <View style={styles.arrowContainer}>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: Colors.headerBackground,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.white,
  },
  headerSub: {
    fontSize: 13,
    color: Colors.white54,
    marginTop: 2,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  // List
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 14,
  },

  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.heading,
  },
  cardSub: {
    fontSize: 12,
    color: Colors.placeholder,
    marginTop: 3,
  },
  arrowContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
});
