import { Theme } from "@/src/constants/theme";
import CustomCategoriesCard, {
  CustomCategory,
} from "@/src/features/settings/components/CustomCategoriesCard";
import ExportDataCard from "@/src/features/settings/components/ExportDataCard";
import { ExportFormat } from "@/src/features/settings/components/ExportDataCard/ExportDataCard.types";
import ProfileCard from "@/src/features/settings/components/ProfileCard";
import SyncBackupCard from "@/src/features/settings/components/SyncBackupCard";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useThemeController } from "@/src/shared/hooks/useThemeController";
import { useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const MOCK_CATEGORIES: CustomCategory[] = [
  {
    id: "1",
    icon: "☕",
    name: "Coffee & Drinks",
    color: "#FF6B35",
    transactionCount: 15,
  },
  {
    id: "2",
    icon: "💪",
    name: "Gym & Fitness",
    color: "#4CAF50",
    transactionCount: 8,
  },
  {
    id: "3",
    icon: "🐕",
    name: "Pet Expenses",
    color: "#2196F3",
    transactionCount: 12,
  },
];

export default function SettingsScreen() {
  const { theme, toggleTheme, colorScheme } = useThemeController();
  const styles = useMemo(() => createStyles({ theme }), [theme]);
  const nextTheme = colorScheme === "dark" ? "Light" : "Dark";

  const [fullName, setFullName] = useState("Sarah Anderson");
  const [monthlyBudget, setMonthlyBudget] = useState("3500");
  const [isExporting, setIsExporting] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [categories, setCategories] =
    useState<CustomCategory[]>(MOCK_CATEGORIES);

  const handleExport = (format: ExportFormat) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      Alert.alert(
        "Export Successful",
        `Data exported as ${format.toUpperCase()}.`,
      );
    }, 1500);
  };

  const handleBackupNow = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      Alert.alert(
        "Backup Complete",
        "Your data has been backed up to Google Drive.",
      );
    }, 2000);
  };

  const handleSyncData = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const handleAddCategory = (
    data: Omit<CustomCategory, "id" | "transactionCount">,
  ) => {
    const newCategory: CustomCategory = {
      ...data,
      id: Date.now().toString(),
      transactionCount: 0,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleEditCategory = (updated: CustomCategory) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c)),
    );
  };

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedText type="titleMedium" style={styles.title}>
          Settings
        </ThemedText>

        <Spacer height={theme.spacing.default} />

        <ProfileCard
          fullName={fullName}
          monthlyBudget={monthlyBudget}
          onFullNameChange={setFullName}
          onMonthlyBudgetChange={setMonthlyBudget}
        />

        <Spacer height={theme.spacing.default} />

        <ExportDataCard onExport={handleExport} isExporting={isExporting} />

        <Spacer height={theme.spacing.default} />

        <SyncBackupCard
          status="connected"
          lastBackup="2 hours ago"
          onBackupNow={handleBackupNow}
          onSyncData={handleSyncData}
          isBackingUp={isBackingUp}
          isSyncing={isSyncing}
        />

        <Spacer height={theme.spacing.default} />

        <CustomCategoriesCard
          categories={categories}
          onAdd={handleAddCategory}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />

        <Spacer height={theme.spacing.xl} />

        <TouchableOpacity
          onPress={toggleTheme}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Switch to {nextTheme} Theme</Text>
        </TouchableOpacity>

        <Spacer height={theme.spacing["2xl"]} />
      </ScrollView>
    </ThemedView>
  );
}

const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { paddingHorizontal: theme.spacing.default },
    title: { paddingTop: theme.spacing.xl },
    button: {
      minHeight: 52,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.spacing.default,
      backgroundColor: theme.colors.primary,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "700",
    },
  });
