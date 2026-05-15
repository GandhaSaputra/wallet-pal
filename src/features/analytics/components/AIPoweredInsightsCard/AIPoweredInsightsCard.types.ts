import { Feather } from "@expo/vector-icons";

export type InsightTone = "warning" | "success" | "goal";

export type InsightItem = {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
  action: string;
  tone: InsightTone;
};

export type AIPoweredInsightsCardProps = {
  insights: InsightItem[];
};
