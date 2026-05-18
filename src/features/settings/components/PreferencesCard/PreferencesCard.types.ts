export type PreferencesState = {
  darkMode: boolean;
  pushNotifications: boolean;
  budgetAlerts: boolean;
};

export type PreferencesCardProps = {
  preferences: PreferencesState;
  onToggle: (key: keyof PreferencesState) => void;
};
