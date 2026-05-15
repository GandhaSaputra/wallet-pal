import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
      backgroundColor: theme.colors.card,
      flex: 1,
    },
    list: {
      marginBottom: theme.spacing.default,
    },
    contentContainer: {
      flex: 1,
      padding: theme.spacing.default,
      backgroundColor: theme.colors.background,
    },
    indicatorStyle: {
      backgroundColor: theme.colors.reverseBackground,
    },
    containerIndicatorStyle: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: theme.radii.lg,
      borderTopRightRadius: theme.radii.lg,
    },
    header: {
      paddingBottom: theme.spacing.default,
    },
    listContent: {
      gap: theme.spacing.sm,
    },
    item: {
      ...theme.flex.rowCenterStart,
      gap: theme.spacing.md,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surface,
    },
    selectedItem: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primarySoft,
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surfaceMuted,
      ...theme.flex.rowCenterCenter,
    },
    selectedIconBox: {
      backgroundColor: theme.colors.surfacePrimary,
    },
    iconText: {
      ...theme.fonts.bodyMedium,
    },
    itemBody: {
      flex: 1,
      gap: 2,
    },
    itemTitle: {
      color: theme.colors.text,
    },
    itemDescription: {
      color: theme.colors.textSecondary,
    },
    selectedCheck: {
      color: theme.colors.primary,
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
