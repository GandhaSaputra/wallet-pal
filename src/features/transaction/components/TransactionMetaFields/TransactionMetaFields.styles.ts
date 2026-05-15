import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    row: {
      ...theme.flex.rowCenterBetween,
      gap: theme.spacing.default,
    },
    card: {
      flex: 1,
      gap: theme.spacing.sm,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    label: {
      color: theme.colors.textSecondary,
    },
    valueBox: {
      // minHeight: 64,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.input,
      ...theme.flex.rowCenterStart,
      gap: theme.spacing.xs,
    },
    valueText: {
      flexShrink: 1,
    },
    paymentIcon: {
      ...theme.fonts.bodyMedium,
    },
  });
