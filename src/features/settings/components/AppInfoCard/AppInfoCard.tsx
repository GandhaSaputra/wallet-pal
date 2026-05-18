import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import React, { useMemo } from "react";
import { Alert, Pressable, View } from "react-native";
import { createStyles } from "./AppInfoCard.styles";
import { AppInfoCardProps } from "./AppInfoCard.types";

const DEFAULT_LINKS = [
  { label: "Terms", onPress: () => Alert.alert("Terms of Service") },
  { label: "Privacy", onPress: () => Alert.alert("Privacy Policy") },
  { label: "Help", onPress: () => Alert.alert("Help Center") },
];

const AppInfoCard = React.memo(
  ({
    appName = "WalletPal",
    version = "2.1.0",
    links = DEFAULT_LINKS,
  }: AppInfoCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View style={styles.container}>
        <ThemedText type="labelSmallRegular" colorVariant="textSecondary">
          {appName} v{version}
        </ThemedText>

        <View style={styles.linksRow}>
          {links.map((link) => (
            <Pressable key={link.label} onPress={link.onPress} hitSlop={8}>
              <ThemedText type="bodySmallSemibold">{link.label}</ThemedText>
            </Pressable>
          ))}
        </View>
      </View>
    );
  },
);

AppInfoCard.displayName = "AppInfoCard";

export default AppInfoCard;
