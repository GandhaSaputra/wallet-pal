export async function parseNaturalLanguageSearch(query: string) {
  return {
    query: query.trim(),
  };
}
