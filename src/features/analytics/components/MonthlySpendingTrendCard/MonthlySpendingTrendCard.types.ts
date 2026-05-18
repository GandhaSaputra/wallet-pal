export type TrendDataPoint = {
  month: string;
  year: number;
  amount: number;
};

export type MonthlySpendingTrendCardProps = {
  data: TrendDataPoint[];
  trendPercentage: number;
  currentMonth: string;
  currencyCode?: string;
};

export type ChartPoint = {
  x: number;
  y: number;
  data: TrendDataPoint;
  showYearLabel: boolean;
};

export type TooltipState = {
  index: number;
  x: number;
  y: number;
  label: string;
} | null;
