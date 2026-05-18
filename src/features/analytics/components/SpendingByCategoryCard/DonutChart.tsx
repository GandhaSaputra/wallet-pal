import { CategoryColors } from "@/src/constants/theme";
import React, { useEffect, useMemo } from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { SpendingByCategoryCardProps } from "./SpendingByCategoryCard.types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DONUT_SIZE = 120;
const STROKE_WIDTH = 20;
const RADIUS = (DONUT_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = DONUT_SIZE / 2;
// const GAP_DEGREE = 2;
// const GAP_LENGTH = (GAP_DEGREE / 360) * CIRCUMFERENCE;
const ANIMATION_DURATION = 1500;

type DonutSegment = {
  color: string;
  segmentLength: number;
  segmentStart: number; // accumulated offset where this segment begins
  dashOffset: number; // SVG dashOffset for positioning
};

const buildDonutSegments = (
  items: SpendingByCategoryCardProps["items"],
  total: number,
): DonutSegment[] => {
  const segments: DonutSegment[] = [];
  let accumulated = 0;

  for (const item of items) {
    const segmentLength = (item.amount / total) * CIRCUMFERENCE;

    segments.push({
      color: CategoryColors[item.category],
      segmentLength,
      segmentStart: accumulated,
      // dashOffset: starting position of this segment
      // SVG circle starts from right (3 o'clock), rotated to top (-90deg)
      // negative offset moves the start point back by accumulated length
      dashOffset: -accumulated,
    });

    accumulated += segmentLength;
  }

  return segments;
};

// Isolated animated segment — hooks cannot be called in a loop
type AnimatedSegmentProps = {
  segment: DonutSegment;
  drawProgress: ReturnType<typeof useSharedValue<number>>;
};

const AnimatedSegment = React.memo(
  ({ segment, drawProgress }: AnimatedSegmentProps) => {
    const animatedProps = useAnimatedProps(() => {
      "worklet";
      // How much of this segment is currently visible
      const visible = Math.min(
        Math.max(0, drawProgress.value - segment.segmentStart),
        segment.segmentLength,
      );
      return {
        strokeDasharray: `${visible} ${CIRCUMFERENCE}`,
      };
    });

    return (
      <AnimatedCircle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        fill="none"
        stroke={segment.color}
        strokeWidth={STROKE_WIDTH}
        strokeDashoffset={segment.dashOffset}
        // Rotate -90deg so the chart starts from the top (12 o'clock)
        rotation="-90"
        origin={`${CENTER}, ${CENTER}`}
        strokeLinecap="butt"
        animatedProps={animatedProps}
      />
    );
  },
);

AnimatedSegment.displayName = "AnimatedSegment";

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

  // Single progress value driving all segments
  const drawProgress = useSharedValue(0);

  useEffect(() => {
    const totalFilledLength = segments.reduce(
      (sum, s) => sum + s.segmentLength,
      0,
    );

    drawProgress.value = withTiming(totalFilledLength, {
      duration: ANIMATION_DURATION,
      easing: Easing.inOut(Easing.cubic),
    });

    // Reset on unmount so animation replays if component remounts
    return () => {
      drawProgress.value = 0;
    };
  }, [drawProgress, segments]);

  return (
    <Svg width={DONUT_SIZE} height={DONUT_SIZE}>
      {segments.map((segment, index) => (
        <AnimatedSegment
          key={index}
          segment={segment}
          drawProgress={drawProgress}
        />
      ))}
    </Svg>
  );
};

export default DonutChart;
