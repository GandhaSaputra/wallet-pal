import { BudgetSummaryData } from "./components/BudgetSummaryCard";

export type BudgetSummary = BudgetSummaryData;

export type BudgetSettings = {
  monthlyBudget: number;
  currencyCode?: string;
};

export type UpdateBudgetInput = Partial<BudgetSettings>;
