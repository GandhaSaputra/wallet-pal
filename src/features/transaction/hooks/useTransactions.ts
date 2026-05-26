import { useMemo } from "react";
import { useTransactionStore } from "../transaction.store";
import { toRecentTransactionItem } from "../transaction.model";

export function useTransactions() {
  const transactions = useTransactionStore((state) => state.transactions);
  const status = useTransactionStore((state) => state.status);
  const mutationStatus = useTransactionStore((state) => state.mutationStatus);
  const error = useTransactionStore((state) => state.error);
  const fetchTransactions = useTransactionStore(
    (state) => state.fetchTransactions,
  );

  const recentTransactions = useMemo(
    () => transactions.slice(0, 4).map(toRecentTransactionItem),
    [transactions],
  );

  return {
    error,
    fetchTransactions,
    isLoading: status === "loading",
    isMutating: mutationStatus === "loading",
    recentTransactions,
    transactions,
  };
}
