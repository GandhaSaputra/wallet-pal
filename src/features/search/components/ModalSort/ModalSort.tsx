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
} from "react";
import { Pressable, View } from "react-native";
import { createStyles } from "./ModalSort.styles";
import { ModalSortProps, ModalSortRef, SORT_OPTIONS } from "./ModalSort.types";

const ModalSort = React.memo(
  React.forwardRef<ModalSortRef, ModalSortProps>(
    ({ selectedId, onSelect }, ref) => {
      const bottomSheetModalRef = useRef<BottomSheetModal>(null);
      const theme = useTheme();
      const styles = useMemo(() => createStyles({ theme }), [theme]);

      const showModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
      }, []);

      const hideModal = useCallback(() => {
        bottomSheetModalRef.current?.close();
      }, []);

      useImperativeHandle(ref, () => ({ show: showModal, hide: hideModal }), [
        showModal,
        hideModal,
      ]);

      const handleSelect = (id: string) => {
        onSelect(id);
        hideModal();
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

      return (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          backdropComponent={renderBackdrop}
          enableContentPanningGesture={false}
          handleIndicatorStyle={styles.indicatorStyle}
          handleStyle={styles.containerIndicatorStyle}
        >
          <BottomSheetView style={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
              <ThemedText type="titleSmall">Sort By</ThemedText>
            </View>

            {/* Options */}
            {SORT_OPTIONS.map((option) => {
              const isSelected = option.id === selectedId;
              return (
                <Pressable
                  key={option.id}
                  style={({ pressed }) => [
                    styles.optionRow,
                    isSelected && styles.optionRowSelected,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => handleSelect(option.id)}
                >
                  <ThemedText
                    type="bodyMedium"
                    colorVariant={isSelected ? "primary" : "text"}
                  >
                    {option.label}
                  </ThemedText>

                  {/* Radio button */}
                  <View
                    style={[
                      styles.radioOuter,
                      isSelected && styles.radioOuterSelected,
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </Pressable>
              );
            })}
          </BottomSheetView>
        </BottomSheetModal>
      );
    },
  ),
);

ModalSort.displayName = "ModalSort";

export default ModalSort;
