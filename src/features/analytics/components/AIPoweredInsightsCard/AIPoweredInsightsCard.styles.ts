import { BrandColors, Theme } from "@/src/constants/theme";
import { StyleSheet } from "react-native";
import { InsightTone } from "./AIPoweredInsightsCard.types";

export const getInsightToneColors = ({
  theme,
  tone,
}: {
  theme: Theme;
  tone: InsightTone;
}) => {
  if (tone === "warning") {
    return {
      backgroundColor: theme.colors.warningCard,
      borderColor: theme.isDark ? "rgba(255, 138, 61, 0.45)" : "#FFD0A3",
      color: theme.colors.warning,
      iconBackgroundColor: theme.isDark
        ? "rgba(255, 138, 61, 0.14)"
        : "#FFF0DE",
    };
  }

  if (tone === "success") {
    return {
      backgroundColor: theme.colors.successCard,
      borderColor: theme.isDark ? "rgba(0, 166, 61, 0.5)" : "#A7F3C5",
      color: theme.colors.success,
      iconBackgroundColor: theme.isDark ? "rgba(0, 166, 61, 0.16)" : "#DDFBEA",
    };
  }

  return {
    backgroundColor: theme.isDark ? "rgba(160, 32, 240, 0.12)" : "#F8F1FF",
    borderColor: theme.isDark ? "rgba(192, 132, 252, 0.5)" : "#E8CFFF",
    color: theme.isDark ? theme.colors.accent : BrandColors.accentPurple,
    iconBackgroundColor: theme.isDark ? "rgba(192, 132, 252, 0.16)" : "#F0E0FF",
  };
};

export const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radii.lg,
      padding: theme.spacing.xl,
      gap: theme.spacing.xl,
      ...theme.shadows.sm,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.default,
    },
    headerIcon: {
      padding: theme.spacing.md,
      borderRadius: theme.radii.lg,
      backgroundColor: theme.isDark
        ? theme.colors.warningCard
        : BrandColors.insight,
      alignItems: "center",
      justifyContent: "center",
    },
    insightList: {
      gap: theme.spacing.default,
    },
    insightItem: {
      flexDirection: "row",
      gap: theme.spacing.default,
      borderWidth: 1.5,
      borderRadius: theme.radii.lg,
      padding: theme.spacing.default,
    },
    insightIcon: {
      width: 32,
      height: 32,
      borderRadius: theme.radii.pill,
      alignItems: "center",
      justifyContent: "center",
    },
    insightContent: {
      flex: 1,
      gap: theme.spacing.xs,
    },
  });
