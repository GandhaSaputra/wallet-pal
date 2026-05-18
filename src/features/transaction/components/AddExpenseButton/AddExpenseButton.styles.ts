import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    button: {
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.primary,
      ...theme.flex.rowCenterCenter,
      ...theme.shadows.button,
    },
    disabledButton: {
      opacity: 0.5,
    },
    label: {
      color: theme.colors.white,
    },
  });
