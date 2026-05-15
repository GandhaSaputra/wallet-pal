export type CategoryInsightRowProps = {
  bestCategory: {
    label: string;
    percentageSaved: number; // 15 → "-15% saved"
  };
  needsAttention: {
    label: string;
    percentageOver: number; // 25 → "+25% over"
  };
};
