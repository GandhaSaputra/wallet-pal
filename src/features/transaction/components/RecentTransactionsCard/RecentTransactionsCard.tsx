import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { createStyles } from "./RecentTransactionsCard.styles";
import { RecentTransactionsCardProps } from "./RecentTransactionsCard.types";
import TransactionRow from "./TransactionRow";

const RecentTransactionsCard = React.memo(
  ({ transactions, currencyCode, onViewAll }: RecentTransactionsCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View style={styles.container}>
        <View style={[theme.flex.rowCenterBetween, styles.header]}>
          <ThemedText type="bodyMediumSemibold">Recent Transactions</ThemedText>
          <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
            <ThemedText type="bodySmallMedium" style={styles.viewAllText}>
              View All
            </ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.itemsList}>
          {transactions.map((item) => (
            <TransactionRow
              key={item.id}
              item={item}
              currencyCode={currencyCode}
              styles={styles}
              theme={theme}
            />
          ))}
        </View>
      </View>
    );
  },
);

RecentTransactionsCard.displayName = "RecentTransactionsCard";

export default RecentTransactionsCard;
