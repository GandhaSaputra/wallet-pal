import { SpendingCategory } from "@/src/features/analytics/components/SpendingByCategoryCard/SpendingByCategoryCard.types";

export type TransactionItem = {
  id: string;
  icon: string;
  merchantName: string;
  category: SpendingCategory;
  categoryLabel: string;
  paymentMethod: string;
  date: string;
  amount: number;
};

export type RecentTransactionsCardProps = {
  transactions: TransactionItem[];
  currencyCode?: string;
  onViewAll?: () => void;
};
