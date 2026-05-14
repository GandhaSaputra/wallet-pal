import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { DatePicker } from "@quidone/react-native-wheel-picker";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { TouchableOpacity, View } from "react-native";
import { createStyles } from "./ModalSelectDate.styles";
import { ModalSelectDateProps } from "./ModalSelectDate.types";

interface ModalRef {
  show: () => void;
  hide: () => void;
}

const toPickerDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const fromPickerDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const ModalSelectDate = React.memo(
  React.forwardRef<ModalRef, ModalSelectDateProps>(
    ({ selectedDate, onSelect }: ModalSelectDateProps, ref) => {
      const bottomSheetModalRef = useRef<BottomSheetModal>(null);

      const theme = useTheme();
      const styles = useMemo(() => createStyles({ theme }), [theme]);
      const [draftDate, setDraftDate] = useState(() =>
        toPickerDate(selectedDate),
      );

      useEffect(() => {
        setDraftDate(toPickerDate(selectedDate));
      }, [selectedDate]);

      const handleSelect = () => {
        onSelect(fromPickerDate(draftDate));
        hideModal();
      };

      const showModal = useCallback(() => {
        bottomSheetModalRef?.current?.present();
      }, []);

      const hideModal = useCallback(() => {
        bottomSheetModalRef?.current?.close();
      }, []);

      useImperativeHandle(
        ref,
        () => ({
          show: showModal,
          hide: hideModal,
        }),
        [showModal, hideModal],
      );

      const renderBackdrop = (backdropProps: any) => {
        return (
          <BottomSheetBackdrop
            {...backdropProps}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        );
      };

      return (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}
          enableDynamicSizing={true}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.header}>
              <ThemedText type="titleSmall">Select Date</ThemedText>
            </View>
            <View style={styles.pickerContainer}>
              <DatePicker
                date={draftDate}
                onDateChanged={({ date }) => setDraftDate(date)}
                itemHeight={44}
                visibleItemCount={5}
                enableScrollByTapOnItem
                itemTextStyle={styles.pickerText}
                overlayItemStyle={styles.pickerOverlay}
              />
            </View>

            <View style={styles.selectButtonContainer}>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={handleSelect}
                style={styles.selectButton}
              >
                <ThemedText
                  type="bodyMediumSemibold"
                  style={styles.selectButtonText}
                >
                  Select
                </ThemedText>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      );
    },
  ),
);

ModalSelectDate.displayName = "ModalSelectDate";

export default ModalSelectDate;
