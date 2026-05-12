import { Theme } from "@/src/constants/theme";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text/ThemedText";
import TabBarIcon from "./TabBarIcon";
type TabIconName = React.ComponentProps<typeof Ionicons>["name"];

interface BottomTabBarItemProps {
  onTabPress: () => void;
  color: string;
  label: string;
  icon: TabIconName;
  isActive: boolean;
}

const BottomTabBarItem = ({
  onTabPress,
  color,
  label,
  icon,
  isActive,
}: BottomTabBarItemProps) => {
  const theme = useTheme();
  const styles = createStyles({ theme, isActive });

  return (
    <TouchableOpacity onPress={onTabPress} style={styles.tabBarItem}>
      <View style={styles.wrapperItem}>
        <TabBarIcon name={icon} color={color} size={theme.iconSizes.default} />
        <ThemedText style={[styles.tabBarLabelStyle, { color }]}>
          {label}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default BottomTabBarItem;

const createStyles = ({
  theme,
  isActive,
}: {
  theme: Theme;
  isActive: boolean;
}) =>
  StyleSheet.create({
    tabBarItem: {
      flex: 1,
      alignItems: "center",
    },
    wrapperItem: {
      alignItems: "center",
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borders.sm,
      backgroundColor: isActive
        ? theme.colors.bottomBarSelectedWrapper
        : "transparent",
    },
    tabBarLabelStyle: {
      ...theme.fonts.labelSmall,
      marginTop: theme.spacing.xs,
    },
  });
