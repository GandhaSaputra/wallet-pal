import { CategoryBreakdownItem } from "@/src/features/analytics/components/CategoryBreakdownCard";
import { SpendingCategoryItem } from "@/src/features/analytics/components/SpendingByCategoryCard";
import { create } from "zustand";
import { BudgetSummary, UpdateBudgetInput } from "./budget.model";
import { budgetRepository } from "./budget.repository";
import { getInitialBudgetState } from "./budget.service";

type AsyncStatus = "idle" | "loading" | "success" | "error";

type BudgetStore = {
  summary: BudgetSummary;
  spendingByCategory: SpendingCategoryItem[];
  categoryBreakdown: CategoryBreakdownItem[];
  monthLabel: string;
  status: AsyncStatus;
  mutationStatus: AsyncStatus;
  error: string | null;
  fetchBudget: () => Promise<void>;
  updateBudget: (input: UpdateBudgetInput) => Promise<boolean>;
  resetError: () => void;
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

const initialState = getInitialBudgetState();

export const useBudgetStore = create<BudgetStore>((set) => ({
  ...initialState,
  monthLabel: "January 2025",
  status: "success",
  mutationStatus: "idle",
  error: null,
  fetchBudget: async () => {
    set({ status: "loading", error: null });

    try {
      const [summary, spendingByCategory, categoryBreakdown] = await Promise.all([
        budgetRepository.fetchSummary(),
        budgetRepository.fetchSpendingByCategory(),
        budgetRepository.fetchCategoryBreakdown(),
      ]);

      set({
        categoryBreakdown,
        spendingByCategory,
        status: "success",
        summary,
      });
    } catch (error) {
      set({ error: getErrorMessage(error), status: "error" });
    }
  },
  updateBudget: async (input) => {
    set({ mutationStatus: "loading", error: null });

    try {
      const summary = await budgetRepository.update(input);
      set((state) => ({
        categoryBreakdown:
          input.monthlyBudget === undefined
            ? state.categoryBreakdown
            : state.categoryBreakdown.map((item) => ({
                ...item,
                thisMonthBudget: input.monthlyBudget ?? item.thisMonthBudget,
              })),
        mutationStatus: "success",
        summary,
      }));

      return true;
    } catch (error) {
      set({ error: getErrorMessage(error), mutationStatus: "error" });
      return false;
    }
  },
  resetError: () => set({ error: null }),
}));
