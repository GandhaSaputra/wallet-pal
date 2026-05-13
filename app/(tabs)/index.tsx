import { ScrollView, StyleSheet } from "react-native";

import { Theme } from "@/src/constants/theme";
import SpendingByCategoryCard from "@/src/features/analytics/components/SpendingByCategoryCard";
import BudgetInsightRow from "@/src/features/budget/components/BudgetInsightRow";
import BudgetSummaryCard from "@/src/features/budget/components/BudgetSummaryCard";
import RecentTransactionsCard from "@/src/features/transaction/components/RecentTransactionsCard";
import { MOCK_SPENDING } from "@/src/mocks/analytics";
import { MOCK_BUDGET } from "@/src/mocks/budget";
import { MOCK_TRANSACTIONS } from "@/src/mocks/tranasactions";
import HomeHeader from "@/src/shared/components/header/HomeHeader";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />
        <Spacer height={theme.spacing.xl} />
        <BudgetSummaryCard {...MOCK_BUDGET} />
        <Spacer height={theme.spacing.xl} />
        <SpendingByCategoryCard items={MOCK_SPENDING} month="January 2025" />
        <Spacer height={theme.spacing.xl} />
        <RecentTransactionsCard
          transactions={MOCK_TRANSACTIONS}
          onViewAll={() => router.push("/search")}
        />
        <Spacer height={theme.spacing.xl} />
        <BudgetInsightRow vsLastMonthPercentage={8.5} daysLeft={9} />
        <Spacer height={theme.spacing.xl} />
      </ScrollView>
    </ThemedView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: theme.spacing.default,
    },
  });
