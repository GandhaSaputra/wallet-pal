export type TransactionMetaFieldsProps = {
  dateLabel: string;
  paymentLabel: string | null;
  paymentIcon?: string | null;
  onPressDate?: () => void;
  onPressPayment?: () => void;
};
