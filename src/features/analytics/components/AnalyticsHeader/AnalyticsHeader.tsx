import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyles } from "./AnalyticsHeader.styles";
import { AnalyticsHeaderProps, AnalyticsPeriod } from "./AnalyticsHeader.types";

const PERIOD_OPTIONS: { label: string; value: AnalyticsPeriod }[] = [
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];

const AnalyticsHeader = React.memo(
  ({ selectedPeriod, onSelectPeriod }: AnalyticsHeaderProps) => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const styles = useMemo(
      () => createStyles({ theme, insets }),
      [theme, insets],
    );

    return (
      <View style={styles.container}>
        <ThemedText type="titleMedium">Analytics</ThemedText>
        <View style={styles.segmentedControl}>
          {PERIOD_OPTIONS.map((option) => {
            const isActive = selectedPeriod === option.value;

            return (
              <TouchableOpacity
                key={option.value}
                activeOpacity={0.8}
                onPress={() => onSelectPeriod(option.value)}
                style={[
                  styles.segmentButton,
                  isActive ? styles.activeSegmentButton : undefined,
                ]}
              >
                <ThemedText
                  type="bodySmallSemibold"
                  colorVariant={isActive ? "white" : "textSecondary"}
                >
                  {option.label}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  },
);

AnalyticsHeader.displayName = "AnalyticsHeader";

export default AnalyticsHeader;
