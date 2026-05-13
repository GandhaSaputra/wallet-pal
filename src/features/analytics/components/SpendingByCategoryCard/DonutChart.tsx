import { CategoryColors } from "@/src/constants/theme";
import React, { useMemo } from "react";
import Svg, { Circle } from "react-native-svg";
import { SpendingByCategoryCardProps } from "./SpendingByCategoryCard.types";

const DONUT_SIZE = 120;
const STROKE_WIDTH = 20;
const RADIUS = (DONUT_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = DONUT_SIZE / 2;
const GAP_DEGREE = 2;
const GAP_LENGTH = (GAP_DEGREE / 360) * CIRCUMFERENCE;

type DonutSegment = {
  color: string;
  dashArray: number;
  dashOffset: number;
};

const buildDonutSegments = (
  items: SpendingByCategoryCardProps["items"],
  total: number,
): DonutSegment[] => {
  const segments: DonutSegment[] = [];
  let accumulatedOffset = 0;

  for (const item of items) {
    const percentage = item.amount / total;
    const segmentLength = percentage * CIRCUMFERENCE - GAP_LENGTH;

    segments.push({
      color: CategoryColors[item.category],
      // dashArray: filled segment length, remainder is transparent
      dashArray: segmentLength,
      // dashOffset: starting position of this segment
      // SVG circle starts from right (3 o'clock), rotated to top (-90deg)
      // negative offset moves the start point back by accumulated length
      dashOffset: -accumulatedOffset,
    });

    accumulatedOffset += segmentLength + GAP_LENGTH;
  }

  return segments;
};

const DonutChart = ({
  items,
}: {
  items: SpendingByCategoryCardProps["items"];
}) => {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.amount, 0),
    [items],
  );

  const segments = useMemo(
    () => buildDonutSegments(items, total),
    [items, total],
  );

  return (
    <Svg width={DONUT_SIZE} height={DONUT_SIZE}>
      {segments.map((segment, index) => (
        <Circle
          key={index}
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={segment.color}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={`${segment.dashArray} ${CIRCUMFERENCE}`}
          strokeDashoffset={segment.dashOffset}
          // Rotate -90deg so the chart starts from the top (12 o'clock)
          rotation="-90"
          origin={`${CENTER}, ${CENTER}`}
          strokeLinecap="butt"
        />
      ))}
    </Svg>
  );
};

export default DonutChart;
