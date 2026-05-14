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
    },
    label: {
      color: theme.colors.text,
    },
    input: {
      paddingHorizontal: theme.spacing.default,
      paddingVertical: theme.spacing.md,
      borderWidth: 1.5,
      borderColor: isFocused ? theme.colors.primary : theme.colors.inputBorder,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.input,
      color: theme.colors.text,
      // outlineStyle: "none",
      flex: 1,
      ...theme.fonts.bodyMedium,
    },
    suggestionCard: {
      gap: theme.spacing.md,
      padding: theme.spacing.default,
      borderWidth: 1,
      borderColor: theme.colors.primaryBorder,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.aiCard,
    },
    suggestionHeader: {
      ...theme.flex.rowCenterStart,
      gap: theme.spacing.sm,
    },
    suggestionIconWrapper: {
      padding: theme.spacing.sm,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surfacePrimary,
      ...theme.flex.rowCenterCenter,
    },
    suggestionTitle: {
      color: theme.colors.ai,
    },
    suggestionText: {
      color: theme.colors.ai,
    },
    suggestionButton: {
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.secondary,
      ...theme.flex.rowCenterCenter,
      gap: theme.spacing.sm,
    },
    suggestionButtonText: {
      color: theme.colors.white,
    },
  });
