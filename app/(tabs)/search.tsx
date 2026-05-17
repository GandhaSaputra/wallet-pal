import AISearchCard from "@/src/features/search/components/AISearchCard";
import ModalFilter, {
  DEFAULT_FILTERS,
  ModalFilterRef,
  SearchFilters,
} from "@/src/features/search/components/ModalFilter";
import ModalSort, {
  ModalSortRef,
} from "@/src/features/search/components/ModalSort";
import QuickFiltersCard, {
  QuickFilterItem,
} from "@/src/features/search/components/QuickFiltersCard";
import SearchFilterHeader from "@/src/features/search/components/SearchFilterHeader";
import SearchResultList from "@/src/features/search/components/SearchResultList";
import SearchTotalCard from "@/src/features/search/components/SearchTotalCard";
import { MOCK_SEARCH_RESULTS } from "@/src/mocks/search";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

const QUICK_FILTERS: QuickFilterItem[] = [
  { id: "this_week", label: "This Week" },
  { id: "this_month", label: "This Month" },
  { id: "food", label: "Food" },
  { id: "over_20", label: "Over $20" },
];

const getReferenceDate = (dates: string[]) =>
  dates.reduce((latest, date) => {
    const current = new Date(date);
    return current > latest ? current : latest;
  }, new Date(dates[0]));

const isInDateRange = (
  date: string,
  range: SearchFilters["dateRange"],
  referenceDate: Date,
) => {
  if (range === "all") {
    return true;
  }

  const txDate = new Date(date);

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

export default function SearchScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const modalSortRef = useRef<ModalSortRef>(null);
  const modalFilterRef = useRef<ModalFilterRef>(null);

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
    () => getReferenceDate(MOCK_SEARCH_RESULTS.map((result) => result.date)),
    [],
  );

  const handleSubmit = (text: string) => {
    if (!text.trim()) return;
    setIsProcessing(true);
    // TODO: call AI search API
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const handleToggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const filteredResults = useMemo(() => {
    let results = [...MOCK_SEARCH_RESULTS];

    // Filter by query
    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (t) =>
          t.merchantName.toLowerCase().includes(q) ||
          t.categoryLabel.toLowerCase().includes(q),
      );
    }

    // Filter by quick date filters
    if (selectedFilters.includes("this_week")) {
      results = results.filter((t) =>
        isInDateRange(t.date, "this_week", referenceDate),
      );
    }
    if (selectedFilters.includes("this_month")) {
      results = results.filter((t) =>
        isInDateRange(t.date, "this_month", referenceDate),
      );
    }

    // Filter by quick category filters
    if (selectedFilters.includes("food")) {
      results = results.filter((t) => t.category === "food");
    }

    // Filter by quick amount filters
    if (selectedFilters.includes("over_20")) {
      results = results.filter((t) => Math.abs(t.amount) > 20);
    }

    // Filter by category
    if (activeFilters.categories.length > 0) {
      results = results.filter((t) =>
        activeFilters.categories.includes(t.category),
      );
    }

    // Filter by date range
    if (activeFilters.dateRange !== "all") {
      results = results.filter((t) =>
        isInDateRange(t.date, activeFilters.dateRange, referenceDate),
      );
    }

    // Filter by amount range
    if (activeFilters.minAmount) {
      const min = parseFloat(activeFilters.minAmount);
      results = results.filter((t) => Math.abs(t.amount) >= min);
    }
    if (activeFilters.maxAmount) {
      const max = parseFloat(activeFilters.maxAmount);
      results = results.filter((t) => Math.abs(t.amount) <= max);
    }

    // Filter by payment method
    if (activeFilters.paymentMethods.length > 0) {
      const methodMap: Record<string, string> = {
        credit_card: "Credit Card",
        cash: "Cash",
        digital_wallet: "Digital Wallet",
      };
      results = results.filter((t) =>
        activeFilters.paymentMethods.some(
          (m) => methodMap[m] === t.paymentMethod,
        ),
      );
    }

    return results;
  }, [query, selectedFilters, activeFilters, referenceDate]);

  // Sort after filter
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
    () => sortedResults.reduce((sum, t) => sum + t.amount, 0),
    [sortedResults],
  );

  const isFiltered =
    selectedFilters.length > 0 ||
    activeFilters.categories.length > 0 ||
    activeFilters.dateRange !== "all" ||
    !!activeFilters.minAmount ||
    !!activeFilters.maxAmount ||
    activeFilters.paymentMethods.length > 0;

  return (
    <>
      <ThemedView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <SearchFilterHeader
            onFilterPress={() => modalFilterRef.current?.show()}
          />

          <Spacer height={theme.spacing.default} />

          <AISearchCard
            value={query}
            onChangeText={setQuery}
            onSubmit={handleSubmit}
            isProcessing={isProcessing}
          />

          <Spacer height={theme.spacing.default} />

          <QuickFiltersCard
            filters={QUICK_FILTERS}
            selectedIds={selectedFilters}
            onToggle={handleToggleFilter}
          />

          <Spacer height={theme.spacing.xl} />

          <SearchResultList
            results={sortedResults}
            totalCount={sortedResults.length}
            isFiltered={isFiltered}
            onSortPress={() => modalSortRef.current?.show()}
          />

          <Spacer height={theme.spacing.default} />

          <SearchTotalCard
            label="Total Coffee Expenses"
            totalAmount={totalAmount}
            transactionCount={sortedResults.length}
            period="this month"
          />

          <Spacer height={theme.spacing["2xl"]} />
        </ScrollView>
      </ThemedView>

      <ModalSort ref={modalSortRef} selectedId={sortId} onSelect={setSortId} />
      <ModalFilter
        ref={modalFilterRef}
        filters={activeFilters}
        onApply={setActiveFilters}
      />
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.default,
    },
    header: {
      paddingTop: theme.spacing.xl,
    },
    filterButton: {
      width: 40,
      height: 40,
      borderRadius: theme.radii.sm,
      backgroundColor: theme.colors.surfaceMuted,
      alignItems: "center",
      justifyContent: "center",
    },
  });
