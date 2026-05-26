import { useThemeController } from "@/src/shared/hooks/useThemeController";
import { Alert } from "react-native";
import { CustomCategory } from "../components/CustomCategoriesCard";
import { ExportFormat } from "../components/ExportDataCard";
import { PreferencesState } from "../components/PreferencesCard";
import { useSettingsStore } from "../settings.store";

export function useSettingsScreen() {
  const { colorScheme, theme, toggleTheme } = useThemeController();
  const profile = useSettingsStore((state) => state.profile);
  const preferences = useSettingsStore((state) => state.preferences);
  const categories = useSettingsStore((state) => state.categories);
  const syncBackup = useSettingsStore((state) => state.syncBackup);
  const operations = useSettingsStore((state) => state.operations);
  const updateProfile = useSettingsStore((state) => state.updateProfile);
  const updatePreference = useSettingsStore((state) => state.updatePreference);
  const addCategory = useSettingsStore((state) => state.addCategory);
  const updateCategory = useSettingsStore((state) => state.updateCategory);
  const deleteCategory = useSettingsStore((state) => state.deleteCategory);
  const exportData = useSettingsStore((state) => state.exportData);
  const backupNow = useSettingsStore((state) => state.backupNow);
  const syncData = useSettingsStore((state) => state.syncData);

  const handleFullNameChange = (fullName: string) => {
    void updateProfile({ fullName });
  };

  const handleMonthlyBudgetChange = (monthlyBudget: string) => {
    void updateProfile({ monthlyBudget });
  };

  const handleTogglePreference = (key: keyof PreferencesState) => {
    const nextValue =
      key === "darkMode" ? colorScheme !== "dark" : !preferences[key];

    if (key === "darkMode") {
      toggleTheme();
    }

    void updatePreference(key, nextValue);
  };

  const handleExport = async (format: ExportFormat) => {
    const isSuccessful = await exportData(format);

    if (isSuccessful) {
      Alert.alert(
        "Export Successful",
        `Data exported as ${format.toUpperCase()}.`,
      );
    }
  };

  const handleBackupNow = async () => {
    const isSuccessful = await backupNow();

    if (isSuccessful) {
      Alert.alert(
        "Backup Complete",
        "Your data has been backed up to Google Drive.",
      );
    }
  };

  const handleSyncData = () => {
    void syncData();
  };

  const handleAddCategory = (
    data: Omit<CustomCategory, "id" | "transactionCount">,
  ) => {
    void addCategory(data);
  };

  const handleEditCategory = (category: CustomCategory) => {
    void updateCategory(category);
  };

  const handleDeleteCategory = (id: string) => {
    void deleteCategory(id);
  };

  return {
    categories,
    colorScheme,
    fullName: profile.fullName,
    handleAddCategory,
    handleBackupNow,
    handleDeleteCategory,
    handleEditCategory,
    handleExport,
    handleFullNameChange,
    handleMonthlyBudgetChange,
    handleSyncData,
    handleTogglePreference,
    isBackingUp: operations.backup === "loading",
    isExporting: operations.export === "loading",
    isSyncing: operations.sync === "loading",
    monthlyBudget: profile.monthlyBudget,
    preferences: {
      ...preferences,
      darkMode: colorScheme === "dark",
    },
    syncBackup,
    theme,
  };
}
