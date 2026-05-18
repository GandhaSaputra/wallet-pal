import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    wrapper: {
      gap: theme.spacing.lg,
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.sm,
    },
    label: {
      color: theme.colors.text,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.md,
    },
    item: {
      width: "47.5%",
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.lg,
      borderWidth: 1.5,
      borderColor: theme.colors.borderStrong,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surface,
      ...theme.flex.rowCenterCenter,
      gap: theme.spacing.sm,
    },
    selectedItem: {
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primarySoft,
    },
    itemIcon: {
      ...theme.fonts.bodyMediumMedium,
    },
    itemLabel: {
      flex: 1,
      color: theme.colors.textSecondary,
    },
    selectedItemLabel: {
      color: theme.colors.text,
    },
  });
