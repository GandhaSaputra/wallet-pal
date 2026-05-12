import { Pressable, StyleSheet, Text, View } from "react-native";

import { Theme } from "@/src/constants/theme";
import { useThemeController } from "@/src/shared/hooks/useThemeController";

export default function HomeScreen() {
  const { colorScheme, theme, toggleTheme } = useThemeController();
  const styles = createStyles(theme);
  const nextTheme = colorScheme === "dark" ? "Light" : "Dark";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Current theme: {colorScheme}</Text>
      <Pressable
        onPress={toggleTheme}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : undefined,
        ]}
      >
        <Text style={styles.buttonText}>Switch to {nextTheme} Theme</Text>
      </Pressable>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing.xl,
      backgroundColor: theme.colors.background,
    },
    title: {
      ...theme.fonts.displayMedium,
      color: theme.colors.text,
    },
    subtitle: {
      ...theme.fonts.bodyMedium,
      marginTop: theme.spacing.sm,
      color: theme.colors.textSecondary,
    },
    button: {
      minHeight: 52,
      minWidth: 220,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borders.default,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      marginTop: theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.primary,
    },
    buttonPressed: {
      backgroundColor: theme.colors.primaryPressed,
    },
    buttonText: {
      ...theme.fonts.labelLarge,
      color: "#FFFFFF",
    },
  });
