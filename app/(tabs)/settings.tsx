import { Theme } from "@/src/constants/theme";
import AppInfoCard from "@/src/features/settings/components/AppInfoCard";
import CustomCategoriesCard, {
  CustomCategory,
} from "@/src/features/settings/components/CustomCategoriesCard";
import ExportDataCard from "@/src/features/settings/components/ExportDataCard";
import { ExportFormat } from "@/src/features/settings/components/ExportDataCard/ExportDataCard.types";
import PreferencesCard from "@/src/features/settings/components/PreferencesCard";
import { PreferencesState } from "@/src/features/settings/components/PreferencesCard/PreferencesCard.types";
import ProfileCard from "@/src/features/settings/components/ProfileCard";
import SecurityPrivacyCard from "@/src/features/settings/components/SecurityPrivacyCard";
import SyncBackupCard from "@/src/features/settings/components/SyncBackupCard";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useThemeController } from "@/src/shared/hooks/useThemeController";
import { useMemo, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () => createStyles({ theme, insets }),
    [theme, insets],
  );

  const [fullName, setFullName] = useState("Sarah Anderson");
  const [monthlyBudget, setMonthlyBudget] = useState("3500");
  const [isExporting, setIsExporting] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [categories, setCategories] =
    useState<CustomCategory[]>(MOCK_CATEGORIES);

  const [preferences, setPreferences] = useState<PreferencesState>({
    darkMode: colorScheme === "dark",
    pushNotifications: true,
    budgetAlerts: true,
  });

  const handleTogglePreference = (key: keyof PreferencesState) => {
    if (key === "darkMode") toggleTheme();
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
    setCategories((prev) => [
      ...prev,
      { ...data, id: Date.now().toString(), transactionCount: 0 },
    ]);
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
        <View style={styles.header}>
          <ThemedText type="titleMedium">Settings</ThemedText>
        </View>

        <Spacer height={theme.spacing.lg} />

        <ProfileCard
          fullName={fullName}
          monthlyBudget={monthlyBudget}
          onFullNameChange={setFullName}
          onMonthlyBudgetChange={setMonthlyBudget}
        />

        <Spacer height={theme.spacing.lg} />

        <ExportDataCard onExport={handleExport} isExporting={isExporting} />

        <Spacer height={theme.spacing.lg} />

        <SyncBackupCard
          status="connected"
          lastBackup="2 hours ago"
          onBackupNow={handleBackupNow}
          onSyncData={handleSyncData}
          isBackingUp={isBackingUp}
          isSyncing={isSyncing}
        />

        <Spacer height={theme.spacing.lg} />

        <CustomCategoriesCard
          categories={categories}
          onAdd={handleAddCategory}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />

        <Spacer height={theme.spacing.lg} />

        <PreferencesCard
          preferences={preferences}
          onToggle={handleTogglePreference}
        />

        <Spacer height={theme.spacing.lg} />

        <SecurityPrivacyCard
          onManagePaymentMethods={() => Alert.alert("Manage Payment Methods")}
          onChangePassword={() => Alert.alert("Change Password")}
          onPrivacySettings={() => Alert.alert("Privacy Settings")}
        />

        <Spacer height={theme.spacing.lg} />

        <AppInfoCard />

        <Spacer height={theme.spacing["2xl"]} />
      </ScrollView>
    </ThemedView>
  );
}

const createStyles = ({
  theme,
  insets,
}: {
  theme: Theme;
  insets: EdgeInsets;
}) =>
  StyleSheet.create({
    container: { flex: 1 },
    header: {
      paddingTop: Platform.select({
        android: insets.top + theme.spacing.xl,
        ios: insets.top + theme.spacing.sm,
        web: theme.spacing.default,
      }),
    },
    scrollContent: { paddingHorizontal: theme.spacing.default },
  });
