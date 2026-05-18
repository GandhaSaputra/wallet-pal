import { BrandColors } from "@/src/constants/theme";
import StatCard from "@/src/shared/components/stat-card/StatCard";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { CategoryInsightRowProps } from "./CategoryInsightRow.types";

const CategoryInsightRow = React.memo(
  ({ bestCategory, needsAttention }: CategoryInsightRowProps) => {
    const theme = useTheme();

    return (
      <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
        <StatCard
          iconBackgroundColor={theme.colors.successCard}
          icon={
            <Feather name="arrow-down" size={22} color={BrandColors.success} />
          }
          label="Best Category"
          value={bestCategory.label}
          subValue={`-${bestCategory.percentageSaved}% saved`}
          subValueColor={BrandColors.success}
        />
        <StatCard
          iconBackgroundColor={theme.colors.dangerCard}
          icon={
            <Feather name="arrow-up" size={22} color={theme.colors.danger} />
          }
          label="Needs Attention"
          value={needsAttention.label}
          subValue={`+${needsAttention.percentageOver}% over`}
          subValueColor={theme.colors.danger}
        />
      </View>
    );
  },
);

CategoryInsightRow.displayName = "CategoryInsightRow";

export default CategoryInsightRow;
