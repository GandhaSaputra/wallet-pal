import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.default,
      alignItems: "center",
      gap: theme.spacing.sm,
      ...theme.shadows.sm,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: theme.radii.pill,
      alignItems: "center",
      justifyContent: "center",
    },
    labelValueWrapper: {
      alignItems: "center",
      gap: theme.spacing.xs,
    },
  });
