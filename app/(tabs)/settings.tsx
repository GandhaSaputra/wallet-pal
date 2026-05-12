import { Colors, Theme } from "@/src/constants/theme";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useThemeController } from "@/src/shared/hooks/useThemeController";
import { Pressable, StyleSheet, Text } from "react-native";

export default function SettingsScreen() {
  const { theme, toggleTheme, colorScheme } = useThemeController();
  const styles = createStyles({ theme });
  const colors = Colors[colorScheme];
  const nextTheme = colorScheme === "dark" ? "Light" : "Dark";

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">SettingsScreen</ThemedText>
      <ThemedText colorVariant="textSecondary">
        Current theme: {colorScheme}
      </ThemedText>
      <Pressable
        onPress={toggleTheme}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed ? colors.primaryPressed : colors.primary,
            borderColor: colors.primary,
          },
        ]}
      >
        <Text style={styles.buttonText}>Switch to {nextTheme} Theme</Text>
      </Pressable>
    </ThemedView>
  );
}

const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.default,
      justifyContent: "center",
      alignItems: "center",
    },

    button: {
      minHeight: 52,
      minWidth: 220,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 16,
      borderWidth: 1,
      marginTop: 24,
      paddingHorizontal: 20,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
  });
