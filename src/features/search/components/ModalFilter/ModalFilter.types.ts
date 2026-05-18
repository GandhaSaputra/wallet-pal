export type FilterDateRange = "all" | "this_week" | "this_month" | "last_month";

export type FilterPaymentMethod = "credit_card" | "cash" | "digital_wallet";

export type SearchFilters = {
  categories: string[];
  dateRange: FilterDateRange;
  minAmount: string;
  maxAmount: string;
  paymentMethods: FilterPaymentMethod[];
};

export const DEFAULT_FILTERS: SearchFilters = {
  categories: [],
  dateRange: "all",
  minAmount: "",
  maxAmount: "",
  paymentMethods: [],
};

export type ModalFilterRef = {
  show: () => void;
  hide: () => void;
};

export type ModalFilterProps = {
  filters: SearchFilters;
  onApply: (filters: SearchFilters) => void;
};

export const DATE_RANGE_OPTIONS: { id: FilterDateRange; label: string }[] = [
  { id: "all", label: "All Time" },
  { id: "this_week", label: "This Week" },
  { id: "this_month", label: "This Month" },
  { id: "last_month", label: "Last Month" },
];

export const PAYMENT_METHOD_OPTIONS: {
  id: FilterPaymentMethod;
  label: string;
}[] = [
  { id: "credit_card", label: "Credit Card" },
  { id: "cash", label: "Cash" },
  { id: "digital_wallet", label: "Digital Wallet" },
];

export const CATEGORY_OPTIONS: { id: string; label: string }[] = [
  { id: "food", label: "Food" },
  { id: "transport", label: "Transport" },
  { id: "bills", label: "Bills" },
  { id: "shopping", label: "Shopping" },
  { id: "others", label: "Others" },
];
