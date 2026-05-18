import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({
  theme,
  isFocused,
}: {
  theme: Theme;
  isFocused: boolean;
}) =>
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
    input: {
      minHeight: 124,
      paddingHorizontal: theme.spacing.default,
      paddingVertical: theme.spacing.default,
      borderWidth: 1.5,
      borderColor: isFocused ? theme.colors.primary : theme.colors.inputBorder,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.input,
      color: theme.colors.text,
      textAlignVertical: "top",
      ...theme.fonts.bodyMedium,
    },
  });
