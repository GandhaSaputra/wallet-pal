export type BudgetSummaryData = {
  currencyCode?: string; // ISO 4217 - optional, fallback to device currency
  totalSpentThisMonth: number;
  budgetThisMonth: number;
  daysLeft: number;
};

export type BudgetSummaryCardProps = BudgetSummaryData;
