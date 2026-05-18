export type TransactionCategoryId =
  | "foodDining"
  | "transportation"
  | "billsUtilities"
  | "shopping"
  | "healthcare"
  | "entertainment";

export type TransactionCategory = {
  id: TransactionCategoryId;
  label: string;
  icon: string;
};

export const TRANSACTION_CATEGORIES: TransactionCategory[] = [
  {
    id: "foodDining",
    label: "Food &\nDining",
    icon: "🍽️",
  },
  {
    id: "transportation",
    label: "Transportation",
    icon: "🚗",
  },
  {
    id: "billsUtilities",
    label: "Bills &\nUtilities",
    icon: "⚡",
  },
  {
    id: "shopping",
    label: "Shopping",
    icon: "🛍️",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: "🏥",
  },
  {
    id: "entertainment",
    label: "Entertainment",
    icon: "🎬",
  },
];
