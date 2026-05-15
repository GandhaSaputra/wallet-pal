import { Theme } from "@/src/constants/theme";
import { Platform, StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

export const createStyles = ({
  theme,
  insets,
}: {
  theme: Theme;
  insets: EdgeInsets;
}) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: Platform.select({
        android: insets.top + theme.spacing.xl,
        ios: insets.top + theme.spacing.sm,
        web: theme.spacing.default,
      }),
    },
    segmentedControl: {
      flexDirection: "row",
      gap: theme.spacing.md,
    },
    segmentButton: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.muted,
      alignItems: "center",
      justifyContent: "center",
    },
    activeSegmentButton: {
      backgroundColor: theme.colors.primary,
      ...theme.shadows.button,
      shadowColor: theme.colors.shadow,
    },
  });
