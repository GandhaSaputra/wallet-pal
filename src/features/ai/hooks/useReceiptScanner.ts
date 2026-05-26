import { useState } from "react";
import { AIRequestStatus, ReceiptScanResult } from "../ai.model";
import { scanReceipt } from "../ai.service";

export function useReceiptScanner() {
  const [status, setStatus] = useState<AIRequestStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReceiptScanResult | null>(null);

  const scan = async () => {
    setStatus("loading");
    setError(null);

    try {
      const nextResult = await scanReceipt();
      setResult(nextResult);
      setStatus("success");
      return nextResult;
    } catch (scanError) {
      setError(
        scanError instanceof Error ? scanError.message : "Unable to scan receipt",
      );
      setStatus("error");
      return null;
    }
  };

  return {
    error,
    isScanning: status === "loading",
    result,
    scan,
    status,
  };
}
