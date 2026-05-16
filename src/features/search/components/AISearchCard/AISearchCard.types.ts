export type AISearchCardProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: (query: string) => void;
  isProcessing?: boolean;
  suggestions?: string[];
  placeholder?: string;
};
