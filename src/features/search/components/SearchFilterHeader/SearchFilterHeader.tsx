import { Theme } from "@/src/constants/theme";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

const SearchFilterHeader = ({
  onFilterPress,
}: {
  onFilterPress: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(
    () => createStyles({ theme, insets }),
    [theme, insets],
  );
  return (
    <View style={[theme.flex.rowCenterBetween, styles.container]}>
      <ThemedText type="titleMedium">Search & Filter</ThemedText>
      <Pressable
        onPress={onFilterPress}
        style={styles.filterButton}
        hitSlop={8}
      >
        <Feather name="filter" size={20} color={theme.colors.icon} />
      </Pressable>
    </View>
  );
};

export default SearchFilterHeader;

const createStyles = ({
  theme,
  insets,
}: {
  theme: Theme;
  insets: EdgeInsets;
}) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: Platform.select({
        android: insets.top + theme.spacing.xl,
        ios: insets.top + theme.spacing.sm,
        web: theme.spacing.default,
      }),
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
