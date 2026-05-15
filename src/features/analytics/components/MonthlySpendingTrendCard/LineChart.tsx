import { BrandColors, Theme } from "@/src/constants/theme";
import { formatCurrency } from "@/src/shared/utils/formatCurrency";
import React from "react";
import {
  Circle,
  G,
  Line,
  Polyline,
  Rect,
  Svg,
  Text as SvgText,
} from "react-native-svg";
import {
  CHART_HEIGHT,
  CHART_PADDING_BOTTOM,
  CHART_PADDING_HORIZONTAL,
  CHART_PADDING_TOP,
} from "./MonthlySpendingTrendCard";
import { ChartPoint, TooltipState } from "./MonthlySpendingTrendCard.types";

const DOT_RADIUS = 5;
const DOT_HIT_SLOP = 16;
const GRID_LINES = 4;
const TOOLTIP_HEIGHT = 28;
const TOOLTIP_PADDING = 8;
const YEAR_LABEL_OFFSET = 16;

type LineChartProps = {
  points: ChartPoint[];
  svgWidth: number;
  tooltip: TooltipState;
  onDotPress: (index: number, point: ChartPoint, label: string) => void;
  theme: Theme;
  currencyCode?: string;
};

const LineChart = React.memo(
  ({
    points,
    svgWidth,
    tooltip,
    onDotPress,
    theme,
    currencyCode,
  }: LineChartProps) => {
    const plotHeight = CHART_HEIGHT - CHART_PADDING_TOP - CHART_PADDING_BOTTOM;
    const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
    const axisY = CHART_PADDING_TOP + plotHeight;

    const gridLineYPositions = Array.from(
      { length: GRID_LINES + 1 },
      (_, i) => CHART_PADDING_TOP + (i / GRID_LINES) * plotHeight,
    );

    return (
      <Svg width={svgWidth} height={CHART_HEIGHT}>
        {/* Horizontal grid lines */}
        {gridLineYPositions.map((y, i) => (
          <Line
            key={`hgrid-${i}`}
            x1={CHART_PADDING_HORIZONTAL}
            y1={y}
            x2={svgWidth - CHART_PADDING_HORIZONTAL}
            y2={y}
            stroke={theme.colors.chartGrid}
            strokeWidth={1}
          />
        ))}

        {/* Vertical grid lines */}
        {points.map((p, i) => (
          <Line
            key={`vgrid-${i}`}
            x1={p.x}
            y1={CHART_PADDING_TOP}
            x2={p.x}
            y2={axisY}
            stroke={theme.colors.chartGrid}
            strokeWidth={1}
          />
        ))}

        {/* Vertical dashed line on selected dot */}
        {tooltip &&
          (() => {
            const selected = points[tooltip.index];
            return (
              <Line
                x1={selected.x}
                y1={selected.y + DOT_RADIUS}
                x2={selected.x}
                y2={axisY}
                stroke={theme.colors.primary}
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
            );
          })()}

        {/* Line */}
        <Polyline
          points={polylinePoints}
          fill="none"
          stroke={BrandColors.chartLine}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* X-axis: month label + year label */}
        {points.map((p, i) => {
          const isSelected = tooltip?.index === i;
          const labelColor = isSelected
            ? theme.colors.primary
            : theme.colors.textMuted;
          const labelWeight = isSelected ? "700" : "400";

          return (
            <G key={`xlabel-${i}`}>
              {/* Month label */}
              <SvgText
                x={p.x}
                y={axisY + 18}
                textAnchor="middle"
                fontSize={12}
                fill={labelColor}
                fontWeight={labelWeight}
              >
                {p.data.month}
              </SvgText>

              {/* Year label — only when year changes or first point */}
              {p.showYearLabel && (
                <SvgText
                  x={p.x}
                  y={axisY + 18 + YEAR_LABEL_OFFSET}
                  textAnchor="middle"
                  fontSize={10}
                  fill={theme.colors.textMuted}
                  fontWeight="600"
                >
                  {p.data.year}
                </SvgText>
              )}
            </G>
          );
        })}

        {/* Dots — pressable */}
        {points.map((p, i) => {
          const isSelected = tooltip?.index === i;
          const label = formatCurrency({
            amount: p.data.amount,
            currency: currencyCode,
          });

          return (
            <G key={`dot-${i}`} onPress={() => onDotPress(i, p, label)}>
              <Circle cx={p.x} cy={p.y} r={DOT_HIT_SLOP} fill="transparent" />
              {isSelected && (
                <Circle
                  cx={p.x}
                  cy={p.y}
                  r={DOT_RADIUS + 4}
                  fill={BrandColors.chartLine}
                  opacity={0.2}
                />
              )}
              <Circle
                cx={p.x}
                cy={p.y}
                r={DOT_RADIUS}
                fill={isSelected ? BrandColors.chartLine : theme.colors.card}
                stroke={BrandColors.chartLine}
                strokeWidth={2}
              />
            </G>
          );
        })}

        {/* Tooltip */}
        {tooltip &&
          (() => {
            const tooltipWidth = tooltip.label.length * 8 + TOOLTIP_PADDING * 2;
            const tooltipX = Math.min(
              Math.max(tooltip.x - tooltipWidth / 2, CHART_PADDING_HORIZONTAL),
              svgWidth - CHART_PADDING_HORIZONTAL - tooltipWidth,
            );
            const spaceAbove = tooltip.y - TOOLTIP_HEIGHT - 8;
            const showBelow = spaceAbove < CHART_PADDING_TOP;
            const tooltipY = showBelow
              ? tooltip.y + DOT_RADIUS + 8
              : tooltip.y - TOOLTIP_HEIGHT - 8;

            return (
              <G>
                <Rect
                  x={tooltipX}
                  y={tooltipY}
                  width={tooltipWidth}
                  height={TOOLTIP_HEIGHT}
                  rx={6}
                  fill={BrandColors.chartLine}
                />
                <SvgText
                  x={tooltipX + tooltipWidth / 2}
                  y={tooltipY + TOOLTIP_HEIGHT / 2 + 4}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight="600"
                  fill={theme.colors.white}
                >
                  {tooltip.label}
                </SvgText>
              </G>
            );
          })()}
      </Svg>
    );
  },
);

LineChart.displayName = "LineChart";

export default LineChart;
