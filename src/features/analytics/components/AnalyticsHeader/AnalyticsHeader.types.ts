export type AnalyticsPeriod = "month" | "year";

export type AnalyticsHeaderProps = {
  selectedPeriod: AnalyticsPeriod;
  onSelectPeriod: (period: AnalyticsPeriod) => void;
};
