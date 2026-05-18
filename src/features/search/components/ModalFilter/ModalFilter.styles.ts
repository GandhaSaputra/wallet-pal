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
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.default,
      paddingBottom: theme.spacing["2xl"],
      gap: theme.spacing.lg,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.default,
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    resetText: {
      color: theme.colors.danger,
    },
    section: {
      gap: theme.spacing.sm,
    },
    chipsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.sm,
    },
    chip: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radii.pill,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surfaceMuted,
    },
    chipSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primarySoft,
    },
    amountRow: {
      flexDirection: "row",
      gap: theme.spacing.sm,
      alignItems: "center",
    },
    amountInputWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.input,
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.xs,
    },
    amountInput: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      fontSize: 14,
      color: theme.colors.text,
      ...(Platform.OS === "web" && { outline: "none" }),
    } as TextStyle,
    amountSeparator: {
      width: 12,
      height: 1.5,
      backgroundColor: theme.colors.borderStrong,
      borderRadius: theme.radii.pill,
    },
    applyButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radii.md,
      paddingVertical: theme.spacing.md,
      alignItems: "center",
      marginHorizontal: theme.spacing.default,
      marginBottom: theme.spacing.default,
    },
    applyButtonText: {
      color: theme.colors.surface,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
    },
  });
