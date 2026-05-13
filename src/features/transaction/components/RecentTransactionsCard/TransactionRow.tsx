import { Theme } from "@/src/constants/theme";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { formatCurrency } from "@/src/shared/utils/formatCurrency";
import React from "react";
import { View } from "react-native";
import { createStyles } from "./RecentTransactionsCard.styles";
import { TransactionItem } from "./RecentTransactionsCard.types";

type TransactionRowProps = {
  item: TransactionItem;
  currencyCode?: string;
  styles: ReturnType<typeof createStyles>;
  theme: Theme;
};

const TransactionRow = React.memo(
  ({ item, currencyCode, styles, theme }: TransactionRowProps) => {
    const isExpense = item.amount < 0;
    const formattedAmount = `${formatCurrency({
      amount: item.amount,
      currency: currencyCode,
      showDecimals: true,
    })}`;

    return (
      <View style={[theme.flex.rowCenterBetween, styles.transactionItem]}>
        <View style={styles.iconContainer}>
          <ThemedText type="titleSmall">{item.icon}</ThemedText>
        </View>
        <View style={styles.merchantInfo}>
          <ThemedText type="bodySmallSemibold">{item.merchantName}</ThemedText>
          <View
            style={[
              theme.flex.rowCenterStart,
              {
                gap: theme.spacing.xs,
              },
            ]}
          >
            <View style={styles.categoryBadge}>
              <ThemedText type="labelSmallRegular">
                {item.categoryLabel}
              </ThemedText>
            </View>
            <ThemedText type="labelSmallRegular" colorVariant="textSecondary">
              {item.date}
            </ThemedText>
          </View>
        </View>
        <ThemedText
          type="bodySmallSemibold"
          colorVariant={isExpense ? "text" : "success"}
        >
          {formattedAmount}
        </ThemedText>
      </View>
    );
  },
);

TransactionRow.displayName = "TransactionRow";

export default TransactionRow;
