import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { createStyles } from "./SecurityPrivacyCard.styles";
import { SecurityPrivacyCardProps } from "./SecurityPrivacyCard.types";

type MenuItemProps = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
  styles: ReturnType<typeof createStyles>;
  theme: ReturnType<typeof useTheme>;
};

const MenuItem = React.memo(
  ({ icon, label, onPress, styles, theme }: MenuItemProps) => (
    <TouchableOpacity
      style={[styles.menuItem]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Feather
        name={icon}
        size={theme.iconSizes.md}
        color={theme.colors.icon}
      />
      <ThemedText type="bodySmallSemibold" colorVariant="text">
        {label}
      </ThemedText>
      <View style={styles.flex1} />
      <Feather
        name="chevron-right"
        size={theme.iconSizes.sm}
        color={theme.colors.textMuted}
      />
    </TouchableOpacity>
  ),
);

MenuItem.displayName = "MenuItem";

const SecurityPrivacyCard = React.memo(
  ({
    onManagePaymentMethods,
    onChangePassword,
    onPrivacySettings,
  }: SecurityPrivacyCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Feather
            name="shield"
            size={theme.iconSizes.md}
            color={theme.colors.icon}
          />
          <ThemedText type="bodyMediumSemibold">Security & Privacy</ThemedText>
        </View>

        <MenuItem
          icon="credit-card"
          label="Manage Payment Methods"
          onPress={onManagePaymentMethods}
          styles={styles}
          theme={theme}
        />
        <MenuItem
          icon="shield"
          label="Change Password"
          onPress={onChangePassword}
          styles={styles}
          theme={theme}
        />
        <MenuItem
          icon="user"
          label="Privacy Settings"
          onPress={onPrivacySettings}
          styles={styles}
          theme={theme}
        />
      </View>
    );
  },
);

SecurityPrivacyCard.displayName = "SecurityPrivacyCard";

export default SecurityPrivacyCard;
