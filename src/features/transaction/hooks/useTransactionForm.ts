import { TransactionCategoryId } from "@/src/constants/categories";
import { PaymentMethod } from "@/src/features/transaction/components/ModalSelectPayment";
import { useMemo, useState } from "react";
import { useTransactionStore } from "../transaction.store";

export function useTransactionForm() {
  const createTransaction = useTransactionStore(
    (state) => state.createTransaction,
  );
  const mutationStatus = useTransactionStore((state) => state.mutationStatus);
  const error = useTransactionStore((state) => state.error);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<TransactionCategoryId | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null,
  );

  const parsedAmount = useMemo(() => Number(amount), [amount]);
  const isAddExpenseDisabled = useMemo(
    () => !amount.trim() || Number.isNaN(parsedAmount) || !selectedCategoryId,
    [amount, parsedAmount, selectedCategoryId],
  );

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setNotes("");
    setSelectedCategoryId(null);
    setSelectedDate(new Date());
    setSelectedPayment(null);
  };

  const applyCategorySuggestion = (categoryId: TransactionCategoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const submitTransaction = async () => {
    if (isAddExpenseDisabled || !selectedCategoryId) {
      return false;
    }

    const transaction = await createTransaction({
      amount: parsedAmount,
      categoryId: selectedCategoryId,
      date: selectedDate,
      description,
      notes,
      paymentMethod: selectedPayment,
    });

    if (transaction) {
      resetForm();
      return true;
    }

    return false;
  };

  return {
    amount,
    applyCategorySuggestion,
    description,
    error,
    isAddExpenseDisabled,
    isSubmitting: mutationStatus === "loading",
    notes,
    resetForm,
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
  };
}
