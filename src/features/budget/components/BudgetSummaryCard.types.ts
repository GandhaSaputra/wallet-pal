export type BudgetSummaryData = {
  currency: string;
  totalSpentThisMonth: number;
  budgetThisMonth: number;
  daysLeft: number;
};

export type BudgetSummaryCardProps = BudgetSummaryData;
