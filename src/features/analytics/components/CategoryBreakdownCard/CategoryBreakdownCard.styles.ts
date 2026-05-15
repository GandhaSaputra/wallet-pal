import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.default,
      gap: theme.spacing.lg,
      ...theme.shadows.sm,
    },
    categoryRow: {
      gap: theme.spacing.xs,
    },
    barWrapper: {
      height: theme.spacing.default,
      flex: 1,
      backgroundColor: theme.colors.surfaceMuted,
      borderRadius: theme.radii.pill,
      overflow: "hidden",
    },
    barFill: {
      height: "100%",
      borderRadius: theme.radii.pill,
    },
    lastMonthBar: {
      height: "100%",
      borderRadius: theme.radii.pill,
      backgroundColor: theme.colors.borderStrong,
    },
  });
