import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import React, { useMemo } from "react";
import { View } from "react-native";
import { createStyles } from "./CategoryBreakdownCard.styles";
import { CategoryBreakdownCardProps } from "./CategoryBreakdownCard.types";
import CategoryRow from "./CategoryRow";

const CategoryBreakdownCard = React.memo(
  ({ items, currencyCode }: CategoryBreakdownCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View style={styles.container}>
        <ThemedText type="titleSmall">Category Breakdown</ThemedText>
        {items.map((item) => (
          <CategoryRow
            key={item.category}
            item={item}
            maxAmount={item.thisMonthBudget}
            styles={styles}
            theme={theme}
            currencyCode={currencyCode}
          />
        ))}
      </View>
    );
  },
);

CategoryBreakdownCard.displayName = "CategoryBreakdownCard";

export default CategoryBreakdownCard;
