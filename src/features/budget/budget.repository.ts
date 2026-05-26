import { UpdateBudgetInput } from "./budget.model";
import * as budgetService from "./budget.service";

export const budgetRepository = {
  fetchSummary: budgetService.fetchBudgetSummary,
  fetchSpendingByCategory: budgetService.fetchSpendingByCategory,
  fetchCategoryBreakdown: budgetService.fetchCategoryBreakdown,
  update: (input: UpdateBudgetInput) => budgetService.updateBudget(input),
};
