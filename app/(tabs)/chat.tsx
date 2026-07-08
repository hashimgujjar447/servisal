import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      {/* Empty State */}
      <View style={styles.center}>
        <View style={styles.iconCircle}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={48}
            color={Colors.primary}
          />
        </View>
        <Text style={styles.emptyTitle}>This is Chat Page</Text>
        <Text style={styles.emptySubtitle}>
          Coming soon — messaging feature is under development.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.headerBackground,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.white,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.heading,
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.placeholder,
    textAlign: "center",
    lineHeight: 21,
  },
});
