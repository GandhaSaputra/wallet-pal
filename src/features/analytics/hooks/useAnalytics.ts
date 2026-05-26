import { useBudgetStore } from "@/src/features/budget/budget.store";
import { useMemo, useState } from "react";
import { AnalyticsPeriod } from "../analytics.model";
import { getAnalyticsSnapshot, getInsights } from "../analytics.service";

export function useAnalytics() {
  const categoryBreakdown = useBudgetStore((state) => state.categoryBreakdown);
  const [selectedPeriod, setSelectedPeriod] =
    useState<AnalyticsPeriod>("month");

  const snapshot = useMemo(() => getAnalyticsSnapshot(), []);
  const insights = useMemo(
    () => getInsights(selectedPeriod),
    [selectedPeriod],
  );

  return {
    categoryBreakdown,
    currentMonth: snapshot.currentMonth,
    insights,
    selectedPeriod,
    setSelectedPeriod,
    trendData: snapshot.trendData,
    trendPercentage: snapshot.trendPercentage,
  };
}
