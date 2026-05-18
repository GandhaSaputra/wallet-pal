import { BrandColors } from "@/src/constants/theme";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Switch, View } from "react-native";
import { createStyles } from "./PreferencesCard.styles";
import {
  PreferencesCardProps,
  PreferencesState,
} from "./PreferencesCard.types";

type PreferenceItemConfig = {
  key: keyof PreferencesState;
  label: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
};

const PREFERENCE_ITEMS: PreferenceItemConfig[] = [
  {
    key: "darkMode",
    label: "Dark Mode",
    description: "Switch to dark theme",
    icon: "moon",
  },
  {
    key: "pushNotifications",
    label: "Push Notifications",
    description: "Get notified about expenses",
    icon: "bell",
  },
  {
    key: "budgetAlerts",
    label: "Budget Alerts",
    description: "Alert when overspending",
    icon: "shield",
  },
];

type PreferenceRowProps = {
  config: PreferenceItemConfig;
  value: boolean;
  onToggle: () => void;
  styles: ReturnType<typeof createStyles>;
  theme: ReturnType<typeof useTheme>;
};

const PreferenceRow = React.memo(
  ({ config, value, onToggle, styles, theme }: PreferenceRowProps) => (
    <View style={styles.preferenceItem}>
      {/* Icon */}
      <View style={styles.iconWrapper}>
        <Feather name={config.icon} size={18} color={theme.colors.icon} />
      </View>

      {/* Label + description */}
      <View style={styles.preferenceInfo}>
        <ThemedText type="bodySmallSemibold">{config.label}</ThemedText>
        <ThemedText type="labelSmallRegular" colorVariant="textMuted">
          {config.description}
        </ThemedText>
      </View>

      {/* Toggle */}
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{
          false: theme.colors.border,
          true: BrandColors.primary,
        }}
        ios_backgroundColor={theme.colors.border}
      />
    </View>
  ),
);

PreferenceRow.displayName = "PreferenceRow";

const PreferencesCard = React.memo(
  ({ preferences, onToggle }: PreferencesCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Feather name="settings" size={20} color={theme.colors.icon} />
          <ThemedText type="bodyMediumSemibold">Preferences</ThemedText>
        </View>

        {PREFERENCE_ITEMS.map((config) => (
          <PreferenceRow
            key={config.key}
            config={config}
            value={preferences[config.key]}
            onToggle={() => onToggle(config.key)}
            styles={styles}
            theme={theme}
          />
        ))}
      </View>
    );
  },
);

PreferencesCard.displayName = "PreferencesCard";

export default PreferencesCard;
