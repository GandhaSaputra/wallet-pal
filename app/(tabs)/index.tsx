import { ScrollView, StyleSheet } from "react-native";

import { Theme } from "@/src/constants/theme";
import SpendingByCategoryCard from "@/src/features/analytics/components/SpendingByCategoryCard";
import BudgetInsightRow from "@/src/features/budget/components/BudgetInsightRow";
import BudgetSummaryCard from "@/src/features/budget/components/BudgetSummaryCard";
import { useBudgetStore } from "@/src/features/budget/budget.store";
import RecentTransactionsCard from "@/src/features/transaction/components/RecentTransactionsCard";
import { useTransactions } from "@/src/features/transaction/hooks/useTransactions";
import HomeHeader from "@/src/shared/components/header/HomeHeader";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const styles = createStyles({ theme });
  const budgetSummary = useBudgetStore((state) => state.summary);
  const spendingByCategory = useBudgetStore((state) => state.spendingByCategory);
  const monthLabel = useBudgetStore((state) => state.monthLabel);
  const { recentTransactions } = useTransactions();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />
        <Spacer height={theme.spacing.xl} />
        <BudgetSummaryCard {...budgetSummary} />
        <Spacer height={theme.spacing.xl} />
        <SpendingByCategoryCard items={spendingByCategory} month={monthLabel} />
        <Spacer height={theme.spacing.xl} />
        <RecentTransactionsCard
          transactions={recentTransactions}
          onViewAll={() => router.push("/search")}
        />
        <Spacer height={theme.spacing.xl} />
        <BudgetInsightRow vsLastMonthPercentage={8.5} daysLeft={9} />
        <Spacer height={theme.spacing.xl} />
      </ScrollView>
    </ThemedView>
  );
}

const createStyles = ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: theme.spacing.default,
    },
  });
