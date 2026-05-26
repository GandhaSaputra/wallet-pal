import { Theme } from "@/src/constants/theme";
import AIPoweredInsightsCard from "@/src/features/analytics/components/AIPoweredInsightsCard";
import AnalyticsHeader from "@/src/features/analytics/components/AnalyticsHeader";
import MonthlySpendingTrendCard from "@/src/features/analytics/components/MonthlySpendingTrendCard";
import { useAnalytics } from "@/src/features/analytics/hooks/useAnalytics";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";

import CategoryBreakdownCard from "@/src/features/analytics/components/CategoryBreakdownCard";
import CategoryInsightRow from "@/src/shared/components/category-insight-row";

export default function AnalyticsScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles({ theme }), [theme]);
  const {
    categoryBreakdown,
    currentMonth,
    insights,
    selectedPeriod,
    setSelectedPeriod,
    trendData,
    trendPercentage,
  } = useAnalytics();

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
        <Spacer height={theme.spacing.lg} />
        <AIPoweredInsightsCard insights={insights} />
        <Spacer height={theme.spacing.lg} />
        <MonthlySpendingTrendCard
          data={trendData}
          trendPercentage={trendPercentage}
          currentMonth={currentMonth}
        />
        <Spacer height={theme.spacing.lg} />
        <CategoryBreakdownCard items={categoryBreakdown} />
        <Spacer height={theme.spacing.lg} />
        <CategoryInsightRow
          bestCategory={{ label: "Transport", percentageSaved: 15 }}
          needsAttention={{ label: "Food", percentageOver: 25 }}
        />
        <Spacer height={theme.spacing.lg} />
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
