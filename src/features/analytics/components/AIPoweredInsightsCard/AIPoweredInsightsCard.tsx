import { BrandColors } from "@/src/constants/theme";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather, Octicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { View } from "react-native";
import {
  createStyles,
  getInsightToneColors,
} from "./AIPoweredInsightsCard.styles";
import { AIPoweredInsightsCardProps } from "./AIPoweredInsightsCard.types";

const AIPoweredInsightsCard = React.memo(
  ({ insights }: AIPoweredInsightsCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Octicons
              name="light-bulb"
              size={theme.iconSizes.sm}
              color={BrandColors.insightIcon}
            />
          </View>
          <ThemedText type="bodyMediumSemibold">AI-Powered Insights</ThemedText>
        </View>

        <View style={styles.insightList}>
          {insights.map((insight) => {
            const toneColors = getInsightToneColors({
              theme,
              tone: insight.tone,
            });

            return (
              <View
                key={insight.id}
                style={[
                  styles.insightItem,
                  {
                    backgroundColor: toneColors.backgroundColor,
                    borderColor: toneColors.borderColor,
                  },
                ]}
              >
                <View
                  style={[
                    styles.insightIcon,
                    { backgroundColor: toneColors.iconBackgroundColor },
                  ]}
                >
                  <Feather
                    name={insight.icon}
                    size={theme.iconSizes.sm}
                    color={toneColors.color}
                  />
                </View>

                <View style={styles.insightContent}>
                  <ThemedText
                    type="labelMediumSemibold"
                    style={{ color: toneColors.color }}
                  >
                    {insight.title}
                  </ThemedText>
                  <ThemedText
                    type="labelSmallRegular"
                    style={{ color: toneColors.color }}
                  >
                    {insight.description}
                  </ThemedText>
                  <ThemedText
                    type="labelSmallMedium"
                    style={{ color: toneColors.color }}
                  >
                    {insight.action}
                  </ThemedText>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  },
);

AIPoweredInsightsCard.displayName = "AIPoweredInsightsCard";

export default AIPoweredInsightsCard;
