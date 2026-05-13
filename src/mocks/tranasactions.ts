import { TransactionItem } from "@/src/features/transaction/components/RecentTransactionsCard";

export const MOCK_TRANSACTIONS: TransactionItem[] = [
  {
    id: "1",
    icon: "☕",
    merchantName: "Starbucks Coffee",
    category: "food",
    categoryLabel: "Food",
    date: "Today",
    amount: -8.75,
  },
  {
    id: "2",
    icon: "🚗",
    merchantName: "Uber Ride",
    category: "transport",
    categoryLabel: "Transport",
    date: "Today",
    amount: -22.5,
  },
  {
    id: "3",
    icon: "🛒",
    merchantName: "Whole Foods",
    category: "food",
    categoryLabel: "Food",
    date: "Yesterday",
    amount: -156.8,
  },
  {
    id: "4",
    icon: "📱",
    merchantName: "Apple Music",
    category: "bills",
    categoryLabel: "Bills",
    date: "Yesterday",
    amount: -9.99,
  },
];
