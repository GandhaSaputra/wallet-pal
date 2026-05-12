/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { ThemeColors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/shared/hooks/useColorScheme";
import { useTheme } from "@/src/shared/hooks/useThemeController";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof ThemeColors,
) {
  const theme = useColorScheme() ?? "light";
  const appTheme = useTheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return appTheme.colors[colorName];
  }
}
