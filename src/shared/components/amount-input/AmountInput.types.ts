export type AmountInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  currencySymbol?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
};
