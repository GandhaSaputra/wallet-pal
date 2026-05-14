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
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    label: {
      color: theme.colors.text,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1.5,
      borderColor: isFocused ? theme.colors.primary : theme.colors.inputBorder,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.input,
      paddingHorizontal: theme.spacing.default,
      gap: theme.spacing.sm,
    },
    currencySymbol: {
      color: isFocused ? theme.colors.primary : theme.colors.textMuted,
    },
    input: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      fontSize: 28,
      fontWeight: "700",
      color: theme.colors.text,
      // outlineStyle: "none",
    },
  });
