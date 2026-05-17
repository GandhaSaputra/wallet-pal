import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.md,
      padding: theme.spacing.default,
      gap: theme.spacing.default,
      ...theme.shadows.card,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    exportButtons: {
      flexDirection: "row",
      gap: theme.spacing.md,
    },
    exportButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.sm,
      paddingVertical: theme.spacing.default,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surfaceMuted,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    exportButtonPressed: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primarySoft,
    },
    exportButtonDisabled: {
      opacity: 0.5,
    },
  });
