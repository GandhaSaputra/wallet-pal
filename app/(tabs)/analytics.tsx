import { Theme } from "@/src/constants/theme";
import AIPoweredInsightsCard from "@/src/features/analytics/components/AIPoweredInsightsCard";
import AnalyticsHeader, {
  AnalyticsPeriod,
} from "@/src/features/analytics/components/AnalyticsHeader";
import { MONTHLY_INSIGHTS, YEARLY_INSIGHTS } from "@/src/mocks/analytics";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

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
