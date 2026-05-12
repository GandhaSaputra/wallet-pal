import { StyleSheet } from "react-native";

import { Theme } from "@/src/constants/theme";
import BudgetSummaryCard from "@/src/features/budget/components/BudgetSummaryCard";
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
      <BudgetSummaryCard
        currency="$"
        totalSpentThisMonth={2847}
        budgetThisMonth={3500}
        daysLeft={9}
      />
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
