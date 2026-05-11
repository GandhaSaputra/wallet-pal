import { tabs } from "@/src/constants/tabRoutes";
import { Colors } from "@/src/constants/theme";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useColorScheme } from "@/src/shared/hooks/useColorScheme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { NavigationRoute, ParamListBase } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import BottomTabBarItem from "./BottomTabBarItem";

const BottomTab = (props: BottomTabBarProps) => {
  const { state, navigation } = props;
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

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
            ? colors.tabIconSelected
            : colors.tabIconDefault;

          return (
            <BottomTabBarItem
              key={route.name}
              onTabPress={() => onTabPress(isActive, route)}
              color={color}
              label={tabs[index].label}
              icon={icon}
            />
          );
        })}
      </View>
    </ThemedView>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabBarStyle: {
    paddingTop: 8,
    paddingBottom: 16,
    borderTopWidth: 1,
  },
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
