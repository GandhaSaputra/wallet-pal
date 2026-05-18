import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
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
import { TextInput, TouchableOpacity, View } from "react-native";
import { createStyles } from "./ModalAddCategory.styles";
import {
  CATEGORY_COLOR_OPTIONS,
  CATEGORY_ICON_OPTIONS,
  CustomCategory,
  ModalAddCategoryProps,
  ModalAddCategoryRef,
} from "./ModalAddCategory.types";

const DEFAULT_COLOR = CATEGORY_COLOR_OPTIONS[0];
const DEFAULT_ICON = CATEGORY_ICON_OPTIONS[0];

const ModalAddCategory = React.memo(
  React.forwardRef<ModalAddCategoryRef, ModalAddCategoryProps>(
    ({ onSave }, ref) => {
      const bottomSheetModalRef = useRef<BottomSheetModal>(null);
      const theme = useTheme();
      const styles = useMemo(() => createStyles({ theme }), [theme]);

      const [name, setName] = useState("");
      const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR);
      const [selectedIcon, setSelectedIcon] = useState(DEFAULT_ICON);
      const [isEditMode, setIsEditMode] = useState(false);

      const resetDraft = () => {
        setName("");
        setSelectedColor(DEFAULT_COLOR);
        setSelectedIcon(DEFAULT_ICON);
        setIsEditMode(false);
      };

      const showModal = useCallback((category?: CustomCategory) => {
        if (category) {
          // Edit mode — pre-fill with existing data
          setName(category.name);
          setSelectedColor(category.color);
          setSelectedIcon(category.icon);
          setIsEditMode(true);
        } else {
          resetDraft();
        }
        bottomSheetModalRef.current?.present();
      }, []);

      const hideModal = useCallback(() => {
        bottomSheetModalRef.current?.close();
      }, []);

      useImperativeHandle(ref, () => ({ show: showModal, hide: hideModal }), [
        showModal,
        hideModal,
      ]);

      const handleSave = () => {
        if (!name.trim()) return;
        onSave({ name: name.trim(), color: selectedColor, icon: selectedIcon });
        hideModal();
        resetDraft();
      };

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

      const canSave = name.trim().length > 0;

      return (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={["80%"]}
          backdropComponent={renderBackdrop}
          enableContentPanningGesture={false}
          handleIndicatorStyle={styles.indicatorStyle}
          handleStyle={styles.containerIndicatorStyle}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.header}>
              <ThemedText type="titleSmall">
                {isEditMode ? "Edit Category" : "Add Category"}
              </ThemedText>
            </View>

            <View style={styles.preview}>
              <View
                style={[styles.previewIcon, { backgroundColor: selectedColor }]}
              >
                <ThemedText type="titleMedium">{selectedIcon}</ThemedText>
              </View>
              <ThemedText type="labelSmallRegular" colorVariant="textMuted">
                {name.trim() || "Category Name"}
              </ThemedText>
            </View>

            <View style={styles.section}>
              <ThemedText type="labelSmallRegular" colorVariant="textSecondary">
                Category Name
              </ThemedText>
              <TextInput
                style={styles.nameInput}
                value={name}
                onChangeText={setName}
                placeholder="e.g. Coffee & Drinks"
                placeholderTextColor={theme.colors.textMuted}
                autoCapitalize="words"
                returnKeyType="done"
              />
            </View>

            <View style={styles.section}>
              <ThemedText type="labelSmallRegular" colorVariant="textSecondary">
                Icon
              </ThemedText>
              <View style={styles.optionsGrid}>
                {CATEGORY_ICON_OPTIONS.map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconOption,
                      selectedIcon === icon && styles.iconOptionSelected,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => setSelectedIcon(icon)}
                  >
                    <ThemedText type="bodyMedium">{icon}</ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText type="labelSmallRegular" colorVariant="textSecondary">
                Color
              </ThemedText>
              <View style={styles.optionsGrid}>
                {CATEGORY_COLOR_OPTIONS.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorDot,
                      { backgroundColor: color },
                      selectedColor === color && styles.colorDotSelected,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  />
                ))}
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={!canSave}
            >
              <ThemedText type="bodyMediumSemibold" colorVariant="white">
                {isEditMode ? "Save Changes" : "Add Category"}
              </ThemedText>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
      );
    },
  ),
);

ModalAddCategory.displayName = "ModalAddCategory";

export default ModalAddCategory;
