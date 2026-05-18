import { InsightItem } from "../features/analytics/components/AIPoweredInsightsCard";
import { CategoryBreakdownItem } from "../features/analytics/components/CategoryBreakdownCard";
import { SpendingCategoryItem } from "../features/analytics/components/SpendingByCategoryCard";

export const MOCK_SPENDING: SpendingCategoryItem[] = [
  { category: "food", label: "Food", amount: 1150 },
  { category: "transport", label: "Transport", amount: 680 },
  { category: "bills", label: "Bills", amount: 520 },
  { category: "shopping", label: "Shopping", amount: 350 },
  { category: "others", label: "Others", amount: 147 },
];

export const MONTHLY_INSIGHTS: InsightItem[] = [
  {
    id: "high-spending-alert",
    icon: "alert-triangle",
    title: "High Spending Alert",
    description: "You spent 25% more on food this week.",
    action: "Consider meal planning to reduce expenses.",
    tone: "warning",
  },
  {
    id: "transport-progress",
    icon: "trending-up",
    title: "Great Progress!",
    description: "Transportation costs decreased by 15%.",
    action: "Keep using public transport.",
    tone: "success",
  },
  {
    id: "budget-goal",
    icon: "target",
    title: "Budget Goal",
    description: "You're 81% towards your monthly goal.",
    action: "You can spend $653 more this month.",
    tone: "goal",
  },
];

export const YEARLY_INSIGHTS: InsightItem[] = [
  {
    id: "annual-food-alert",
    icon: "alert-triangle",
    title: "Dining Trend Alert",
    description: "Food spending is your fastest-growing category.",
    action: "Review recurring restaurant expenses.",
    tone: "warning",
  },
  {
    id: "annual-savings-progress",
    icon: "trending-up",
    title: "Strong Savings Pace",
    description: "Your yearly savings improved by 12%.",
    action: "Keep your automatic transfers active.",
    tone: "success",
  },
  {
    id: "annual-budget-goal",
    icon: "target",
    title: "Annual Budget Goal",
    description: "You're 68% towards your yearly target.",
    action: "You can spend $4,220 more this year.",
    tone: "goal",
  },
];

export const MOCK_BREAKDOWN: CategoryBreakdownItem[] = [
  {
    category: "food",
    label: "Food",
    thisMonth: 1800,
    lastMonth: 1000,
    thisMonthBudget: 3500,
  },
  {
    category: "transport",
    label: "Transport",
    thisMonth: 780,
    lastMonth: 900,
    thisMonthBudget: 3500,
  },
  {
    category: "bills",
    label: "Bills",
    thisMonth: 550,
    lastMonth: 510,
    thisMonthBudget: 3500,
  },
  {
    category: "shopping",
    label: "Shopping",
    thisMonth: 350,
    lastMonth: 250,
    thisMonthBudget: 3500,
  },
];
