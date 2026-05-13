import { BrandColors, spacing } from "@/src/constants/theme";
import StatCard from "@/src/shared/components/stat-card/StatCard";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { BudgetInsightRowProps } from "./BudgetInsightRow.types";

const BudgetInsightRow = React.memo(
  ({ vsLastMonthPercentage, daysLeft }: BudgetInsightRowProps) => {
    const theme = useTheme();

    const isPositiveTrend = vsLastMonthPercentage > 0;

    const trendColor = isPositiveTrend
      ? BrandColors.success
      : theme.colors.danger;

    const trendIconBg = isPositiveTrend
      ? theme.colors.successCard
      : theme.colors.dangerCard;

    const trendValue = `${isPositiveTrend ? "+" : ""}${vsLastMonthPercentage.toFixed(1)}%`;

    return (
      <View style={styles.container}>
        <StatCard
          iconBackgroundColor={trendIconBg}
          icon={
            <Feather
              name={isPositiveTrend ? "trending-up" : "trending-down"}
              size={22}
              color={trendColor}
            />
          }
          label="vs Last Month"
          value={trendValue}
          valueColor={trendColor}
        />

        <StatCard
          iconBackgroundColor={theme.colors.aiCard}
          icon={
            <Feather name="calendar" size={22} color={theme.colors.secondary} />
          }
          label="Days Left"
          value={`${daysLeft} days`}
          valueColor={theme.colors.secondary}
        />
      </View>
    );
  },
);

BudgetInsightRow.displayName = "BudgetInsightRow";

export default BudgetInsightRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.md,
  },
});
