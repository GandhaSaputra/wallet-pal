import { tabs } from "@/src/constants/tabRoutes";
import { Theme } from "@/src/constants/theme";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { NavigationRoute, ParamListBase } from "@react-navigation/native";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import BottomTabBarItem from "./BottomTabBarItem";

const BottomTab = (props: BottomTabBarProps) => {
  const { state, navigation } = props;
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(
    () => createStyles({ theme, insets }),
    [insets, theme],
  );

  const onTabPress = (
    isActive: boolean,
    route: NavigationRoute<ParamListBase, string>,
  ) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isActive && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <ThemedView style={styles.tabBarStyle}>
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const isActive = state.index === index;
          const icon = isActive
            ? tabs[index].iconFocusedName
            : tabs[index].iconUnfocusedName;
          const color = isActive
            ? theme.colors.tabIconSelected
            : theme.colors.tabIconDefault;

          return (
            <BottomTabBarItem
              key={route.name}
              onTabPress={() => onTabPress(isActive, route)}
              color={color}
              label={tabs[index].label}
              icon={icon}
              isActive={isActive}
            />
          );
        })}
      </View>
    </ThemedView>
  );
};

export default BottomTab;

const createStyles = ({
  theme,
  insets,
}: {
  theme: Theme;
  insets: EdgeInsets;
}) =>
  StyleSheet.create({
    tabBarStyle: {
      paddingTop: theme.spacing.sm,
      paddingBottom: insets.bottom || theme.spacing.xl,
      backgroundColor: theme.colors.tabBar,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingHorizontal: theme.spacing.sm,
    },
    tabBarContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
