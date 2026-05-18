import { CategoryColors } from "@/src/constants/theme";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { formatCurrency } from "@/src/shared/utils/formatCurrency";
import React, { useMemo } from "react";
import { View } from "react-native";
import { createStyles } from "./SpendingByCategoryCard.styles";
import { SpendingByCategoryCardProps } from "./SpendingByCategoryCard.types";

type CategoryLegendProps = {
  items: SpendingByCategoryCardProps["items"];
  currencyCode?: SpendingByCategoryCardProps["currencyCode"];
};

const CategoryLegend = ({ items, currencyCode }: CategoryLegendProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles({ theme }), [theme]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.amount, 0),
    [items],
  );

  return (
    <View style={styles.content}>
      {items.map((item) => {
        const percentage = ((item.amount / total) * 100).toFixed(0);
        return (
          <View
            key={item.category}
            style={[theme.flex.rowCenterBetween, styles.legendItem]}
          >
            <View
              style={[theme.flex.rowCenterCenter, { gap: theme.spacing.sm }]}
            >
              <View
                style={[
                  styles.dot,
                  { backgroundColor: CategoryColors[item.category] },
                ]}
              />
              <ThemedText type="bodySmall">{item.label}</ThemedText>
            </View>
            <View style={styles.legendRight}>
              <ThemedText type="bodySmallSemibold">
                {formatCurrency({
                  amount: item.amount,
                  currency: currencyCode,
                })}
              </ThemedText>
              <ThemedText type="labelSmallRegular" colorVariant="textSecondary">
                {percentage}%
              </ThemedText>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default CategoryLegend;
