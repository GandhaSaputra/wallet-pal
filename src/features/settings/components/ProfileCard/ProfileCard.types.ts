export type ProfileCardProps = {
  fullName: string;
  avatarUrl?: string;
  monthlyBudget: string;
  onFullNameChange: (value: string) => void;
  onMonthlyBudgetChange: (value: string) => void;
};
