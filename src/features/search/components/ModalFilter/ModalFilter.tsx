import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Pressable, TextInput, View } from "react-native";
import { createStyles } from "./ModalFilter.styles";
import {
  CATEGORY_OPTIONS,
  DATE_RANGE_OPTIONS,
  DEFAULT_FILTERS,
  FilterDateRange,
  FilterPaymentMethod,
  ModalFilterProps,
  ModalFilterRef,
  PAYMENT_METHOD_OPTIONS,
  SearchFilters,
} from "./ModalFilter.types";

// Section title component — reused across filter sections
const SectionTitle = ({ title }: { title: string }) => (
  <ThemedText type="bodySmallSemibold" colorVariant="textSecondary">
    {title}
  </ThemedText>
);

// Generic chip component — reused for category, date, payment method
type FilterChipProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  styles: ReturnType<typeof createStyles>;
};

const FilterChip = React.memo(
  ({ label, isSelected, onPress, styles }: FilterChipProps) => (
    <Pressable
      style={({ pressed }) => [
        styles.chip,
        isSelected && styles.chipSelected,
        pressed && { opacity: 0.7 },
      ]}
      onPress={onPress}
    >
      <ThemedText
        type="labelSmallRegular"
        style={
          isSelected
            ? { color: (styles as any).chipSelected.borderColor }
            : undefined
        }
        colorVariant={isSelected ? undefined : "textSecondary"}
      >
        {label}
      </ThemedText>
    </Pressable>
  ),
);

FilterChip.displayName = "FilterChip";

const ModalFilter = React.memo(
  React.forwardRef<ModalFilterRef, ModalFilterProps>(
    ({ filters, onApply }, ref) => {
      const bottomSheetModalRef = useRef<BottomSheetModal>(null);
      const theme = useTheme();
      const styles = useMemo(() => createStyles({ theme }), [theme]);

      // Draft state — only committed to parent on Apply
      const [draft, setDraft] = useState<SearchFilters>(filters);

      const showModal = useCallback(() => {
        // Sync draft with current applied filters on open
        setDraft(filters);
        bottomSheetModalRef.current?.present();
      }, [filters]);

      const hideModal = useCallback(() => {
        bottomSheetModalRef.current?.close();
      }, []);

      useImperativeHandle(ref, () => ({ show: showModal, hide: hideModal }), [
        showModal,
        hideModal,
      ]);

      const handleReset = () => setDraft(DEFAULT_FILTERS);

      const handleApply = () => {
        onApply(draft);
        hideModal();
      };

      // Category toggle
      const toggleCategory = (id: string) => {
        setDraft((prev) => ({
          ...prev,
          categories: prev.categories.includes(id)
            ? prev.categories.filter((c) => c !== id)
            : [...prev.categories, id],
        }));
      };

      // Payment method toggle
      const togglePaymentMethod = (id: FilterPaymentMethod) => {
        setDraft((prev) => ({
          ...prev,
          paymentMethods: prev.paymentMethods.includes(id)
            ? prev.paymentMethods.filter((m) => m !== id)
            : [...prev.paymentMethods, id],
        }));
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

      const activeFilterCount = useMemo(() => {
        let count = 0;
        if (draft.categories.length > 0) count += draft.categories.length;
        if (draft.dateRange !== "all") count++;
        if (draft.minAmount) count++;
        if (draft.maxAmount) count++;
        if (draft.paymentMethods.length > 0)
          count += draft.paymentMethods.length;
        return count;
      }, [draft]);

      return (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={["75%", "90%"]}
          backdropComponent={renderBackdrop}
          enableContentPanningGesture={false}
          handleIndicatorStyle={styles.indicatorStyle}
          handleStyle={styles.containerIndicatorStyle}
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={handleReset} hitSlop={8}>
              <ThemedText type="bodyMediumSemibold" style={styles.resetText}>
                Reset
              </ThemedText>
            </Pressable>
            <ThemedText type="titleSmall">Filter</ThemedText>
            <ThemedText type="bodyMedium" colorVariant="textMuted">
              {activeFilterCount > 0 ? `${activeFilterCount} active` : ""}
            </ThemedText>
          </View>

          <BottomSheetScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Category */}
            <View style={styles.section}>
              <SectionTitle title="Category" />
              <View style={styles.chipsRow}>
                {CATEGORY_OPTIONS.map((option) => (
                  <FilterChip
                    key={option.id}
                    label={option.label}
                    isSelected={draft.categories.includes(option.id)}
                    onPress={() => toggleCategory(option.id)}
                    styles={styles}
                  />
                ))}
              </View>
            </View>

            <View style={styles.divider} />

            {/* Date Range */}
            <View style={styles.section}>
              <SectionTitle title="Date Range" />
              <View style={styles.chipsRow}>
                {DATE_RANGE_OPTIONS.map((option) => (
                  <FilterChip
                    key={option.id}
                    label={option.label}
                    isSelected={draft.dateRange === option.id}
                    onPress={() =>
                      setDraft((prev) => ({
                        ...prev,
                        dateRange: option.id as FilterDateRange,
                      }))
                    }
                    styles={styles}
                  />
                ))}
              </View>
            </View>

            <View style={styles.divider} />

            {/* Amount Range */}
            <View style={styles.section}>
              <SectionTitle title="Amount Range" />
              <View style={styles.amountRow}>
                {/* Min */}
                <View style={styles.amountInputWrapper}>
                  <ThemedText type="labelSmallRegular" colorVariant="textMuted">
                    Min
                  </ThemedText>
                  <TextInput
                    style={styles.amountInput}
                    value={draft.minAmount}
                    onChangeText={(val) => {
                      const sanitized = val
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*)\./g, "$1");
                      setDraft((prev) => ({ ...prev, minAmount: sanitized }));
                    }}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={theme.colors.textMuted}
                  />
                </View>

                <View style={styles.amountSeparator} />

                {/* Max */}
                <View style={styles.amountInputWrapper}>
                  <ThemedText type="labelSmallRegular" colorVariant="textMuted">
                    Max
                  </ThemedText>
                  <TextInput
                    style={styles.amountInput}
                    value={draft.maxAmount}
                    onChangeText={(val) => {
                      const sanitized = val
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*)\./g, "$1");
                      setDraft((prev) => ({ ...prev, maxAmount: sanitized }));
                    }}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={theme.colors.textMuted}
                  />
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Payment Method */}
            <View style={styles.section}>
              <SectionTitle title="Payment Method" />
              <View style={styles.chipsRow}>
                {PAYMENT_METHOD_OPTIONS.map((option) => (
                  <FilterChip
                    key={option.id}
                    label={option.label}
                    isSelected={draft.paymentMethods.includes(option.id)}
                    onPress={() =>
                      togglePaymentMethod(option.id as FilterPaymentMethod)
                    }
                    styles={styles}
                  />
                ))}
              </View>
            </View>
          </BottomSheetScrollView>

          {/* Apply button — outside ScrollView agar always visible */}
          <Pressable
            style={({ pressed }) => [
              styles.applyButton,
              pressed && { opacity: 0.85 },
            ]}
            onPress={handleApply}
          >
            <ThemedText
              type="bodyMediumSemibold"
              style={styles.applyButtonText}
            >
              {activeFilterCount > 0
                ? `Apply Filters (${activeFilterCount})`
                : "Apply"}
            </ThemedText>
          </Pressable>
        </BottomSheetModal>
      );
    },
  ),
);

ModalFilter.displayName = "ModalFilter";

export default ModalFilter;
