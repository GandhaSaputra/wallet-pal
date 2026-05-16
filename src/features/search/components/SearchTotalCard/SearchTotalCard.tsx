import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { formatCurrency } from "@/src/shared/utils/formatCurrency";
import React, { useMemo } from "react";
import { View } from "react-native";
import { createStyles } from "./SearchTotalCard.styles";
import { SearchTotalCardProps } from "./SearchTotalCard.types";

const SearchTotalCard = React.memo(
  ({
    label,
    totalAmount,
    transactionCount,
    period,
    currencyCode,
  }: SearchTotalCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    const isExpense = totalAmount < 0;
    const formattedAmount = `${isExpense ? "-" : "+"}${formatCurrency({
      amount: Math.abs(totalAmount),
      currency: currencyCode,
    })}`;

    return (
      <View style={styles.container}>
        <View style={theme.flex.rowCenterBetween}>
          <View style={{ gap: 4 }}>
            <ThemedText type="bodyMediumSemibold">{label}</ThemedText>
            <ThemedText type="labelSmallRegular" colorVariant="textMuted">
              {transactionCount} transactions {period}
            </ThemedText>
          </View>
          <ThemedText
            type="titleSmall"
            colorVariant={isExpense ? "text" : "success"}
          >
            {formattedAmount}
          </ThemedText>
        </View>
      </View>
    );
  },
);

SearchTotalCard.displayName = "SearchTotalCard";

export default SearchTotalCard;
