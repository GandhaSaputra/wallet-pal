import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useThemeController } from "@/src/shared/hooks/useThemeController";
import { Ionicons } from "@expo/vector-icons";
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
import { Text, TouchableOpacity, View } from "react-native";
import { PAYMENT_METHODS } from "./ModalSelectPayment.data";
import { createStyles } from "./ModalSelectPayment.styles";
import {
  ModalSelectPaymentProps,
  PaymentMethodId,
} from "./ModalSelectPayment.types";

interface ModalRef {
  show: () => void;
  hide: () => void;
}

const ModalSelectPayment = React.memo(
  React.forwardRef<ModalRef, ModalSelectPaymentProps>(
    ({ selectedPaymentId, onSelect }, ref) => {
      const { theme } = useThemeController();
      const styles = useMemo(() => createStyles({ theme }), [theme]);
      const bottomSheetModalRef = useRef<BottomSheetModal>(null);
      const [draftPaymentId, setDraftPaymentId] =
        useState<PaymentMethodId | null>(selectedPaymentId);

      const selectedPayment = PAYMENT_METHODS.find(
        (method) => method.id === draftPaymentId,
      );

      const handleSelect = () => {
        if (selectedPayment) {
          onSelect(selectedPayment);
        }
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
            opacity={0.7}
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
          handleIndicatorStyle={styles.indicatorStyle}
          handleStyle={styles.containerIndicatorStyle}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.header}>
              <ThemedText type="titleSmall">Select Payment Method</ThemedText>
            </View>

            <View style={styles.listContent}>
              {PAYMENT_METHODS.map((method) => {
                const isSelected = method?.id === draftPaymentId;

                return (
                  <TouchableOpacity
                    key={method.id}
                    activeOpacity={0.75}
                    onPress={() => setDraftPaymentId(method.id)}
                    style={[styles.item, isSelected && styles.selectedItem]}
                  >
                    <View
                      style={[
                        styles.iconBox,
                        isSelected && styles.selectedIconBox,
                      ]}
                    >
                      <Text style={styles.iconText}>{method.icon}</Text>
                    </View>

                    <View style={styles.itemBody}>
                      <ThemedText
                        type="bodyMediumSemibold"
                        style={styles.itemTitle}
                      >
                        {method.label}
                      </ThemedText>
                      <ThemedText
                        type="bodySmall"
                        style={styles.itemDescription}
                        numberOfLines={2}
                      >
                        {method.description}
                      </ThemedText>
                    </View>

                    {isSelected ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={theme.iconSizes.default}
                        color={theme.colors.primary}
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
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

ModalSelectPayment.displayName = "ModalSelectPayment";

export default ModalSelectPayment;
