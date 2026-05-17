import { BrandColors } from "@/src/constants/theme";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { SyncStatus } from ".";
import { createStyles } from "./SyncBackupCard.styles";
import { SyncBackupCardProps } from "./SyncBackupCard.types";

const STATUS_CONFIG: Record<
  SyncStatus,
  {
    label: string;
    styleKey:
      | "statusBadgeConnected"
      | "statusBadgeDisconnected"
      | "statusBadgeSyncing";
    textColor: string;
  }
> = {
  connected: {
    label: "Connected",
    styleKey: "statusBadgeConnected",
    textColor: BrandColors.success,
  },
  disconnected: {
    label: "Disconnected",
    styleKey: "statusBadgeDisconnected",
    textColor: BrandColors.danger,
  },
  syncing: {
    label: "Syncing...",
    styleKey: "statusBadgeSyncing",
    textColor: BrandColors.warning,
  },
};

const SyncBackupCard = React.memo(
  ({
    status,
    lastBackup,
    onBackupNow,
    onSyncData,
    isBackingUp = false,
    isSyncing = false,
  }: SyncBackupCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);
    const statusConfig = STATUS_CONFIG[status];
    const isLoading = isBackingUp || isSyncing;

    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Feather
            name="cloud"
            size={theme.iconSizes.md}
            color={theme.colors.icon}
          />
          <ThemedText type="bodyMediumSemibold">Sync & Backup</ThemedText>
        </View>

        <View style={styles.serviceRow}>
          <View style={styles.serviceIconWrapper}>
            <Feather
              name="database"
              size={theme.iconSizes.default}
              color={theme.colors.secondary}
            />
          </View>
          <View style={styles.serviceInfo}>
            <ThemedText type="bodySmallSemibold">
              Google Drive Backup
            </ThemedText>
            <ThemedText type="labelSmallRegular" colorVariant="textMuted">
              Last backup: {lastBackup}
            </ThemedText>
          </View>
          <View style={[styles.statusBadge, styles[statusConfig.styleKey]]}>
            <ThemedText
              type="labelSmallRegular"
              style={{ color: statusConfig.textColor }}
            >
              {statusConfig.label}
            </ThemedText>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              isLoading && styles.actionButtonDisabled,
            ]}
            onPress={onBackupNow}
            disabled={isLoading}
          >
            {isBackingUp ? (
              <ActivityIndicator size="small" color={theme.colors.primary} />
            ) : (
              <ThemedText type="bodySmallSemibold">Backup Now</ThemedText>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              isLoading && styles.actionButtonDisabled,
            ]}
            onPress={onSyncData}
            disabled={isLoading}
          >
            {isSyncing ? (
              <ActivityIndicator size="small" color={theme.colors.primary} />
            ) : (
              <ThemedText type="bodySmallSemibold">Sync Data</ThemedText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

SyncBackupCard.displayName = "SyncBackupCard";

export default SyncBackupCard;
