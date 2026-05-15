import { SpendingCategory } from "@/src/features/analytics/components/SpendingByCategoryCard/SpendingByCategoryCard.types";

export type CategoryBreakdownItem = {
  category: SpendingCategory;
  label: string;
  thisMonth: number;
  lastMonth: number;
  thisMonthBudget: number;
};

export type CategoryBreakdownCardProps = {
  items: CategoryBreakdownItem[];
  currencyCode?: string;
};
