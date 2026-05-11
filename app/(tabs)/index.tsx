import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/shared/hooks/useColorScheme";
import { useThemeController } from "@/src/shared/hooks/useThemeController";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { toggleTheme } = useThemeController();
  const nextTheme = colorScheme === "dark" ? "Light" : "Dark";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Home</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Current theme: {colorScheme}
      </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
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
