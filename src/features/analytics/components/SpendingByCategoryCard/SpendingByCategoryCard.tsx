import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import React, { useMemo } from "react";
import { View } from "react-native";
import CategoryLegend from "./CategoryLegend";
import DonutChart from "./DonutChart";
import { createStyles } from "./SpendingByCategoryCard.styles";
import { SpendingByCategoryCardProps } from "./SpendingByCategoryCard.types";

const SpendingByCategoryCard = React.memo(
  ({ items, month, currencyCode }: SpendingByCategoryCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View style={styles.container}>
        <View style={[theme.flex.rowCenterBetween, styles.header]}>
          <ThemedText type="titleSmall">Spending by Category</ThemedText>
          <View style={styles.monthBadge}>
            <ThemedText type="labelSmall" colorVariant="textSecondary">
              {month}
            </ThemedText>
          </View>
        </View>

        <View style={styles.wrapperContent}>
          <DonutChart items={items} />
          <CategoryLegend items={items} currencyCode={currencyCode} />
        </View>
      </View>
    );
  },
);

SpendingByCategoryCard.displayName = "SpendingByCategoryCard";

export default SpendingByCategoryCard;
