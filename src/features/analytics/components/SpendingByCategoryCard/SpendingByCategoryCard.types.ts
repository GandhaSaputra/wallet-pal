import { CategoryColors } from "@/src/constants/theme";

export type SpendingCategory = keyof typeof CategoryColors;

export type SpendingCategoryItem = {
  category: SpendingCategory;
  label: string;
  amount: number;
};

export type SpendingByCategoryCardProps = {
  items: SpendingCategoryItem[];
  month?: string; // "January 2025"
  currencyCode?: string;
};
