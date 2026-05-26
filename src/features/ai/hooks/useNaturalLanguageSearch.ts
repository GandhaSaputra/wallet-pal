import { useState } from "react";
import { AIRequestStatus, NaturalLanguageSearchResult } from "../ai.model";
import { parseNaturalLanguageSearch } from "../ai.service";

export function useNaturalLanguageSearch() {
  const [status, setStatus] = useState<AIRequestStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<NaturalLanguageSearchResult | null>(null);

  const parseSearch = async (query: string) => {
    setStatus("loading");
    setError(null);

    try {
      const nextResult = await parseNaturalLanguageSearch(query);
      setResult(nextResult);
      setStatus("success");
      return nextResult;
    } catch (parseError) {
      setError(
        parseError instanceof Error
          ? parseError.message
          : "Unable to parse search query",
      );
      setStatus("error");
      return null;
    }
  };

  return {
    error,
    isParsing: status === "loading",
    parseSearch,
    result,
    status,
  };
}
