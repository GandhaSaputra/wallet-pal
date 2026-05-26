import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { TouchableOpacity, View } from "react-native";
import { createStyles } from "./CustomCategoriesCard.styles";
import {
  CustomCategoriesCardProps,
  CustomCategory,
} from "./CustomCategoriesCard.types";
import ModalAddCategory, { ModalAddCategoryRef } from "./ModalAddCategory";

type DeleteCategoryModalRef = {
  show: (category: CustomCategory) => void;
  hide: () => void;
};

type DeleteCategoryModalProps = {
  onConfirm: (id: string) => void;
  styles: ReturnType<typeof createStyles>;
  theme: ReturnType<typeof useTheme>;
};

type CategoryItemProps = {
  category: CustomCategory;
  onEdit: (category: CustomCategory) => void;
  onDeletePress: (category: CustomCategory) => void;
  styles: ReturnType<typeof createStyles>;
  theme: ReturnType<typeof useTheme>;
};

const CategoryItem = React.memo(
  ({ category, onEdit, onDeletePress, styles, theme }: CategoryItemProps) => {
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
            onPress={() => onDeletePress(category)}
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

const DeleteCategoryModal = React.memo(
  React.forwardRef<DeleteCategoryModalRef, DeleteCategoryModalProps>(
    ({ onConfirm, styles, theme }, ref) => {
      const bottomSheetModalRef = useRef<BottomSheetModal>(null);
      const [category, setCategory] = useState<CustomCategory | null>(null);

      const showModal = useCallback((selectedCategory: CustomCategory) => {
        setCategory(selectedCategory);
        bottomSheetModalRef.current?.present();
      }, []);

      const hideModal = useCallback(() => {
        bottomSheetModalRef.current?.close();
      }, []);

      useImperativeHandle(ref, () => ({ show: showModal, hide: hideModal }), [
        showModal,
        hideModal,
      ]);

      const renderBackdrop = useCallback(
        (backdropProps: any) => (
          <BottomSheetBackdrop
            opacity={0.7}
            {...backdropProps}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        ),
        [],
      );

      const handleConfirm = () => {
        if (!category) return;

        onConfirm(category.id);
        hideModal();
      };

      return (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={["36%"]}
          backdropComponent={renderBackdrop}
          enableDynamicSizing
          handleIndicatorStyle={styles.indicatorStyle}
          handleStyle={styles.containerIndicatorStyle}
        >
          <BottomSheetView style={styles.deleteContentContainer}>
            <View style={styles.deleteIconWrapper}>
              <Feather
                name="trash-2"
                size={theme.iconSizes.default}
                color={theme.colors.danger}
              />
            </View>

            <View style={styles.deleteCopy}>
              <ThemedText type="titleSmall" textAlign="center">
                Delete Category
              </ThemedText>
              <ThemedText
                type="bodySmall"
                colorVariant="textSecondary"
                textAlign="center"
              >
                {category
                  ? `Delete "${category.name}" from your custom categories?`
                  : "Delete this category from your custom categories?"}
              </ThemedText>
            </View>

            <View style={styles.deleteActions}>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={hideModal}
                style={[styles.deleteActionButton, styles.cancelDeleteButton]}
              >
                <ThemedText type="bodyMediumSemibold">Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={handleConfirm}
                style={[styles.deleteActionButton, styles.confirmDeleteButton]}
              >
                <ThemedText type="bodyMediumSemibold" colorVariant="white">
                  Delete
                </ThemedText>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      );
    },
  ),
);

DeleteCategoryModal.displayName = "DeleteCategoryModal";

const CustomCategoriesCard = React.memo(
  ({ categories, onAdd, onEdit, onDelete }: CustomCategoriesCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);
    const modalRef = useRef<ModalAddCategoryRef>(null);
    const deleteModalRef = useRef<DeleteCategoryModalRef>(null);

    const handleEdit = (category: CustomCategory) => {
      modalRef.current?.show(category);
    };

    const handleDeletePress = (category: CustomCategory) => {
      deleteModalRef.current?.show(category);
    };

    const handleSave = (
      data: Omit<CustomCategory, "id" | "transactionCount">,
      currentCategory?: CustomCategory,
    ) => {
      if (currentCategory) {
        onEdit({ ...currentCategory, ...data });
        return;
      }

      onAdd(data);
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
                  onDeletePress={handleDeletePress}
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

        <ModalAddCategory ref={modalRef} onSave={handleSave} />
        <DeleteCategoryModal
          ref={deleteModalRef}
          onConfirm={onDelete}
          styles={styles}
          theme={theme}
        />
      </>
    );
  },
);

CustomCategoriesCard.displayName = "CustomCategoriesCard";

export default CustomCategoriesCard;
