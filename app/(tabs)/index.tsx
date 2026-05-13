import { StyleSheet } from "react-native";

import { Theme } from "@/src/constants/theme";
import SpendingByCategoryCard from "@/src/features/analytics/components/SpendingByCategoryCard";
import BudgetSummaryCard from "@/src/features/budget/components/BudgetSummaryCard";
import { MOCK_SPENDING } from "@/src/mocks/analytics";
import { MOCK_BUDGET } from "@/src/mocks/budget";
import HomeHeader from "@/src/shared/components/header/HomeHeader";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";

export default function HomeScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <ThemedView style={styles.container}>
      <HomeHeader />
      <Spacer height={theme.spacing.xl} />
      <BudgetSummaryCard {...MOCK_BUDGET} />
      <Spacer height={theme.spacing.xl} />
      <SpendingByCategoryCard items={MOCK_SPENDING} month="January 2025" />
    </ThemedView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.default,
    },
  });
