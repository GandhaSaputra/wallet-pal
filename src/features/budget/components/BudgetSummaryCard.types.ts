export type BudgetSummaryData = {
  currencyCode?: string; // ISO 4217 — opsional, fallback ke device currency
  totalSpentThisMonth: number;
  budgetThisMonth: number;
  daysLeft: number;
};

export type BudgetSummaryCardProps = BudgetSummaryData;
