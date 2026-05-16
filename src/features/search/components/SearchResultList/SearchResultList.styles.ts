import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    resultHeader: {
      marginBottom: theme.spacing.md,
    },
    filteredBadge: {
      backgroundColor: theme.colors.surfaceMuted,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 2,
      borderRadius: theme.radii.pill,
    },
    sortButton: {
      width: 36,
      height: 36,
      borderRadius: theme.radii.sm,
      backgroundColor: theme.colors.surfaceMuted,
      alignItems: "center",
      justifyContent: "center",
    },
    resultsList: {
      gap: theme.spacing.sm,
    },
    transactionItem: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.md,
      padding: theme.spacing.md,
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      // ...theme.shadows.sm,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.warningCard,
      alignItems: "center",
      justifyContent: "center",
    },
    merchantInfo: {
      flex: 1,
      gap: 4,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 4,
    },
    categoryBadge: {
      backgroundColor: theme.colors.surfaceMuted,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 2,
      borderRadius: theme.radii.pill,
    },
    dot: {
      width: 3,
      height: 3,
      borderRadius: 999,
      backgroundColor: theme.colors.textMuted,
    },
  });
