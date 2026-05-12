import { NeutralColors, Theme } from "@/src/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useThemeController";
import { ThemedText } from "../themed-text/ThemedText";

const HomeHeader = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = createStyles({ theme, insets });

  const username = "Sarah";
  const title = `Hello, ${username}! 👋`;
  const subtitle = "Track your expenses wisely";

  return (
    <View style={styles.container}>
      <View>
        <ThemedText type="titleMedium">{title}</ThemedText>
        <ThemedText colorVariant="textSecondary">{subtitle}</ThemedText>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.addButton}>
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
      paddingTop: insets.top,
    },
    addButton: {
      padding: theme.spacing.sm,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.primary,
    },
  });
