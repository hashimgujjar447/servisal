import Button from "@/components/Button";
import { Colors } from "@/constants/colors";
import { useCategory } from "@/context/CategoriesContext";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Available icons to pick from
const ICON_OPTIONS = [
  { label: "Drill", icon: require("../../assets/icons/drill.png") },
  { label: "Hammer", icon: require("../../assets/icons/hammer.png") },
  { label: "Saw", icon: require("../../assets/icons/saw.png") },
  { label: "Crane", icon: require("../../assets/icons/crane.png") },
  { label: "AC", icon: require("../../assets/icons/ac.png") },
  { label: "Garden", icon: require("../../assets/icons/garden.png") },
];

export default function AddCategoryModal() {
  const router = useRouter();
  const { allCategories, setAllCategories } = useCategory();

  const [name, setName] = useState("");
  const [selectedIconIndex, setSelectedIconIndex] = useState<number | null>(
    null,
  );

  const handleAdd = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a category name.");
      return;
    }
    if (selectedIconIndex === null) {
      Alert.alert("Error", "Please select an icon.");
      return;
    }

    const newCategory = {
      id: String(Date.now()),
      title: name.trim(),
      icon: ICON_OPTIONS[selectedIconIndex].icon,
    };

    setAllCategories([...allCategories, newCategory]);
    Alert.alert("Success", `"${name.trim()}" category added!`, [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <AntDesign name="arrowleft" size={20} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Category</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Category Name */}
          <Text style={styles.label}>Category Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Plumbing Tools"
            placeholderTextColor={Colors.placeholder}
            value={name}
            onChangeText={setName}
          />

          {/* Icon Picker */}
          <Text style={[styles.label, { marginTop: 24 }]}>Select Icon</Text>
          <View style={styles.iconsGrid}>
            {ICON_OPTIONS.map((opt, index) => {
              const selected = selectedIconIndex === index;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => setSelectedIconIndex(index)}
                  style={[styles.iconOption, selected && styles.iconSelected]}
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-require-imports */}
                  <View
                    style={[
                      styles.iconBox,
                      selected && styles.iconBoxSelected,
                    ]}
                  >
                    {/* We render image inline */}
                    {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
                    <Text style={{ fontSize: 28 }}>
                      {["🔧", "🔨", "🪚", "🏗️", "❄️", "🌿"][index]}
                    </Text>
                  </View>
                  <Text
                    style={[styles.iconLabel, selected && styles.iconLabelSel]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ height: 40 }} />

          <Button
            onPress={handleAdd}
            textColor={Colors.white}
            style={styles.addBtn}
          >
            Add Category
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: Colors.headerBackground,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.white,
  },

  // Content
  content: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.heading,
    marginBottom: 10,
  },

  input: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.heading,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  // Icons Grid
  iconsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  iconOption: {
    alignItems: "center",
    width: 90,
    borderRadius: 14,
    padding: 10,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: "transparent",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  iconSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F0F0F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  iconBoxSelected: {
    backgroundColor: Colors.white,
  },
  iconLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.text,
  },
  iconLabelSel: {
    color: Colors.primary,
  },

  addBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    height: 54,
  },
});
