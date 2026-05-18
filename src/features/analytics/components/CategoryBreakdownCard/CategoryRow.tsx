import { CategoryColors, Theme } from "@/src/constants/theme";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { formatCurrency } from "@/src/shared/utils/formatCurrency";
import React from "react";
import { DimensionValue, View } from "react-native";
import { CategoryBreakdownItem } from ".";
import { createStyles } from "./CategoryBreakdownCard.styles";

type CategoryRowProps = {
  item: CategoryBreakdownItem;
  maxAmount: number;
  styles: ReturnType<typeof createStyles>;
  theme: Theme;
  currencyCode?: string;
};

const CategoryRow = React.memo(
  ({ item, maxAmount, styles, theme, currencyCode }: CategoryRowProps) => {
    const thisMonthWidth: DimensionValue = `${(item.thisMonth / maxAmount) * 100}%`;
    const lastMonthWidth: DimensionValue = `${(item.lastMonth / maxAmount) * 100}%`;
    const categoryColor = CategoryColors[item.category];

    return (
      <View style={styles.categoryRow}>
        {/* Label + Amount */}
        <View style={theme.flex.rowCenterBetween}>
          <ThemedText type="bodySmallSemibold">{item.label}</ThemedText>
          <ThemedText type="bodySmallSemibold">
            {formatCurrency({ amount: item.thisMonth, currency: currencyCode })}
          </ThemedText>
        </View>

        {/* This Month bar */}
        <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
          <View style={styles.barWrapper}>
            <View
              style={[
                styles.barFill,
                { width: thisMonthWidth, backgroundColor: categoryColor },
              ]}
            />
          </View>

          {/* Last Month bar */}
          <View style={styles.barWrapper}>
            <View style={[styles.lastMonthBar, { width: lastMonthWidth }]} />
          </View>
        </View>

        {/* Bar labels */}
        <View style={theme.flex.rowCenterBetween}>
          <ThemedText type="labelSmallRegular" colorVariant="textMuted">
            This Month
          </ThemedText>
          <ThemedText type="labelSmallRegular" colorVariant="textMuted">
            Last Month
          </ThemedText>
        </View>
      </View>
    );
  },
);

CategoryRow.displayName = "CategoryRow";

export default CategoryRow;
