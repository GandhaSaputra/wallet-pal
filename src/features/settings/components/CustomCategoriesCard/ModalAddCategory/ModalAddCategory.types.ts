export type CustomCategory = {
  id: string;
  icon: string;
  name: string;
  color: string;
  transactionCount: number;
};

export type ModalAddCategoryRef = {
  show: (category?: CustomCategory) => void;
  hide: () => void;
};

export type ModalAddCategoryProps = {
  onSave: (data: Omit<CustomCategory, "id" | "transactionCount">) => void;
};

export const CATEGORY_COLOR_OPTIONS = [
  "#FF6B35",
  "#4CAF50",
  "#2196F3",
  "#9C27B0",
  "#FF9800",
  "#F44336",
  "#00BCD4",
  "#795548",
];

export const CATEGORY_ICON_OPTIONS = [
  "☕",
  "💪",
  "🐕",
  "🎮",
  "✈️",
  "📚",
  "🎵",
  "🏥",
  "🛍️",
  "🏠",
  "💄",
  "🍕",
];
