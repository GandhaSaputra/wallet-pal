import { TransactionCategoryId } from "@/src/constants/categories";
import { SpendingCategory } from "@/src/features/analytics/components/SpendingByCategoryCard";
import { PaymentMethod } from "@/src/features/transaction/components/ModalSelectPayment";
import { TransactionItem } from "@/src/features/transaction/components/RecentTransactionsCard";

export type Transaction = TransactionItem & {
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTransactionInput = {
  amount: number;
  categoryId: TransactionCategoryId;
  date: Date;
  description?: string;
  notes?: string;
  paymentMethod?: PaymentMethod | null;
};

export type UpdateTransactionInput = Partial<
  Omit<Transaction, "id" | "createdAt" | "updatedAt">
>;

export type TransactionCategoryMeta = {
  category: SpendingCategory;
  categoryLabel: string;
  icon: string;
};

export const TRANSACTION_CATEGORY_META: Record<
  TransactionCategoryId,
  TransactionCategoryMeta
> = {
  foodDining: {
    category: "food",
    categoryLabel: "Food",
    icon: "🍽️",
  },
  transportation: {
    category: "transport",
    categoryLabel: "Transport",
    icon: "🚗",
  },
  billsUtilities: {
    category: "bills",
    categoryLabel: "Bills",
    icon: "⚡",
  },
  shopping: {
    category: "shopping",
    categoryLabel: "Shopping",
    icon: "🛍️",
  },
  healthcare: {
    category: "others",
    categoryLabel: "Healthcare",
    icon: "🏥",
  },
  entertainment: {
    category: "others",
    categoryLabel: "Entertainment",
    icon: "🎬",
  },
};

export const DEFAULT_PAYMENT_METHOD = "Unspecified";

export function createTransactionFromInput(
  input: CreateTransactionInput,
): Omit<Transaction, "id" | "createdAt" | "updatedAt"> {
  const meta = TRANSACTION_CATEGORY_META[input.categoryId];
  const merchantName = input.description?.trim() || meta.categoryLabel;

  return {
    amount: -Math.abs(input.amount),
    category: meta.category,
    categoryLabel: meta.categoryLabel,
    date: input.date.toISOString(),
    icon: meta.icon,
    merchantName,
    notes: input.notes?.trim() || undefined,
    paymentMethod: input.paymentMethod?.label ?? DEFAULT_PAYMENT_METHOD,
  };
}

export function formatRecentTransactionDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (parsedDate.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (parsedDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

export function toRecentTransactionItem(transaction: Transaction): TransactionItem {
  return {
    ...transaction,
    date: formatRecentTransactionDate(transaction.date),
  };
}
