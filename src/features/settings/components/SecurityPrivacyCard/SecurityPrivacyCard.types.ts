export type SecurityMenuItem = {
  id: string;
  label: string;
  icon: string;
  onPress: () => void;
};

export type SecurityPrivacyCardProps = {
  onManagePaymentMethods: () => void;
  onChangePassword: () => void;
  onPrivacySettings: () => void;
};
