import { Colors, Theme } from "@/src/constants/theme";
import ExportDataCard from "@/src/features/settings/components/ExportDataCard";
import { ExportFormat } from "@/src/features/settings/components/ExportDataCard/ExportDataCard.types";
import ProfileCard from "@/src/features/settings/components/ProfileCard";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useThemeController } from "@/src/shared/hooks/useThemeController";
import { useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text } from "react-native";

export default function SettingsScreen() {
  const { theme, toggleTheme, colorScheme } = useThemeController();
  const styles = useMemo(() => createStyles({ theme }), [theme]);
  const colors = Colors[colorScheme];
  const nextTheme = colorScheme === "dark" ? "Light" : "Dark";

  const [fullName, setFullName] = useState("Sarah Anderson");
  const [monthlyBudget, setMonthlyBudget] = useState("3500");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (format: ExportFormat) => {
    setIsExporting(true);
    // TODO: integrate actual export logic
    setTimeout(() => {
      setIsExporting(false);
      Alert.alert(
        "Export Successful",
        `Your data has been exported as ${format.toUpperCase()}.`,
      );
    }, 1500);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedText type="titleLarge" style={styles.title}>
          Settings
        </ThemedText>

        <Spacer height={theme.spacing.default} />

        <ProfileCard
          fullName={fullName}
          avatarUrl="https://i.pravatar.cc/300?u=a042581f4e29026704d"
          monthlyBudget={monthlyBudget}
          onFullNameChange={setFullName}
          onMonthlyBudgetChange={setMonthlyBudget}
        />

        <Spacer height={theme.spacing.default} />

        <ExportDataCard onExport={handleExport} isExporting={isExporting} />

        <Spacer height={theme.spacing.xl} />

        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? colors.primaryPressed : colors.primary,
            },
          ]}
        >
          <Text style={styles.buttonText}>Switch to {nextTheme} Theme</Text>
        </Pressable>

        <Spacer height={theme.spacing["2xl"]} />
      </ScrollView>
    </ThemedView>
  );
}

const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.default,
    },
    title: {
      paddingTop: theme.spacing.xl,
    },
    button: {
      minHeight: 52,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.spacing.default,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
  });
