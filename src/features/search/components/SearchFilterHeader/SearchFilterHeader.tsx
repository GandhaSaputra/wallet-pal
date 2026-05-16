import { Theme } from "@/src/constants/theme";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const SearchFilterHeader = () => {
  const theme = useTheme();
  const styles = createStyles({ theme });
  return (
    <View style={[theme.flex.rowCenterBetween, styles.header]}>
      <ThemedText type="titleMedium">Search & Filter</ThemedText>
      <Pressable style={styles.filterButton} hitSlop={8}>
        <Feather name="filter" size={20} color={theme.colors.icon} />
      </Pressable>
    </View>
  );
};

export default SearchFilterHeader;

const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    header: {
      paddingTop: theme.spacing.xl,
    },
    filterButton: {
      width: 40,
      height: 40,
      borderRadius: theme.radii.sm,
      backgroundColor: theme.colors.surfaceMuted,
      alignItems: "center",
      justifyContent: "center",
    },
  });
