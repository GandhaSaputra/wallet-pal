import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { createStyles } from "./QuickFiltersCard.styles";
import { QuickFiltersCardProps } from "./QuickFiltersCard.types";

const QuickFiltersCard = React.memo(
  ({ filters, selectedIds, onToggle }: QuickFiltersCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View style={styles.container}>
        <ThemedText type="bodyMediumMedium">Quick Filters</ThemedText>
        <View style={styles.chipsWrapper}>
          {filters.map((filter) => {
            const isSelected = selectedIds.includes(filter.id);
            return (
              <TouchableOpacity
                key={filter.id}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => onToggle(filter.id)}
                activeOpacity={0.7}
              >
                <ThemedText
                  type="bodySmallMedium"
                  colorVariant={isSelected ? "white" : "textSecondary"}
                >
                  {filter.label}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  },
);

QuickFiltersCard.displayName = "QuickFiltersCard";

export default QuickFiltersCard;
