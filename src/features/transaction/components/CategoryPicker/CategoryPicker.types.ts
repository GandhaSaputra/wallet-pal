import {
  TransactionCategory,
  TransactionCategoryId,
} from "@/src/constants/categories";

export type CategoryPickerProps = {
  categories: TransactionCategory[];
  selectedCategoryId: TransactionCategoryId;
  onSelectCategory: (categoryId: TransactionCategoryId) => void;
  required?: boolean;
};
