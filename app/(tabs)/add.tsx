import { TRANSACTION_CATEGORIES } from "@/src/constants/categories";
import { Theme } from "@/src/constants/theme";
import ScanReceiptCard from "@/src/features/ai/components/ScanReceiptCard";
import { useReceiptScanner } from "@/src/features/ai/hooks/useReceiptScanner";
import AddExpenseButton from "@/src/features/transaction/components/AddExpenseButton";
import CategoryPicker from "@/src/features/transaction/components/CategoryPicker";
import DescriptionInputCard from "@/src/features/transaction/components/DescriptionInputCard";
import ModalSelectDate from "@/src/features/transaction/components/ModalSelectDate";
import ModalSelectPayment from "@/src/features/transaction/components/ModalSelectPayment";
import NotesInputCard from "@/src/features/transaction/components/NotesInputCard";
import TransactionMetaFields from "@/src/features/transaction/components/TransactionMetaFields";
import { useTransactionForm } from "@/src/features/transaction/hooks/useTransactionForm";
import AmountInput from "@/src/shared/components/amount-input/AmountInput";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { useMemo, useRef } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

type ModalRef = {
  hide: () => void;
  show: () => void;
};

const formatDateLabel = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);

export default function AddScreen() {
  const paymentSheetRef = useRef<ModalRef>(null);
  const dateSheetRef = useRef<ModalRef>(null);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(
    () => createStyles({ theme, insets }),
    [theme, insets],
  );
  const { scan } = useReceiptScanner();
  const {
    amount,
    applyCategorySuggestion,
    description,
    isAddExpenseDisabled,
    notes,
    selectedCategoryId,
    selectedDate,
    selectedPayment,
    setAmount,
    setDescription,
    setNotes,
    setSelectedCategoryId,
    setSelectedDate,
    setSelectedPayment,
    submitTransaction,
  } = useTransactionForm();

  const handleScanReceipt = async () => {
    const result = await scan();

    if (!result) {
      return;
    }

    if (result.amount) setAmount(result.amount);
    if (result.description) setDescription(result.description);
    if (result.notes) setNotes(result.notes);
    if (result.categoryId) setSelectedCategoryId(result.categoryId);
  };

  const handleApplySuggestion = () => {
    applyCategorySuggestion("foodDining");
  };

  const handleSelectDate = () => {
    dateSheetRef?.current?.show();
  };

  const handleSelectPayment = () => {
    paymentSheetRef?.current?.show();
  };

  const handleAddExpense = async () => {
    const isSuccessful = await submitTransaction();

    if (isSuccessful) {
      Alert.alert("Expense Added", "Your transaction has been saved.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText type="titleMedium">Add Transaction</ThemedText>
        </View>
        <Spacer height={theme.spacing.lg} />
        <ScanReceiptCard onScan={handleScanReceipt} />
        <Spacer height={theme.spacing.lg} />
        <AmountInput value={amount} onChangeText={setAmount} required />
        <Spacer height={theme.spacing.lg} />
        <DescriptionInputCard
          value={description}
          onChangeText={setDescription}
          suggestion="This looks like a Food & Dining expense"
          onApplySuggestion={handleApplySuggestion}
          required={false}
        />
        <Spacer height={theme.spacing.lg} />
        <CategoryPicker
          categories={TRANSACTION_CATEGORIES}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          required
        />
        <Spacer height={theme.spacing.lg} />
        <TransactionMetaFields
          dateLabel={formatDateLabel(selectedDate)}
          paymentIcon={selectedPayment?.icon ?? null}
          paymentLabel={selectedPayment?.label ?? null}
          onPressDate={handleSelectDate}
          onPressPayment={handleSelectPayment}
        />
        <Spacer height={theme.spacing.lg} />
        <NotesInputCard value={notes} onChangeText={setNotes} />
        <Spacer height={theme.spacing.lg} />
        <AddExpenseButton
          onPress={handleAddExpense}
          disabled={isAddExpenseDisabled}
        />
        <Spacer height={Platform?.OS === "android" ? 80 : theme.spacing.lg} />
      </KeyboardAwareScrollView>
      <ModalSelectDate
        ref={dateSheetRef}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />
      <ModalSelectPayment
        ref={paymentSheetRef}
        selectedPaymentId={selectedPayment?.id ?? null}
        onSelect={setSelectedPayment}
      />
    </ThemedView>
  );
}

const createStyles = ({
  theme,
  insets,
}: {
  theme: Theme;
  insets: EdgeInsets;
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      flex: 1,
    },
    header: {
      paddingTop: Platform.select({
        android: insets.top + theme.spacing.xl,
        ios: insets.top + theme.spacing.sm,
        web: theme.spacing.default,
      }),
    },
    contentContainer: {
      paddingHorizontal: theme.spacing.default,
    },
  });
