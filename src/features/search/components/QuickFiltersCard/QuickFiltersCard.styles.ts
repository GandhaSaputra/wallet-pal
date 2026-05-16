import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.md,
      padding: theme.spacing.default,
      gap: theme.spacing.md,
      ...theme.shadows.sm,
    },
    chipsWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.sm,
    },
    chip: {
      paddingHorizontal: theme.spacing.default,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radii.default,
      backgroundColor: theme.colors.surfaceMuted,
    },
    chipSelected: {
      backgroundColor: theme.colors.primary,
    },
  });
