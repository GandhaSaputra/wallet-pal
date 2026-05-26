import { Theme } from "@/src/constants/theme";
import AppInfoCard from "@/src/features/settings/components/AppInfoCard";
import CustomCategoriesCard from "@/src/features/settings/components/CustomCategoriesCard";
import ExportDataCard from "@/src/features/settings/components/ExportDataCard";
import PreferencesCard from "@/src/features/settings/components/PreferencesCard";
import ProfileCard from "@/src/features/settings/components/ProfileCard";
import SecurityPrivacyCard from "@/src/features/settings/components/SecurityPrivacyCard";
import SyncBackupCard from "@/src/features/settings/components/SyncBackupCard";
import { useSettingsScreen } from "@/src/features/settings/hooks/useSettingsScreen";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useMemo } from "react";
import { Alert, Platform, ScrollView, StyleSheet, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const {
    categories,
    fullName,
    handleAddCategory,
    handleBackupNow,
    handleDeleteCategory,
    handleEditCategory,
    handleExport,
    handleFullNameChange,
    handleMonthlyBudgetChange,
    handleSyncData,
    handleTogglePreference,
    isBackingUp,
    isExporting,
    isSyncing,
    monthlyBudget,
    preferences,
    syncBackup,
    theme,
  } = useSettingsScreen();
  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () => createStyles({ theme, insets }),
    [theme, insets],
  );

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
          onFullNameChange={handleFullNameChange}
          onMonthlyBudgetChange={handleMonthlyBudgetChange}
        />

        <Spacer height={theme.spacing.lg} />

        <ExportDataCard onExport={handleExport} isExporting={isExporting} />

        <Spacer height={theme.spacing.lg} />

        <SyncBackupCard
          status={syncBackup.status}
          lastBackup={syncBackup.lastBackup}
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
