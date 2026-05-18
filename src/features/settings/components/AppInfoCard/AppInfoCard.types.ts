export type AppInfoLink = {
  label: string;
  onPress: () => void;
};

export type AppInfoCardProps = {
  appName?: string;
  version?: string;
  links?: AppInfoLink[];
};
