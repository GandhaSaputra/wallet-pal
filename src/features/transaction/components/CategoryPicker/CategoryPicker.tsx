import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createStyles } from "./CategoryPicker.styles";
import { CategoryPickerProps } from "./CategoryPicker.types";

const CategoryPicker = React.memo(
  ({
    categories,
    selectedCategoryId,
    onSelectCategory,
    required = false,
  }: CategoryPickerProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View style={styles.wrapper}>
        <ThemedText type="bodyMediumSemibold" style={styles.label}>
          Category
          {required && (
            <ThemedText type="bodyMediumSemibold" colorVariant="danger">
              {" *"}
            </ThemedText>
          )}
        </ThemedText>

        <View style={styles.grid}>
          {categories.map((category) => {
            const isSelected = category.id === selectedCategoryId;
            return (
              <TouchableOpacity
                key={category.id}
                activeOpacity={0.75}
                onPress={() => onSelectCategory(category.id)}
                style={[styles.item, isSelected && styles.selectedItem]}
              >
                <Text style={styles.itemIcon}>{category.icon}</Text>
                <ThemedText
                  type="bodySmallMedium"
                  style={[
                    styles.itemLabel,
                    isSelected && styles.selectedItemLabel,
                  ]}
                >
                  {category.label}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  },
);

CategoryPicker.displayName = "CategoryPicker";

export default CategoryPicker;
