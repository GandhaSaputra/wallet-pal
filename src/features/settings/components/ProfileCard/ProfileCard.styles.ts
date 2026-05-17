import { Theme } from "@/src/constants/theme";
import { Platform, StyleSheet, TextStyle } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radii.md,
      padding: theme.spacing.default,
      gap: theme.spacing.default,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.sm,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    content: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: theme.spacing.default,
    },
    avatarWrapper: {
      width: 80,
      height: 80,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    avatar: {
      width: "100%",
      height: "100%",
      borderRadius: theme.spacing.md,
    },
    fields: {
      flex: 1,
      gap: theme.spacing.md,
    },
    fieldGroup: {
      gap: theme.spacing.xs,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.input,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      fontSize: 16,
      color: theme.colors.text,
      ...(Platform.OS === "web" && { outline: "none" }),
    } as TextStyle,
  });
