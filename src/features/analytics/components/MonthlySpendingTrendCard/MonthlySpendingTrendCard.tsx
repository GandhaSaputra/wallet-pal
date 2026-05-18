import { BrandColors } from "@/src/constants/theme";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import LineChart from "./LineChart";
import { createStyles } from "./MonthlySpendingTrendCard.styles";
import {
  ChartPoint,
  MonthlySpendingTrendCardProps,
  TooltipState,
  TrendDataPoint,
} from "./MonthlySpendingTrendCard.types";

export const CHART_HEIGHT = 240;
export const POINT_SPACING = 64;
export const CHART_PADDING_TOP = 40;
export const CHART_PADDING_BOTTOM = 52;
export const CHART_PADDING_HORIZONTAL = 32;

const buildChartPoints = (data: TrendDataPoint[]): ChartPoint[] => {
  const plotHeight = CHART_HEIGHT - CHART_PADDING_TOP - CHART_PADDING_BOTTOM;
  const amounts = data.map((d) => d.amount);
  const minAmount = Math.min(...amounts);
  const maxAmount = Math.max(...amounts);
  const range = maxAmount - minAmount || 1;

  return data.map((point, index) => {
    const prevPoint = data[index - 1];
    const showYearLabel = index === 0 || point.year !== prevPoint?.year;

    return {
      x: CHART_PADDING_HORIZONTAL + index * POINT_SPACING,
      y:
        CHART_PADDING_TOP +
        plotHeight -
        ((point.amount - minAmount) / range) * plotHeight,
      data: point,
      showYearLabel,
    };
  });
};

const getSvgWidth = (dataLength: number): number =>
  CHART_PADDING_HORIZONTAL * 2 + (dataLength - 1) * POINT_SPACING;

const MonthlySpendingTrendCard = React.memo(
  ({
    data,
    trendPercentage,
    currentMonth,
    currencyCode,
  }: MonthlySpendingTrendCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);
    const scrollRef = useRef<ScrollView>(null);
    const [tooltip, setTooltip] = useState<TooltipState>(null);

    const isPositiveTrend = trendPercentage > 0;
    const trendColor = isPositiveTrend
      ? BrandColors.success
      : theme.colors.danger;
    const trendIconBg = isPositiveTrend
      ? theme.colors.successCard
      : theme.colors.dangerCard;
    const trendLabel = `${isPositiveTrend ? "+" : ""}${trendPercentage.toFixed(1)}% vs last month`;

    const points = useMemo(() => buildChartPoints(data), [data]);
    const svgWidth = useMemo(() => getSvgWidth(data.length), [data.length]);

    const handleDotPress = useCallback(
      (index: number, point: ChartPoint, label: string) => {
        setTooltip((prev) =>
          prev?.index === index
            ? null
            : { index, x: point.x, y: point.y, label },
        );
      },
      [],
    );

    return (
      <View style={styles.container}>
        <ThemedText type="titleSmall">Monthly Spending Trend</ThemedText>
        <Spacer height={theme.spacing.sm} />
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={POINT_SPACING}
          snapToAlignment="start"
          onScrollBeginDrag={() => setTooltip(null)}
          onContentSizeChange={() => {
            scrollRef.current?.scrollToEnd({ animated: false });
          }}
        >
          <LineChart
            points={points}
            svgWidth={svgWidth}
            tooltip={tooltip}
            onDotPress={handleDotPress}
            theme={theme}
            currencyCode={currencyCode}
          />
        </ScrollView>
        <Spacer height={theme.spacing.xs} />
        <View style={[theme.flex.rowCenterBetween, styles.footer]}>
          <View style={styles.trendBadge}>
            <View
              style={[
                styles.trendIconWrapper,
                { backgroundColor: trendIconBg },
              ]}
            >
              <Feather
                name={isPositiveTrend ? "arrow-up" : "arrow-down"}
                size={14}
                color={trendColor}
              />
            </View>
            <ThemedText type="bodySmallSemibold" style={{ color: trendColor }}>
              {trendLabel}
            </ThemedText>
          </View>
          <View style={styles.monthBadge}>
            <ThemedText type="labelSmall" colorVariant="textSecondary">
              {currentMonth}
            </ThemedText>
          </View>
        </View>
      </View>
    );
  },
);

MonthlySpendingTrendCard.displayName = "MonthlySpendingTrendCard";

export default MonthlySpendingTrendCard;
