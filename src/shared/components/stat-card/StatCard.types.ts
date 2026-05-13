import { ReactNode } from "react";

export type StatCardProps = {
  icon: ReactNode;
  iconBackgroundColor: string;
  label: string;
  value: string;
  valueColor?: string;
};
