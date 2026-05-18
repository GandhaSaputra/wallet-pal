export type DescriptionInputCardProps = {
  value: string;
  onChangeText: (value: string) => void;
  suggestion?: string;
  onApplySuggestion?: () => void;
  required?: boolean;
};
