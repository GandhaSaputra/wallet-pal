import { Theme } from "@/src/constants/theme";
import { Platform, StyleSheet, TextStyle } from "react-native";

export const createStyles = ({
  theme,
  isFocused,
}: {
  theme: Theme;
  isFocused: boolean;
}) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.md,
      padding: theme.spacing.default,
      gap: theme.spacing.md,
      ...theme.shadows.sm,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1.5,
      borderColor: isFocused ? theme.colors.ai : theme.colors.inputBorder,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.input,
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    textInput: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      fontSize: 16,
      color: theme.colors.text,
      ...(Platform.OS === "web" && { outline: "none" }),
    } as TextStyle,
    suggestionsContainer: {
      gap: theme.spacing.sm,
    },
    naturalLanguageRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
    },
    suggestionChip: {
      alignSelf: "flex-start",
      borderWidth: 1,
      backgroundColor: theme.colors.aiSurface,
      borderColor: theme.colors.aiBorderColor,
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    processingBadge: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
      borderWidth: 1,
      backgroundColor: theme.colors.aiSurface,
      borderColor: theme.colors.aiBorderColor,
      borderRadius: theme.radii.pill,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    },
  });
