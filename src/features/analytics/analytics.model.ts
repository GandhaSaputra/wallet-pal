import { AnalyticsPeriod } from "./components/AnalyticsHeader";
import { TrendDataPoint } from "./components/MonthlySpendingTrendCard";

export type AnalyticsSnapshot = {
  currentMonth: string;
  trendData: TrendDataPoint[];
  trendPercentage: number;
};

export type { AnalyticsPeriod };
