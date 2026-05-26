import { useState } from "react";
import { AIRequestStatus } from "../ai.model";
import { requestAIInsights } from "../ai.service";

export function useAIInsights() {
  const [status, setStatus] = useState<AIRequestStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const refreshInsights = async () => {
    setStatus("loading");
    setError(null);

    try {
      const insights = await requestAIInsights();
      setStatus("success");
      return insights;
    } catch (insightsError) {
      setError(
        insightsError instanceof Error
          ? insightsError.message
          : "Unable to load AI insights",
      );
      setStatus("error");
      return [];
    }
  };

  return {
    error,
    isLoading: status === "loading",
    refreshInsights,
    status,
  };
}
