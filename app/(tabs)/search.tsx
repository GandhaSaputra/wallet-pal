import AISearchCard from "@/src/features/search/components/AISearchCard";
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
import { useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

const QUICK_FILTERS: QuickFilterItem[] = [
  { id: "this_week", label: "This Week" },
  { id: "this_month", label: "This Month" },
  { id: "food", label: "Food" },
  { id: "over_20", label: "Over $20" },
];

const TOTAL_AMOUNT = MOCK_SEARCH_RESULTS.reduce((sum, t) => sum + t.amount, 0);

export default function SearchScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const modalSortRef = useRef<ModalSortRef>(null);

  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    "this_month",
    "food",
  ]);
  const [sortId, setSortId] = useState("date_desc");

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

  return (
    <>
      <ThemedView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <SearchFilterHeader />

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
            results={MOCK_SEARCH_RESULTS}
            totalCount={MOCK_SEARCH_RESULTS.length}
            isFiltered={selectedFilters.length > 0}
            onSortPress={() => modalSortRef.current?.show()}
          />

          <Spacer height={theme.spacing.default} />

          <SearchTotalCard
            label="Total Coffee Expenses"
            totalAmount={TOTAL_AMOUNT}
            transactionCount={MOCK_SEARCH_RESULTS.length}
            period="this month"
          />

          <Spacer height={theme.spacing["2xl"]} />
        </ScrollView>
      </ThemedView>

      <ModalSort ref={modalSortRef} selectedId={sortId} onSelect={setSortId} />
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
