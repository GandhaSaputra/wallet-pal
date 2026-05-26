import { MOCK_BREAKDOWN, MOCK_SPENDING } from "@/src/mocks/analytics";
import { MOCK_BUDGET } from "@/src/mocks/budget";
import { CategoryBreakdownItem } from "../analytics/components/CategoryBreakdownCard";
import { SpendingCategoryItem } from "../analytics/components/SpendingByCategoryCard";
import { BudgetSummary, UpdateBudgetInput } from "./budget.model";

let summary: BudgetSummary = MOCK_BUDGET;
let spendingByCategory: SpendingCategoryItem[] = MOCK_SPENDING;
let categoryBreakdown: CategoryBreakdownItem[] = MOCK_BREAKDOWN;

export function getInitialBudgetState() {
  return {
    categoryBreakdown,
    spendingByCategory,
    summary,
  };
}

export async function fetchBudgetSummary() {
  return summary;
}

export async function fetchSpendingByCategory() {
  return spendingByCategory;
}

export async function fetchCategoryBreakdown() {
  return categoryBreakdown;
}

export async function updateBudget(input: UpdateBudgetInput) {
  summary = {
    ...summary,
    budgetThisMonth: input.monthlyBudget ?? summary.budgetThisMonth,
    currencyCode: input.currencyCode ?? summary.currencyCode,
  };

  categoryBreakdown = categoryBreakdown.map((item) => ({
    ...item,
    thisMonthBudget: input.monthlyBudget ?? item.thisMonthBudget,
  }));

  return summary;
}
