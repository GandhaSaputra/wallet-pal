import {
  TRANSACTION_CATEGORIES,
  TransactionCategoryId,
} from "@/src/constants/categories";
import { Theme } from "@/src/constants/theme";
import ScanReceiptCard from "@/src/features/ai/components/ScanReceiptCard";
import AddExpenseButton from "@/src/features/transaction/components/AddExpenseButton";
import CategoryPicker from "@/src/features/transaction/components/CategoryPicker";
import DescriptionInputCard from "@/src/features/transaction/components/DescriptionInputCard";
import NotesInputCard from "@/src/features/transaction/components/NotesInputCard";
import TransactionMetaFields from "@/src/features/transaction/components/TransactionMetaFields";
import AmountInput from "@/src/shared/components/amount-input/AmountInput";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { useMemo, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(
    () => createStyles({ theme, insets }),
    [theme, insets],
  );

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<TransactionCategoryId>("foodDining");

  const handleScanReceipt = () => {
    // TODO: integrate camera / AI OCR
  };

  const handleApplySuggestion = () => {
    setSelectedCategoryId("foodDining");
  };

  const handleSelectDate = () => {
    // TODO: open date picker
  };

  const handleSelectPayment = () => {
    // TODO: open payment method picker
  };

  const handleAddExpense = () => {
    // TODO: validate and persist transaction
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ScanReceiptCard onScan={handleScanReceipt} />
        <Spacer height={theme.spacing.xl} />
        <AmountInput value={amount} onChangeText={setAmount} required />
        <Spacer height={theme.spacing.xl} />
        <DescriptionInputCard
          value={description}
          onChangeText={setDescription}
          suggestion="This looks like a Food & Dining expense"
          onApplySuggestion={handleApplySuggestion}
          required
        />
        <Spacer height={theme.spacing.xl} />
        <CategoryPicker
          categories={TRANSACTION_CATEGORIES}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          required
        />
        <Spacer height={theme.spacing.xl} />
        <TransactionMetaFields
          dateLabel="Jan 30, 2025"
          paymentLabel="Credit Card"
          onPressDate={handleSelectDate}
          onPressPayment={handleSelectPayment}
        />
        <Spacer height={theme.spacing.xl} />
        <NotesInputCard value={notes} onChangeText={setNotes} />
        <Spacer height={theme.spacing.xl} />
        <AddExpenseButton onPress={handleAddExpense} />
        <Spacer height={theme.spacing.xl} />
      </KeyboardAwareScrollView>
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
