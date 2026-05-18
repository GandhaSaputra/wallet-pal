import { CustomCategory } from "./ModalAddCategory/ModalAddCategory.types";

export type CustomCategoriesCardProps = {
  categories: CustomCategory[];
  onAdd: (data: Omit<CustomCategory, "id" | "transactionCount">) => void;
  onEdit: (category: CustomCategory) => void;
  onDelete: (id: string) => void;
};

export type { CustomCategory };
