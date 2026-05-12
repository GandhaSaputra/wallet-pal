import { Platform, TextStyle } from "react-native";

export const BrandColors = {
  primary: "#5638F5",
  primaryOpacity15: "rgba(95, 65, 245, 0.15)",
  primaryPressed: "#4329D9",
  primarySoft: "#EEF1FF",
  primaryBorder: "#9BA8FF",
  secondary: "#2F80ED",
  accentPurple: "#A020F0",
  aiBlue: "#0B57FF",
  success: "#00C853",
  successSoft: "#EAFBF1",
  warning: "#FF4B00",
  warningSoft: "#FFF6E8",
  danger: "#FF2D3D",
  dangerSoft: "#FFE6EA",
  food: "#FF2D3D",
  transport: "#2F80ED",
  bills: "#00C853",
  shopping: "#F5B400",
  others: "#9CA3AF",
  chartLine: "#6266F1",
} as const;

export const NeutralColors = {
  white: "#FFFFFF",
  black: "#000000",
  gray25: "#FCFCFD",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray150: "#EEF0F4",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
  gray950: "#0B1020",
} as const;

export const Colors = {
  light: {
    brand: BrandColors.primary,
    primary: BrandColors.primary,
    primaryPressed: BrandColors.primaryPressed,
    primarySoft: BrandColors.primarySoft,
    secondary: BrandColors.secondary,
    accent: BrandColors.accentPurple,
    ai: BrandColors.aiBlue,
    success: BrandColors.success,
    warning: BrandColors.warning,
    danger: BrandColors.danger,
    text: NeutralColors.gray900,
    textSecondary: NeutralColors.gray500,
    textMuted: NeutralColors.gray400,
    background: NeutralColors.gray50,
    surface: NeutralColors.white,
    surfaceMuted: NeutralColors.gray100,
    card: NeutralColors.white,
    cardElevated: NeutralColors.white,
    border: NeutralColors.gray200,
    borderStrong: NeutralColors.gray300,
    input: NeutralColors.gray50,
    inputBorder: NeutralColors.gray300,
    tint: BrandColors.primary,
    icon: NeutralColors.gray500,
    tabBar: NeutralColors.white,
    tabIconDefault: NeutralColors.gray500,
    tabIconSelected: BrandColors.primary,
    shadow: NeutralColors.black,
    progressTrack: "#8E54EF",
    progressFill: NeutralColors.black,
    chartGrid: "#F1F3F7",
    aiCard: "#EAF3FF",
    successCard: BrandColors.successSoft,
    warningCard: BrandColors.warningSoft,
    dangerCard: BrandColors.dangerSoft,
    bottomBarSelectedWrapper: BrandColors.primarySoft,
  },
  dark: {
    brand: "#7C67FF",
    primary: "#7C67FF",
    primaryPressed: "#9B8BFF",
    primarySoft: "#211D45",
    secondary: "#6EA8FF",
    accent: "#C084FC",
    ai: "#7DB1FF",
    success: "#4ADE80",
    warning: "#FF8A3D",
    danger: "#FF5A67",
    text: "#F7F7FB",
    textSecondary: "#B7BDCB",
    textMuted: "#7E8798",
    background: "#0B1020",
    surface: "#12182A",
    surfaceMuted: "#1A2236",
    card: "#151D31",
    cardElevated: "#1B2540",
    border: "#273149",
    borderStrong: "#35405C",
    input: "#101729",
    inputBorder: "#35405C",
    tint: "#7C67FF",
    icon: "#B7BDCB",
    tabBar: "#111827",
    tabIconDefault: "#8B93A5",
    tabIconSelected: "#8B7BFF",
    shadow: NeutralColors.black,
    progressTrack: "#2E245A",
    progressFill: "#7C67FF",
    chartGrid: "#202A40",
    aiCard: "#122747",
    successCard: "#0E2B1D",
    warningCard: "#331F0E",
    dangerCard: "#35151B",
    bottomBarSelectedWrapper: BrandColors.primaryOpacity15,
  },
};

export type AppThemeName = keyof typeof Colors;
export type ThemeColors = (typeof Colors)[AppThemeName];

type FontWeight = NonNullable<TextStyle["fontWeight"]>;

function createFontStyle(
  fontSize: number,
  lineHeight: number,
  fontWeight: FontWeight = "400",
): TextStyle {
  return {
    fontSize,
    lineHeight,
    fontWeight,
  };
}

export const fontStyles = {
  regular: { fontWeight: "400" as FontWeight },
  medium: { fontWeight: "500" as FontWeight },
  semibold: { fontWeight: "600" as FontWeight },
  bold: { fontWeight: "700" as FontWeight },
  extraBold: { fontWeight: "800" as FontWeight },
};

export const typography = {
  displayLarge: createFontStyle(40, 48, "800"),
  displayMedium: createFontStyle(32, 40, "800"),
  titleLarge: createFontStyle(28, 34, "800"),
  titleMedium: createFontStyle(22, 28, "700"),
  titleSmall: createFontStyle(18, 24, "700"),
  bodyLarge: createFontStyle(18, 26),
  bodyMedium: createFontStyle(16, 24),
  bodySmall: createFontStyle(14, 20),
  labelLarge: createFontStyle(16, 22, "700"),
  labelMedium: createFontStyle(14, 20, "600"),
  labelSmall: createFontStyle(12, 16, "600"),
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  default: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
};

export const iconSizes = {
  sm: 16,
  md: 20,
  default: 24,
  lg: 30,
  xl: 32,
  "2xl": 40,
};

export const borders = {
  xs: 4,
  sm: 6,
  default: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const radii = borders;

export const shadows = {
  card: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
};

export type Theme = {
  name: AppThemeName;
  isDark: boolean;
  colors: ThemeColors;
  fonts: typeof typography;
  spacing: typeof spacing;
  iconSizes: typeof iconSizes;
  borders: typeof borders;
  radii: typeof radii;
  shadows: typeof shadows;
};

function createTheme(name: AppThemeName): Theme {
  return {
    name,
    isDark: name === "dark",
    colors: Colors[name],
    fonts: typography,
    spacing,
    borders,
    radii,
    shadows,
    iconSizes,
  };
}

export const lightTheme = createTheme("light");
export const darkTheme = createTheme("dark");

export const AppThemes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export const CategoryColors = {
  food: BrandColors.food,
  transport: BrandColors.transport,
  bills: BrandColors.bills,
  shopping: BrandColors.shopping,
  others: BrandColors.others,
} as const;

export const Gradients = {
  primaryCard: [BrandColors.primary, BrandColors.accentPurple],
  darkPrimaryCard: ["#4C35D8", "#7B1FEA"],
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
