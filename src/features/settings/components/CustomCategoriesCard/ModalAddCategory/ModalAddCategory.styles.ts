import { Theme } from "@/src/constants/theme";
import { Platform, StyleSheet, TextStyle } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    indicatorStyle: {
      backgroundColor: theme.colors.border,
    },
    containerIndicatorStyle: {
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: theme.radii.lg,
      borderTopRightRadius: theme.radii.lg,
    },
    contentContainer: {
      backgroundColor: theme.colors.card,
      paddingHorizontal: theme.spacing.default,
      paddingBottom: theme.spacing["2xl"],
      gap: theme.spacing.lg,
    },
    header: {
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    preview: {
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    previewIcon: {
      width: 72,
      height: 72,
      borderRadius: theme.radii.md,
      alignItems: "center",
      justifyContent: "center",
    },
    section: {
      gap: theme.spacing.sm,
    },
    nameInput: {
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.input,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      fontSize: 16,
      color: theme.colors.text,
      ...(Platform.OS === "web" && { outline: "none" }),
    } as TextStyle,
    optionsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.sm,
    },
    colorDot: {
      width: 36,
      height: 36,
      borderRadius: theme.radii.pill,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "transparent",
    },
    colorDotSelected: {
      borderColor: theme.colors.text,
    },
    iconOption: {
      width: 44,
      height: 44,
      borderRadius: theme.radii.sm,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.surfaceMuted,
      borderWidth: 1.5,
      borderColor: "transparent",
    },
    iconOptionSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primarySoft,
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radii.md,
      paddingVertical: theme.spacing.md,
      alignItems: "center",
      marginTop: theme.spacing.xs,
    },
    saveButtonDisabled: {
      opacity: 0.5,
    },
    saveButtonText: {
      color: theme.colors.surface,
    },
  });
