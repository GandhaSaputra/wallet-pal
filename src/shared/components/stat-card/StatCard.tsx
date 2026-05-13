import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import React, { useMemo } from "react";
import { View } from "react-native";
import { createStyles } from "./StatCard.styles";
import { StatCardProps } from "./StatCard.types";

const StatCard = React.memo(
  ({ icon, iconBackgroundColor, label, value, valueColor }: StatCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: iconBackgroundColor },
          ]}
        >
          {icon}
        </View>
        <View style={styles.labelValueWrapper}>
          <ThemedText type="labelSmallRegular" colorVariant="textSecondary">
            {label}
          </ThemedText>
          <ThemedText
            type="titleSmall"
            style={valueColor ? { color: valueColor } : undefined}
          >
            {value}
          </ThemedText>
        </View>
      </View>
    );
  },
);

StatCard.displayName = "StatCard";

export default StatCard;
