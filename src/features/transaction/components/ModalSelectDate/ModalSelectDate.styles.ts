import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      padding: theme.spacing.default,
    },
    pickerContainer: {
      alignItems: "center",
    },
    header: {
      paddingBottom: theme.spacing.default,
    },
    listContent: {
      gap: theme.spacing.sm,
    },
    picker: {
      marginBottom: theme.spacing.lg,
    },
    pickerText: {
      color: theme.colors.text,
      ...theme.fonts.bodyMediumMedium,
    },
    pickerOverlay: {
      backgroundColor: theme.colors.primarySoft,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.primaryBorder,
    },
    selectButton: {
      padding: theme.spacing.md,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.primary,
      ...theme.flex.rowCenterCenter,
    },
    selectButtonContainer: { paddingVertical: theme.spacing.default },
    selectButtonText: {
      color: theme.colors.white,
    },
  });
