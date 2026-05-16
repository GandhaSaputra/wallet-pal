import AISearchCard from "@/src/features/search/components/AISearchCard";
import QuickFiltersCard, {
  QuickFilterItem,
} from "@/src/features/search/components/QuickFiltersCard";
import SearchFilterHeader from "@/src/features/search/components/SearchFilterHeader";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

const QUICK_FILTERS: QuickFilterItem[] = [
  { id: "this_week", label: "This Week" },
  { id: "this_month", label: "This Month" },
  { id: "food", label: "Food" },
  { id: "over_20", label: "Over $20" },
];

export default function SearchScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    "this_month",
    "food",
  ]);

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
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
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
      </ScrollView>
    </ThemedView>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
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
