import { Transaction } from "@/src/features/transaction/transaction.model";
import { useTransactionStore } from "@/src/features/transaction/transaction.store";
import { useMemo, useState } from "react";
import {
  DEFAULT_FILTERS,
  SearchFilters,
} from "../components/ModalFilter";
import { QuickFilterItem } from "../components/QuickFiltersCard";
import { parseNaturalLanguageSearch } from "../search.service";

export const QUICK_FILTERS: QuickFilterItem[] = [
  { id: "this_week", label: "This Week" },
  { id: "this_month", label: "This Month" },
  { id: "food", label: "Food" },
  { id: "over_20", label: "Over $20" },
];

const getReferenceDate = (dates: string[]) => {
  if (dates.length === 0) {
    return new Date();
  }

  return dates.reduce((latest, date) => {
    const current = new Date(date);
    return current > latest ? current : latest;
  }, new Date(dates[0]));
};

const isInDateRange = (
  date: string,
  range: SearchFilters["dateRange"],
  referenceDate: Date,
) => {
  if (range === "all") {
    return true;
  }

  const txDate = new Date(date);

  if (Number.isNaN(txDate.getTime())) {
    return false;
  }

  switch (range) {
    case "this_week": {
      const weekAgo = new Date(referenceDate);
      weekAgo.setDate(referenceDate.getDate() - 7);
      return txDate >= weekAgo && txDate <= referenceDate;
    }
    case "this_month":
      return (
        txDate.getMonth() === referenceDate.getMonth() &&
        txDate.getFullYear() === referenceDate.getFullYear()
      );
    case "last_month": {
      const lastMonth = new Date(
        referenceDate.getFullYear(),
        referenceDate.getMonth() - 1,
      );
      return (
        txDate.getMonth() === lastMonth.getMonth() &&
        txDate.getFullYear() === lastMonth.getFullYear()
      );
    }
    default:
      return true;
  }
};

const matchesPaymentMethod = (transaction: Transaction, methodId: string) => {
  const methodMap: Record<string, string[]> = {
    cash: ["Cash"],
    credit_card: ["Credit Card"],
    digital_wallet: ["Digital Wallet", "E-Wallet"],
  };

  return methodMap[methodId]?.includes(transaction.paymentMethod) ?? false;
};

export function useSearchTransactions() {
  const transactions = useTransactionStore((state) => state.transactions);
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    "this_month",
    "food",
  ]);
  const [sortId, setSortId] = useState("date_desc");
  const [activeFilters, setActiveFilters] =
    useState<SearchFilters>(DEFAULT_FILTERS);

  const referenceDate = useMemo(
    () => getReferenceDate(transactions.map((transaction) => transaction.date)),
    [transactions],
  );

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    setIsProcessing(true);
    await parseNaturalLanguageSearch(text);
    setIsProcessing(false);
  };

  const handleToggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((filterId) => filterId !== id) : [...prev, id],
    );
  };

  const filteredResults = useMemo(() => {
    let results = [...transactions];

    if (query.trim()) {
      const lowerCaseQuery = query.toLowerCase();
      results = results.filter(
        (transaction) =>
          transaction.merchantName.toLowerCase().includes(lowerCaseQuery) ||
          transaction.categoryLabel.toLowerCase().includes(lowerCaseQuery),
      );
    }

    if (selectedFilters.includes("this_week")) {
      results = results.filter((transaction) =>
        isInDateRange(transaction.date, "this_week", referenceDate),
      );
    }

    if (selectedFilters.includes("this_month")) {
      results = results.filter((transaction) =>
        isInDateRange(transaction.date, "this_month", referenceDate),
      );
    }

    if (selectedFilters.includes("food")) {
      results = results.filter((transaction) => transaction.category === "food");
    }

    if (selectedFilters.includes("over_20")) {
      results = results.filter(
        (transaction) => Math.abs(transaction.amount) > 20,
      );
    }

    if (activeFilters.categories.length > 0) {
      results = results.filter((transaction) =>
        activeFilters.categories.includes(transaction.category),
      );
    }

    if (activeFilters.dateRange !== "all") {
      results = results.filter((transaction) =>
        isInDateRange(transaction.date, activeFilters.dateRange, referenceDate),
      );
    }

    if (activeFilters.minAmount) {
      const min = Number(activeFilters.minAmount);
      results = results.filter(
        (transaction) => Math.abs(transaction.amount) >= min,
      );
    }

    if (activeFilters.maxAmount) {
      const max = Number(activeFilters.maxAmount);
      results = results.filter(
        (transaction) => Math.abs(transaction.amount) <= max,
      );
    }

    if (activeFilters.paymentMethods.length > 0) {
      results = results.filter((transaction) =>
        activeFilters.paymentMethods.some((method) =>
          matchesPaymentMethod(transaction, method),
        ),
      );
    }

    return results;
  }, [activeFilters, query, referenceDate, selectedFilters, transactions]);

  const sortedResults = useMemo(() => {
    return [...filteredResults].sort((a, b) => {
      switch (sortId) {
        case "date_desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date_asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount_desc":
          return Math.abs(b.amount) - Math.abs(a.amount);
        case "amount_asc":
          return Math.abs(a.amount) - Math.abs(b.amount);
        default:
          return 0;
      }
    });
  }, [filteredResults, sortId]);

  const totalAmount = useMemo(
    () => sortedResults.reduce((sum, transaction) => sum + transaction.amount, 0),
    [sortedResults],
  );

  const isFiltered =
    selectedFilters.length > 0 ||
    activeFilters.categories.length > 0 ||
    activeFilters.dateRange !== "all" ||
    !!activeFilters.minAmount ||
    !!activeFilters.maxAmount ||
    activeFilters.paymentMethods.length > 0;

  return {
    activeFilters,
    handleSubmit,
    handleToggleFilter,
    isFiltered,
    isProcessing,
    query,
    quickFilters: QUICK_FILTERS,
    selectedFilters,
    setActiveFilters,
    setQuery,
    setSortId,
    sortId,
    sortedResults,
    totalAmount,
  };
}
