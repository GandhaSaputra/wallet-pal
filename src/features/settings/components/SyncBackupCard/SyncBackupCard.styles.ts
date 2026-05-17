import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.md,
      padding: theme.spacing.default,
      gap: theme.spacing.default,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.sm,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    serviceRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      backgroundColor: theme.colors.surfaceMuted,
      borderRadius: theme.radii.md,
      padding: theme.spacing.md,
    },
    serviceIconWrapper: {
      width: 44,
      height: 44,
      borderRadius: theme.radii.sm,
      backgroundColor: theme.colors.aiCard,
      alignItems: "center",
      justifyContent: "center",
    },
    serviceInfo: {
      flex: 1,
      gap: 2,
    },
    statusBadge: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 3,
      borderRadius: theme.radii.pill,
    },
    statusBadgeConnected: {
      backgroundColor: theme.colors.successCard,
    },
    statusBadgeDisconnected: {
      backgroundColor: theme.colors.dangerCard,
    },
    statusBadgeSyncing: {
      backgroundColor: theme.colors.warningCard,
    },
    actionButtons: {
      flexDirection: "row",
      gap: theme.spacing.md,
    },
    actionButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    actionButtonDisabled: {
      opacity: 0.5,
    },
  });
