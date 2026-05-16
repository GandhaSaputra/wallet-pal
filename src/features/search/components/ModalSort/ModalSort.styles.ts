import { Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

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
      paddingBottom: theme.spacing["3xl"],
      gap: theme.spacing.sm,
    },
    header: {
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      marginBottom: theme.spacing.xs,
    },
    optionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.radii.default,
    },
    optionRowSelected: {
      backgroundColor: theme.colors.primarySoft,
    },
    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.borderStrong,
      alignItems: "center",
      justifyContent: "center",
    },
    radioOuterSelected: {
      borderColor: theme.colors.primary,
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
    },
  });
