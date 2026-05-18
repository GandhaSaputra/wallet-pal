import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.md,
      padding: theme.spacing.default,
      ...theme.shadows.sm,
    },
    header: {
      marginBottom: theme.spacing.default,
    },
    monthBadge: {
      backgroundColor: theme.colors.surfaceMuted,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radii.sm,
    },
    wrapperContent: {
      ...theme.flex.rowCenterBetween,
      gap: theme.spacing.default,
    },
    content: {
      gap: theme.spacing.md,
      flex: 1,
    },
    legendItem: {
      gap: theme.spacing.sm,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: theme.radii.pill,
    },
    legendRight: {
      gap: 2,
      alignItems: "flex-end",
    },
  });
