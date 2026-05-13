import { Gradients, spacing } from "@/src/constants/theme";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { formatCurrency } from "@/src/shared/utils/formatCurrency";
import { LinearGradient } from "expo-linear-gradient";
import { getLocales } from "expo-localization";
import React, { useMemo } from "react";
import { View } from "react-native";
import { BudgetSummaryCardProps } from ".";
import { createStyles } from "./BudgetSumamryCard.styles";

const GRADIENT_START = { x: 0.5, y: 0 };
const GRADIENT_END = { x: 1, y: 1 };

const BudgetSummaryCard = React.memo(
  ({
    totalSpentThisMonth,
    budgetThisMonth,
    daysLeft,
  }: BudgetSummaryCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    const deviceCurrencySymbol = getLocales()[0]?.currencySymbol ?? "$";
    const remainingBudget = budgetThisMonth - totalSpentThisMonth;
    const percentageUsed = (totalSpentThisMonth / budgetThisMonth) * 100;
    const clampedPercentage = Math.min(Math.max(percentageUsed, 0), 100);
    const isOverBudget = remainingBudget < 0;

    const textAmountTotalSpentThisMonth = formatCurrency({
      amount: totalSpentThisMonth,
    });
    const textBudget = `Budget: ${formatCurrency({
      amount: budgetThisMonth,
    })}`;
    const textRemaining = isOverBudget
      ? `Over: ${formatCurrency({ amount: Math.abs(remainingBudget) })}`
      : `Remaining: ${formatCurrency({ amount: remainingBudget })}`;
    const textUsed = `${percentageUsed.toFixed(1)}% used`;
    const textDayLeft = `${daysLeft} days left`;

    return (
      <View style={styles.shadowContainer}>
        <LinearGradient
          colors={Gradients.primaryCard}
          start={GRADIENT_START}
          end={GRADIENT_END}
          style={styles.container}
        >
          <View style={theme.flex.rowCenterBetween}>
            <View>
              <ThemedText colorVariant="white">
                Total spent this month
              </ThemedText>
              <Spacer height={spacing.xs} />
              <ThemedText type="numericLarge" colorVariant="white">
                {textAmountTotalSpentThisMonth}
              </ThemedText>
            </View>
            <View style={styles.currencyContainer}>
              <ThemedText type="displayMedium" colorVariant="white">
                {deviceCurrencySymbol}
              </ThemedText>
            </View>
          </View>
          <Spacer height={theme.spacing.default} />
          <View style={theme.flex.rowCenterBetween}>
            <ThemedText colorVariant="white">{textBudget}</ThemedText>
            <ThemedText type="bodyMediumSemibold" colorVariant="white">
              {textRemaining}
            </ThemedText>
          </View>
          <Spacer height={theme.spacing.md} />
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${clampedPercentage}%` }]}
            />
          </View>
          <Spacer height={theme.spacing.md} />
          <View style={theme.flex.rowCenterBetween}>
            <ThemedText type="labelSmallRegular" colorVariant="white">
              {textUsed}
            </ThemedText>
            <ThemedText type="labelSmallRegular" colorVariant="white">
              {textDayLeft}
            </ThemedText>
          </View>
        </LinearGradient>
      </View>
    );
  },
);

BudgetSummaryCard.displayName = "BudgetSummaryCard";

export default BudgetSummaryCard;
