export type QuickFilterItem = {
  id: string;
  label: string;
};

export type QuickFiltersCardProps = {
  filters: QuickFilterItem[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};
