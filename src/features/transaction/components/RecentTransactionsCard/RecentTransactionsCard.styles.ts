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
    viewAllText: {
      color: theme.colors.textPrimary,
    },
    transactionItem: {
      backgroundColor: theme.colors.surfaceMuted,
      borderRadius: theme.radii.default,
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },
    iconContainer: {
      width: 42,
      height: 42,
      // padding: theme.spacing.sm,
      borderRadius: theme.radii.lg,
      backgroundColor: theme.colors.surface,
      alignItems: "center",
      justifyContent: "center",
      ...theme.shadows.xs,
    },
    merchantInfo: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    categoryBadge: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 2,
      borderRadius: theme.radii.pill,
      alignSelf: "flex-start",
    },
    itemsList: {
      gap: theme.spacing.sm,
    },
  });
