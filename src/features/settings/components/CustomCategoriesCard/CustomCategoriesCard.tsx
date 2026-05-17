import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import React, { useMemo, useRef } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { createStyles } from "./CustomCategoriesCard.styles";
import {
  CustomCategoriesCardProps,
  CustomCategory,
} from "./CustomCategoriesCard.types";
import ModalAddCategory, { ModalAddCategoryRef } from "./ModalAddCategory";

type CategoryItemProps = {
  category: CustomCategory;
  onEdit: (category: CustomCategory) => void;
  onDelete: (id: string) => void;
  styles: ReturnType<typeof createStyles>;
  theme: ReturnType<typeof useTheme>;
};

const CategoryItem = React.memo(
  ({ category, onEdit, onDelete, styles, theme }: CategoryItemProps) => {
    const handleDelete = () => {
      Alert.alert(
        "Delete Category",
        `Are you sure you want to delete "${category.name}"?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => onDelete(category.id),
          },
        ],
      );
    };

    return (
      <View style={styles.categoryItem}>
        <View
          style={[styles.categoryIcon, { backgroundColor: category.color }]}
        >
          <ThemedText type="titleSmall">{category.icon}</ThemedText>
        </View>

        <View style={styles.categoryInfo}>
          <ThemedText type="bodySmallSemibold">{category.name}</ThemedText>
          <ThemedText type="labelSmallRegular" colorVariant="textMuted">
            {category.transactionCount} transactions
          </ThemedText>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.iconButton]}
            onPress={() => onEdit(category)}
            hitSlop={4}
          >
            <Feather
              name="edit-3"
              size={theme.iconSizes.sm}
              color={theme.colors.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton]}
            onPress={handleDelete}
            hitSlop={4}
          >
            <Feather
              name="trash-2"
              size={theme.iconSizes.sm}
              color={theme.colors.danger}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

CategoryItem.displayName = "CategoryItem";

const CustomCategoriesCard = React.memo(
  ({ categories, onAdd, onEdit, onDelete }: CustomCategoriesCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);
    const modalRef = useRef<ModalAddCategoryRef>(null);

    const handleEdit = (category: CustomCategory) => {
      // Pass existing category to modal for pre-fill
      modalRef.current?.show(category);
    };

    return (
      <>
        <View style={styles.container}>
          <View style={theme.flex.rowCenterBetween}>
            <View style={styles.sectionHeader}>
              <Feather
                name="tag"
                size={theme.iconSizes.md}
                color={theme.colors.icon}
              />
              <ThemedText type="bodyMediumSemibold">
                Custom Categories
              </ThemedText>
            </View>
            <TouchableOpacity
              style={[styles.addButton]}
              onPress={() => modalRef.current?.show()}
              hitSlop={4}
            >
              <Feather
                name="plus"
                size={theme.iconSizes.md}
                color={theme.colors.white}
              />
            </TouchableOpacity>
          </View>

          {categories.length > 0 ? (
            <View style={styles.categoriesList}>
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  onEdit={handleEdit}
                  onDelete={onDelete}
                  styles={styles}
                  theme={theme}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Feather name="tag" size={32} color={theme.colors.textMuted} />
              <ThemedText type="bodySmall" colorVariant="textMuted">
                No custom categories yet
              </ThemedText>
            </View>
          )}
        </View>

        <ModalAddCategory ref={modalRef} onSave={onAdd} />
      </>
    );
  },
);

CustomCategoriesCard.displayName = "CustomCategoriesCard";

export default CustomCategoriesCard;
