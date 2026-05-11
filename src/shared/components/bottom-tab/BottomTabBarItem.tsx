import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import TabBarIcon from "./TabBarIcon";
type TabIconName = React.ComponentProps<typeof Ionicons>["name"];

interface BottomTabBarItemProps {
  onTabPress: () => void;
  color: string;
  label: string;
  icon: TabIconName;
}

const BottomTabBarItem = ({
  onTabPress,
  color,
  label,
  icon,
}: BottomTabBarItemProps) => {
  return (
    <TouchableOpacity onPress={onTabPress} style={styles.tabBarItem}>
      <TabBarIcon name={icon} color={color} size={26} />
      <Text style={[styles.tabBarLabelStyle, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default BottomTabBarItem;

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    alignItems: "center",
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
});
