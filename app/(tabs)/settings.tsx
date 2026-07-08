import { Colors } from "@/constants/colors";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SettingRowProps = {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
};

const SettingRow = ({
  icon,
  label,
  sublabel,
  onPress,
  rightElement,
}: SettingRowProps) => (
  <TouchableOpacity
    style={styles.row}
    activeOpacity={onPress ? 0.7 : 1}
    onPress={onPress}
  >
    <View style={styles.rowIcon}>{icon}</View>
    <View style={styles.rowInfo}>
      <Text style={styles.rowLabel}>{label}</Text>
      {sublabel ? <Text style={styles.rowSublabel}>{sublabel}</Text> : null}
    </View>
    {rightElement ?? (
      <Ionicons name="chevron-forward" size={18} color={Colors.placeholder} />
    )}
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>MH</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Muhammad Hashim</Text>
            <Text style={styles.profileEmail}>hashim@servisal.com</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Feather name="edit-2" size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.card}>
          <SettingRow
            icon={
              <Ionicons name="person-outline" size={20} color={Colors.primary} />
            }
            label="Edit Profile"
            sublabel="Update your personal info"
          />
          <View style={styles.divider} />
          <SettingRow
            icon={<Feather name="lock" size={20} color={Colors.primary} />}
            label="Change Password"
            sublabel="Keep your account secure"
          />
          <View style={styles.divider} />
          <SettingRow
            icon={
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={20}
                color={Colors.primary}
              />
            }
            label="Manage Address"
            sublabel="Faisalabad, Pakistan"
          />
        </View>

        {/* Preferences Section */}
        <Text style={styles.sectionLabel}>Preferences</Text>
        <View style={styles.card}>
          <SettingRow
            icon={
              <Ionicons
                name="notifications-outline"
                size={20}
                color={Colors.primary}
              />
            }
            label="Push Notifications"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{
                  false: Colors.border,
                  true: Colors.primary,
                }}
                thumbColor={Colors.white}
              />
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon={
              <Ionicons name="moon-outline" size={20} color={Colors.primary} />
            }
            label="Dark Mode"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{
                  false: Colors.border,
                  true: Colors.primary,
                }}
                thumbColor={Colors.white}
              />
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon={
              <Ionicons name="language-outline" size={20} color={Colors.primary} />
            }
            label="Language"
            sublabel="English"
          />
        </View>

        {/* Support Section */}
        <Text style={styles.sectionLabel}>Support</Text>
        <View style={styles.card}>
          <SettingRow
            icon={
              <Ionicons
                name="help-circle-outline"
                size={20}
                color={Colors.primary}
              />
            }
            label="Help & Support"
          />
          <View style={styles.divider} />
          <SettingRow
            icon={
              <Ionicons
                name="document-text-outline"
                size={20}
                color={Colors.primary}
              />
            }
            label="Privacy Policy"
          />
          <View style={styles.divider} />
          <SettingRow
            icon={
              <AntDesign name="infocirlceo" size={20} color={Colors.primary} />
            }
            label="About App"
            sublabel="Version 1.0.0"
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <Feather name="log-out" size={18} color={Colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
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

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  // Profile Card
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.heading,
  },
  profileEmail: {
    fontSize: 12,
    color: Colors.placeholder,
    marginTop: 2,
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },

  // Section
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.placeholder,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
    marginLeft: 4,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  rowInfo: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.heading,
  },
  rowSublabel: {
    fontSize: 12,
    color: Colors.placeholder,
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#F3F3F3",
    marginLeft: 66,
  },

  // Logout
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: Colors.error,
    marginBottom: 10,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.error,
  },
});
