import { MOCK_SEARCH_RESULTS } from "@/src/mocks/search";
import { MOCK_TRANSACTIONS } from "@/src/mocks/tranasactions";
import {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
  createTransactionFromInput,
} from "./transaction.model";

const now = new Date();

const normalizeDate = (date: string, daysAgo: number) => {
  if (date === "Today" || date === "Yesterday") {
    const resolvedDate = new Date(now);
    resolvedDate.setDate(now.getDate() - daysAgo);
    return resolvedDate.toISOString();
  }

  return new Date(date).toISOString();
};

const seededTransactions: Transaction[] = [
  ...MOCK_TRANSACTIONS.map((transaction, index) => ({
    ...transaction,
    id: `home-${transaction.id}`,
    date: normalizeDate(transaction.date, index < 2 ? 0 : 1),
    paymentMethod: transaction.paymentMethod ?? "Unspecified",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  })),
  ...MOCK_SEARCH_RESULTS.map((transaction) => ({
    ...transaction,
    id: `search-${transaction.id}`,
    date: normalizeDate(transaction.date, 0),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  })),
];

let transactions = seededTransactions;

const createId = () =>
  `tx-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const sortByNewest = (items: Transaction[]) =>
  [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

export async function fetchTransactions() {
  return sortByNewest(transactions);
}

export function getInitialTransactions() {
  return sortByNewest(transactions);
}

export async function createTransaction(input: CreateTransactionInput) {
  const timestamp = new Date().toISOString();
  const transaction: Transaction = {
    ...createTransactionFromInput(input),
    id: createId(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  transactions = sortByNewest([transaction, ...transactions]);

  return transaction;
}

export async function updateTransaction(
  id: string,
  input: UpdateTransactionInput,
) {
  const nextTransaction = transactions.find((transaction) => transaction.id === id);

  if (!nextTransaction) {
    throw new Error("Transaction not found");
  }

  const updatedTransaction: Transaction = {
    ...nextTransaction,
    ...input,
    updatedAt: new Date().toISOString(),
  };

  transactions = sortByNewest(
    transactions.map((transaction) =>
      transaction.id === id ? updatedTransaction : transaction,
    ),
  );

  return updatedTransaction;
}

export async function deleteTransaction(id: string) {
  const exists = transactions.some((transaction) => transaction.id === id);

  if (!exists) {
    throw new Error("Transaction not found");
  }

  transactions = transactions.filter((transaction) => transaction.id !== id);
}
