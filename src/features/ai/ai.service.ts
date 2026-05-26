import { NaturalLanguageSearchResult, ReceiptScanResult } from "./ai.model";

export async function scanReceipt(): Promise<ReceiptScanResult | null> {
  return null;
}

export async function requestAIInsights() {
  return [];
}

export async function parseNaturalLanguageSearch(
  query: string,
): Promise<NaturalLanguageSearchResult> {
  return {
    query: query.trim(),
  };
}
