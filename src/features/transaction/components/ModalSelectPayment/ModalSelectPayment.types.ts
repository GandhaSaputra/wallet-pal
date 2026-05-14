export type PaymentMethodId =
  | "creditCard"
  | "debitCard"
  | "cash"
  | "eWallet"
  | "bankTransfer"
  | "qris"
  | "bnpl"
  | "mobilePay"
  | "sepaDirectDebit"
  | "mobileMoney";

export type PaymentMethod = {
  id: PaymentMethodId;
  label: string;
  description: string;
  icon: string;
};

export type ModalSelectPaymentProps = {
  selectedPaymentId: PaymentMethodId;
  onSelect: (paymentMethod: PaymentMethod) => void;
};
