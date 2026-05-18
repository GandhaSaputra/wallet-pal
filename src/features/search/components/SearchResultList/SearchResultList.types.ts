import { TransactionItem } from "@/src/features/transaction/components/RecentTransactionsCard/RecentTransactionsCard.types";

export type SearchResultListProps = {
  results: TransactionItem[];
  totalCount: number;
  isFiltered: boolean;
  currencyCode?: string;
  onSortPress: () => void;
};
