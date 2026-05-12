import { Ionicons } from "@expo/vector-icons";
import React from "react";

type TabIconName = React.ComponentProps<typeof Ionicons>["name"];

interface TabBarIconProps {
  name: TabIconName;
  color?: string;
  size?: number;
}

const TabBarIcon = ({ name, color, size = 24 }: TabBarIconProps) => {
  return <Ionicons name={name} size={size} color={color} />;
};

export default TabBarIcon;
