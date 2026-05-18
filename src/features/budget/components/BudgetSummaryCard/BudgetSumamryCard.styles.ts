import { NeutralColors, Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    shadowContainer: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.radii.md,
      ...theme.shadows.card,
      shadowColor: theme.colors.shadow,
    },
    container: {
      padding: theme.spacing.default,
      borderRadius: theme.radii.md,
    },
    currencyContainer: {
      backgroundColor: NeutralColors.whiteOpacity10,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radii.md,
    },
    progressTrack: {
      height: 8,
      borderRadius: theme.radii.pill,
      overflow: "hidden",
      backgroundColor: theme.colors.progressTrack,
    },
    progressFill: {
      height: "100%",
      borderRadius: theme.radii.pill,
      backgroundColor: NeutralColors.black,
    },
  });
