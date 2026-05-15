import { Theme } from "@/src/constants/theme";
import AIPoweredInsightsCard from "@/src/features/analytics/components/AIPoweredInsightsCard";
import AnalyticsHeader, {
  AnalyticsPeriod,
} from "@/src/features/analytics/components/AnalyticsHeader";
import MonthlySpendingTrendCard from "@/src/features/analytics/components/MonthlySpendingTrendCard";
import { MONTHLY_INSIGHTS, YEARLY_INSIGHTS } from "@/src/mocks/analytics";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { TrendDataPoint } from "@/src/features/analytics/components/MonthlySpendingTrendCard/MonthlySpendingTrendCard.types";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTHS_BACK = 24;
const MIN_AMOUNT = 1500;
const MAX_AMOUNT = 4000;

const randomAmount = (): number =>
  Math.floor(Math.random() * (MAX_AMOUNT - MIN_AMOUNT + 1)) + MIN_AMOUNT;

export const generateMockTrendData = (): TrendDataPoint[] => {
  const now = new Date();
  const data: TrendDataPoint[] = [];

  for (let i = MONTHS_BACK - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    data.push({
      month: MONTH_LABELS[date.getMonth()],
      year: date.getFullYear(),
      amount: randomAmount(),
    });
  }

  return data;
};

export default function AnalyticsScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles({ theme }), [theme]);
  const [selectedPeriod, setSelectedPeriod] =
    useState<AnalyticsPeriod>("month");

  const insights =
    selectedPeriod === "month" ? MONTHLY_INSIGHTS : YEARLY_INSIGHTS;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <AnalyticsHeader
          selectedPeriod={selectedPeriod}
          onSelectPeriod={setSelectedPeriod}
        />
        <Spacer height={theme.spacing.xl} />
        <AIPoweredInsightsCard insights={insights} />
        <Spacer height={theme.spacing.xl} />
        <MonthlySpendingTrendCard
          data={generateMockTrendData()}
          trendPercentage={8.5}
          currentMonth="January 2025"
        />
        <Spacer height={theme.spacing.xl} />
      </ScrollView>
    </ThemedView>
  );
}

const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: theme.spacing.default,
    },
  });
