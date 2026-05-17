import { Platform, TextStyle, ViewStyle } from "react-native";

export const BrandColors = {
  primary: "#5638F5",
  primaryOpacity15: "rgba(95, 65, 245, 0.15)",
  primaryPressed: "#4329D9",
  primarySoft: "#EEF1FF",
  primaryBorder: "#9BA8FF",
  primaryText: "#7C67FF",
  primarySurface: "#dfe7ff",
  primarySurfaceDark: "rgba(223, 231, 255, 0.5)",
  secondary: "#165dfc",
  accentPurple: "#A020F0",
  aiBlue: "#0B57FF",
  aiSurface: "#eef6ff",
  aiBorderColor: "#c6dfff",
  success: "#00a63d",
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
  insight: "#fff9c2",
  insightIcon: "#d08800",
} as const;

export const NeutralColors = {
  white: "#FFFFFF",
  whiteOpacity50: "rgba(255, 255, 255, 0.5)",
  whiteOpacity25: "rgba(255, 255, 255, 0.25)",
  whiteOpacity10: "rgba(255, 255, 255, 0.10)",
  black: "#000000",
  blackOpacity50: "rgba(0, 0, 0, 0.5)",
  blackOpacity25: "rgba(0, 0, 0, 0.25)",
  blackOpacity10: "rgba(0, 0, 0, 0.10)",
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
    aiSurface: BrandColors.aiSurface,
    aiBorderColor: BrandColors.aiBorderColor,
    success: BrandColors.success,
    warning: BrandColors.warning,
    danger: BrandColors.danger,
    text: NeutralColors.gray900,
    textPrimary: BrandColors.primary,
    textSecondary: NeutralColors.gray600,
    textMuted: NeutralColors.gray400,
    background: NeutralColors.gray50,
    reverseBackground: NeutralColors.gray900,
    surface: NeutralColors.white,
    surfacePrimary: BrandColors.primarySurface,
    surfaceMuted: NeutralColors.gray100,
    muted: NeutralColors.gray150,
    card: NeutralColors.white,
    cardElevated: NeutralColors.white,
    border: NeutralColors.gray200,
    borderStrong: NeutralColors.gray300,
    primaryBorder: BrandColors.primaryBorder,
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
    modalBackdrop: "rgba(17, 24, 39, 0.45)",
    white: NeutralColors.white,
  },
  dark: {
    brand: BrandColors.primary,
    primary: BrandColors.primary,
    primaryPressed: BrandColors.primaryPressed,
    primarySoft: "#211D45",
    secondary: BrandColors.secondary,
    accent: "#C084FC",
    ai: BrandColors.aiBlue,
    aiSurface: BrandColors.aiSurface,
    aiBorderColor: BrandColors.aiBorderColor,
    success: BrandColors.success,
    warning: "#FF8A3D",
    danger: "#FF5A67",
    text: "#F7F7FB",
    textPrimary: BrandColors.primaryText,
    textSecondary: NeutralColors.gray300,
    textMuted: "#7E8798",
    background: "#0B1020",
    reverseBackground: NeutralColors.gray50,
    surface: "#12182A",
    surfacePrimary: BrandColors.primaryOpacity15,
    surfaceMuted: "#1A2236",
    muted: "#1A2236",
    card: "#151D31",
    cardElevated: "#1B2540",
    border: "#273149",
    borderStrong: "#35405C",
    primaryBorder: BrandColors.primaryBorder,
    input: "#101729",
    inputBorder: "#35405C",
    tint: BrandColors.primary,
    icon: "#B7BDCB",
    tabBar: "#111827",
    tabIconDefault: NeutralColors.gray400,
    tabIconSelected: BrandColors.primaryText,
    shadow: BrandColors.primary,
    progressTrack: "#8E54EF",
    progressFill: "#7C67FF",
    chartGrid: "#202A40",
    aiCard: "#122747",
    successCard: "#0E2B1D",
    warningCard: "#331F0E",
    dangerCard: "#35151B",
    bottomBarSelectedWrapper: BrandColors.primaryOpacity15,
    modalBackdrop: "rgba(0, 0, 0, 0.68)",
    white: NeutralColors.white,
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
  return { fontSize, lineHeight, fontWeight };
}

export const typography = {
  // Display — for hero numbers, splash screen
  displayLarge: createFontStyle(40, 48, "800"),
  displayMedium: createFontStyle(32, 40, "800"),

  // Title — section headings, page titles
  titleLarge: createFontStyle(28, 34, "800"),
  titleMedium: createFontStyle(22, 28, "700"),
  titleSmall: createFontStyle(18, 24, "700"),

  // Body — main content, descriptions
  bodyLarge: createFontStyle(18, 24, "400"),
  bodyLargeMedium: createFontStyle(18, 24, "500"),
  bodyLargeSemibold: createFontStyle(18, 24, "600"),
  bodyMedium: createFontStyle(16, 24, "400"),
  bodyMediumMedium: createFontStyle(16, 24, "500"),
  bodyMediumSemibold: createFontStyle(16, 24, "600"),
  bodySmall: createFontStyle(14, 20, "400"),
  bodySmallMedium: createFontStyle(14, 20, "500"),
  bodySmallSemibold: createFontStyle(14, 20, "600"),

  // Label — tags, badges, button text, captions
  labelLarge: createFontStyle(16, 22, "700"),
  labelLargeMedium: createFontStyle(16, 22, "500"),
  labelMediumSemibold: createFontStyle(14, 20, "600"),
  labelMediumMedium: createFontStyle(14, 20, "500"),
  labelMediumSmall: createFontStyle(14, 20, "400"),
  labelSmall: createFontStyle(12, 16, "600"),
  labelSmallMedium: createFontStyle(12, 16, "500"),
  labelSmallRegular: createFontStyle(12, 16, "400"),

  // Caption — timestamps, hint text, footnotes
  caption: createFontStyle(11, 16, "400"),
  captionMedium: createFontStyle(11, 16, "500"),

  // Numeric — amounts, balances, prices (tabular figures)
  numericLarge: createFontStyle(28, 34, "700"),
  numericMedium: createFontStyle(22, 28, "600"),
  numericSmall: createFontStyle(16, 22, "600"),
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;

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
  xs: 12,
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

export const flexStyles = {
  rowStartStart: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  rowStartCenter: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rowStartBetween: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  rowCenterCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowCenterStart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rowCenterBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  columnStartCenter: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  columnCenterCenter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  columnCenterBetween: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
} satisfies Record<string, ViewStyle>;

export const shadows = {
  card: {
    shadowColor: NeutralColors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  button: {
    shadowColor: NeutralColors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  xs: {
    shadowColor: NeutralColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 0.08,
    elevation: 2,
  },
  sm: {
    shadowColor: NeutralColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: Platform.OS === "web" ? 6 : 3,
    elevation: 4,
  },
  lg: {
    shadowColor: NeutralColors.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
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
})!;

export type FontFamily = typeof Fonts;

export type Theme = {
  name: AppThemeName;
  isDark: boolean;
  colors: ThemeColors;
  fonts: typeof typography;
  fontFamily: FontFamily;
  spacing: typeof spacing;
  iconSizes: typeof iconSizes;
  borders: typeof borders;
  radii: typeof radii;
  shadows: typeof shadows;
  flex: typeof flexStyles;
};

function createTheme(name: AppThemeName): Theme {
  return {
    name,
    isDark: name === "dark",
    colors: Colors[name],
    fonts: typography,
    fontFamily: Fonts,
    spacing,
    borders,
    radii,
    shadows,
    iconSizes,
    flex: flexStyles,
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
  primaryCard: [
    BrandColors.primaryPressed,
    BrandColors.primary,
    BrandColors.accentPurple,
  ],
  darkPrimaryCard: ["#4C35D8", "#7B1FEA"],
} as const;
