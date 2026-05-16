import { Theme } from "@/src/constants/theme";
import { TransactionItem } from "@/src/features/transaction/components/RecentTransactionsCard/RecentTransactionsCard.types";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { formatCurrency } from "@/src/shared/utils/formatCurrency";
import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Pressable, View } from "react-native";
import { createStyles } from "./SearchResultList.styles";
import { SearchResultListProps } from "./SearchResultList.types";

type ResultItemProps = {
  item: TransactionItem;
  styles: ReturnType<typeof createStyles>;
  theme: Theme;
  currencyCode?: string;
};

const ResultItem = React.memo(
  ({ item, styles, currencyCode }: ResultItemProps) => {
    const isExpense = item.amount < 0;
    const formattedAmount = `${isExpense ? "-" : "+"}${formatCurrency({
      amount: Math.abs(item.amount),
      currency: currencyCode,
      showDecimals: true,
    })}`;

    return (
      <View style={styles.transactionItem}>
        <View style={styles.iconContainer}>
          <ThemedText type="titleSmall">{item.icon}</ThemedText>
        </View>
        <View style={styles.merchantInfo}>
          <ThemedText type="bodySmallSemibold">{item.merchantName}</ThemedText>
          <View style={styles.metaRow}>
            <View style={styles.categoryBadge}>
              <ThemedText type="labelSmallRegular" colorVariant="textSecondary">
                {item.categoryLabel}
              </ThemedText>
            </View>
            <View style={styles.dot} />
            <ThemedText type="labelSmallRegular" colorVariant="textMuted">
              {item.paymentMethod}
            </ThemedText>
            <View style={styles.dot} />
            <ThemedText type="labelSmallRegular" colorVariant="textMuted">
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

ResultItem.displayName = "ResultItem";

const SearchResultList = React.memo(
  ({
    results,
    totalCount,
    isFiltered,
    currencyCode,
    onSortPress,
  }: SearchResultListProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View>
        <View style={[theme.flex.rowCenterBetween, styles.resultHeader]}>
          <View style={[theme.flex.rowCenterCenter, { gap: theme.spacing.sm }]}>
            <ThemedText type="bodyMediumSemibold">
              {totalCount} Results
            </ThemedText>
            {isFiltered && (
              <View style={styles.filteredBadge}>
                <ThemedText
                  type="labelSmallRegular"
                  colorVariant="textSecondary"
                >
                  Filtered
                </ThemedText>
              </View>
            )}
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.sortButton,
              pressed && { opacity: 0.7 },
            ]}
            onPress={onSortPress}
            hitSlop={8}
          >
            <Feather name="bar-chart-2" size={18} color={theme.colors.icon} />
          </Pressable>
        </View>
        <View style={styles.resultsList}>
          {results.map((item) => (
            <ResultItem
              key={item.id}
              item={item}
              styles={styles}
              theme={theme}
              currencyCode={currencyCode}
            />
          ))}
        </View>
      </View>
    );
  },
);

SearchResultList.displayName = "SearchResultList";

export default SearchResultList;
