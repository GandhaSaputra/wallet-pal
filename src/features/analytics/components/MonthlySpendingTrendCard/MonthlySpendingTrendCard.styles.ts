import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.md,
      padding: theme.spacing.default,
      ...theme.shadows.sm,
      shadowColor: theme.colors.shadow,
    },
    footer: {
      marginTop: theme.spacing.default,
      gap: theme.spacing.sm,
    },
    trendBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
      backgroundColor: theme.colors.surfaceMuted,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radii.pill,
    },
    trendIconWrapper: {
      width: 28,
      height: 28,
      borderRadius: theme.radii.pill,
      alignItems: "center",
      justifyContent: "center",
    },
    monthBadge: {
      backgroundColor: theme.colors.surfaceMuted,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radii.sm,
    },
  });
