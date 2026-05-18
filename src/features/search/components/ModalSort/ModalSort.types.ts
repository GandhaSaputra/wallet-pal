export type SortOption = {
  id: string;
  label: string;
};

export const SORT_OPTIONS: SortOption[] = [
  { id: "date_desc", label: "Date (Newest First)" },
  { id: "date_asc", label: "Date (Oldest First)" },
  { id: "amount_desc", label: "Amount (Highest First)" },
  { id: "amount_asc", label: "Amount (Lowest First)" },
];

export type ModalSortRef = {
  show: () => void;
  hide: () => void;
};

export type ModalSortProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};
