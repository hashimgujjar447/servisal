import { Colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const getIcon = (routeName: string, focused: boolean) => {
    const color = focused ? Colors.primary : "#7B7F87";
    const size = 24;

    switch (routeName) {
      case "index":
        return <Ionicons name="home-outline" size={size} color={color} />;

      case "categories":
        return <Ionicons name="grid-outline" size={size} color={color} />;

      case "chat":
        return (
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={size}
            color={color}
          />
        );

      case "settings":
        return <Ionicons name="settings-outline" size={size} color={color} />;

      default:
        return <Ionicons name="ellipse-outline" size={size} color={color} />;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel?.toString() ?? options.title ?? route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.tab}
          >
            {focused ? (
              <View style={styles.activeTab}>{getIcon(route.name, true)}</View>
            ) : (
              <View>{getIcon(route.name, false)}</View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: Colors.tabBg,

    paddingHorizontal: 15,
    paddingVertical: 18,

    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,

    elevation: 15,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -4,
    },
  },

  tab: {
    flex: 1,
    alignItems: "center",
  },

  activeTab: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#22334C",
    justifyContent: "center",
    alignItems: "center",
  },

  activeText: {
    marginLeft: 8,

    color: Colors.primary,

    fontSize: 16,
    fontWeight: "600",
  },
});
