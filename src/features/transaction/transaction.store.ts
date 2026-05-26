import { create } from "zustand";
import { transactionRepository } from "./transaction.repository";
import {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from "./transaction.model";
import { getInitialTransactions } from "./transaction.service";

type AsyncStatus = "idle" | "loading" | "success" | "error";

type TransactionStore = {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  status: AsyncStatus;
  mutationStatus: AsyncStatus;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  createTransaction: (input: CreateTransactionInput) => Promise<Transaction | null>;
  updateTransaction: (
    id: string,
    input: UpdateTransactionInput,
  ) => Promise<Transaction | null>;
  deleteTransaction: (id: string) => Promise<boolean>;
  selectTransaction: (id: string | null) => void;
  resetError: () => void;
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: getInitialTransactions(),
  selectedTransaction: null,
  status: "success",
  mutationStatus: "idle",
  error: null,
  fetchTransactions: async () => {
    set({ status: "loading", error: null });

    try {
      const transactions = await transactionRepository.fetchAll();
      set({ transactions, status: "success" });
    } catch (error) {
      set({ error: getErrorMessage(error), status: "error" });
    }
  },
  createTransaction: async (input) => {
    set({ mutationStatus: "loading", error: null });

    try {
      const transaction = await transactionRepository.create(input);
      set((state) => ({
        transactions: [transaction, ...state.transactions],
        mutationStatus: "success",
      }));

      return transaction;
    } catch (error) {
      set({ error: getErrorMessage(error), mutationStatus: "error" });
      return null;
    }
  },
  updateTransaction: async (id, input) => {
    set({ mutationStatus: "loading", error: null });

    try {
      const updatedTransaction = await transactionRepository.update(id, input);
      set((state) => ({
        transactions: state.transactions.map((transaction) =>
          transaction.id === id ? updatedTransaction : transaction,
        ),
        selectedTransaction:
          state.selectedTransaction?.id === id
            ? updatedTransaction
            : state.selectedTransaction,
        mutationStatus: "success",
      }));

      return updatedTransaction;
    } catch (error) {
      set({ error: getErrorMessage(error), mutationStatus: "error" });
      return null;
    }
  },
  deleteTransaction: async (id) => {
    set({ mutationStatus: "loading", error: null });

    try {
      await transactionRepository.delete(id);
      set((state) => ({
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== id,
        ),
        selectedTransaction:
          state.selectedTransaction?.id === id ? null : state.selectedTransaction,
        mutationStatus: "success",
      }));

      return true;
    } catch (error) {
      set({ error: getErrorMessage(error), mutationStatus: "error" });
      return false;
    }
  },
  selectTransaction: (id) => {
    set({
      selectedTransaction:
        id === null
          ? null
          : get().transactions.find((transaction) => transaction.id === id) ??
            null,
    });
  },
  resetError: () => set({ error: null }),
}));
