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
    addButton: {
      width: 36,
      height: 36,
      borderRadius: theme.radii.sm,
      backgroundColor: theme.colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    categoriesList: {
      gap: theme.spacing.sm,
    },
    categoryItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      backgroundColor: theme.colors.surfaceMuted,
      borderRadius: theme.radii.md,
      padding: theme.spacing.md,
    },
    categoryIcon: {
      width: 48,
      height: 48,
      borderRadius: theme.radii.sm,
      alignItems: "center",
      justifyContent: "center",
    },
    categoryInfo: {
      flex: 1,
      gap: 2,
    },
    actionButtons: {
      flexDirection: "row",
      gap: theme.spacing.sm,
    },
    iconButton: {
      width: 36,
      height: 36,
      borderRadius: theme.radii.sm,
      backgroundColor: theme.colors.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    emptyState: {
      alignItems: "center",
      paddingVertical: theme.spacing.xl,
      gap: theme.spacing.sm,
    },
  });
