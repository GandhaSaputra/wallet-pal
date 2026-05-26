import { NeutralColors, Theme } from "@/src/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useThemeController";
import { ThemedText } from "../themed-text/ThemedText";

const HomeHeader = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(
    () => createStyles({ theme, insets }),
    [theme, insets],
  );

  const username = "Sarah";
  const title = `Hello, ${username}! 👋`;
  const subtitle = "Track your expenses wisely";

    const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <ThemedText type="titleMedium">{title}</ThemedText>
        <ThemedText colorVariant="textSecondary">{subtitle}</ThemedText>
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.addButton} onPress={() => router.push("/add")}>
        <Ionicons
          name="add"
          size={theme.iconSizes.default}
          color={NeutralColors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

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
    addButton: {
      padding: theme.spacing.sm,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.primary,
      ...theme.shadows.button,
      shadowColor: theme.colors.shadow,
    },
  });
