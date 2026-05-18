import { PaymentMethod } from "./ModalSelectPayment.types";

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "creditCard",
    label: "Credit Card",
    description: "Visa, Mastercard, AmEx",
    icon: "💳",
  },
  {
    id: "debitCard",
    label: "Debit Card",
    description: "Bank-issued debit cards",
    icon: "💳",
  },
  {
    id: "cash",
    label: "Cash",
    description: "Physical cash payment",
    icon: "💵",
  },
  {
    id: "eWallet",
    label: "E-Wallet",
    description: "GoPay, OVO, PayPal, GrabPay",
    icon: "👛",
  },
  {
    id: "bankTransfer",
    label: "Bank Transfer",
    description: "ACH, wire, local bank transfer",
    icon: "🏦",
  },
  // {
  //   id: "qris",
  //   label: "QRIS / QR Code",
  //   description: "QRIS, PromptPay, DuitNow, AliPay",
  //   icon: "▦",
  // },
  // {
  //   id: "bnpl",
  //   label: "Buy Now Pay Later",
  //   description: "Klarna, Afterpay, Affirm, PayLater",
  //   icon: "🧾",
  // },
  // {
  //   id: "mobilePay",
  //   label: "Apple Pay / Google Pay",
  //   description: "NFC mobile wallet payment",
  //   icon: "📱",
  // },
  // {
  //   id: "sepaDirectDebit",
  //   label: "SEPA / Direct Debit",
  //   description: "Common bank debit in Europe",
  //   icon: "↔️",
  // },
  // {
  //   id: "mobileMoney",
  //   label: "Mobile Money",
  //   description: "M-Pesa and regional mobile accounts",
  //   icon: "📲",
  // },
];
