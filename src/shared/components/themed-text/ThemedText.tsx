import {
  ThemeColors,
  TypographyVariant,
  typography,
} from "@/src/constants/theme";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextType = TypographyVariant | "link";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemedTextType;
  colorVariant?: keyof ThemeColors;
  // Dynamic overrides
  fontSize?: number;
  fontWeight?: TextProps["style"] extends { fontWeight?: infer W } ? W : never;
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: "left" | "center" | "right" | "justify";
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  italic?: boolean;
  underline?: boolean;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "labelMediumSmall",
  colorVariant = "text",
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textAlign,
  textTransform,
  italic,
  underline,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorVariant,
  );

  const dynamicStyle = {
    ...(fontSize !== undefined && { fontSize }),
    ...(fontWeight !== undefined && { fontWeight }),
    ...(lineHeight !== undefined && { lineHeight }),
    ...(letterSpacing !== undefined && { letterSpacing }),
    ...(textAlign !== undefined && { textAlign }),
    ...(textTransform !== undefined && { textTransform }),
    ...(italic && { fontStyle: "italic" as const }),
    ...(underline && { textDecorationLine: "underline" as const }),
  };

  return (
    <Text
      style={[
        { color },
        type === "link" ? styles.link : typography[type],
        dynamicStyle,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  link: {
    ...typography.bodyMedium,
    color: "#0a7ea4",
    textDecorationLine: "underline",
  },
});
