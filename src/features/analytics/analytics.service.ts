import { AnalyticsPeriod, AnalyticsSnapshot } from "./analytics.model";
import { TrendDataPoint } from "./components/MonthlySpendingTrendCard";
import { MONTHLY_INSIGHTS, YEARLY_INSIGHTS } from "@/src/mocks/analytics";

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

export const generateTrendData = (): TrendDataPoint[] => {
  const now = new Date();
  const data: TrendDataPoint[] = [];

  for (let i = MONTHS_BACK - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    data.push({
      amount: randomAmount(),
      month: MONTH_LABELS[date.getMonth()],
      year: date.getFullYear(),
    });
  }

  return data;
};

export function getAnalyticsSnapshot(): AnalyticsSnapshot {
  return {
    currentMonth: "January 2025",
    trendData: generateTrendData(),
    trendPercentage: 8.5,
  };
}

export function getInsights(period: AnalyticsPeriod) {
  return period === "month" ? MONTHLY_INSIGHTS : YEARLY_INSIGHTS;
}
