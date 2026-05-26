import AISearchCard from "@/src/features/search/components/AISearchCard";
import ModalFilter, {
  ModalFilterRef,
} from "@/src/features/search/components/ModalFilter";
import ModalSort, {
  ModalSortRef,
} from "@/src/features/search/components/ModalSort";
import QuickFiltersCard from "@/src/features/search/components/QuickFiltersCard";
import SearchFilterHeader from "@/src/features/search/components/SearchFilterHeader";
import SearchResultList from "@/src/features/search/components/SearchResultList";
import SearchTotalCard from "@/src/features/search/components/SearchTotalCard";
import { useSearchTransactions } from "@/src/features/search/hooks/useSearchTransactions";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function SearchScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const modalSortRef = useRef<ModalSortRef>(null);
  const modalFilterRef = useRef<ModalFilterRef>(null);
  const {
    activeFilters,
    handleSubmit,
    handleToggleFilter,
    isFiltered,
    isProcessing,
    query,
    quickFilters,
    selectedFilters,
    setActiveFilters,
    setQuery,
    setSortId,
    sortId,
    sortedResults,
    totalAmount,
  } = useSearchTransactions();

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
            filters={quickFilters}
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
