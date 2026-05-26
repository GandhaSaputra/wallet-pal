import { TransactionCategoryId } from "@/src/constants/categories";

export type ReceiptScanResult = {
  amount?: string;
  categoryId?: TransactionCategoryId;
  description?: string;
  notes?: string;
};

export type NaturalLanguageSearchResult = {
  query: string;
};

export type AIRequestStatus = "idle" | "loading" | "success" | "error";
