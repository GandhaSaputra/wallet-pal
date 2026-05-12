import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  ColorSchemeName,
  useColorScheme as useNativeColorScheme,
} from "react-native";

import { AppThemes, Theme } from "@/src/constants/theme";

export type AppColorScheme = "light" | "dark";
export type ThemePreference = AppColorScheme | "system";

type ThemeControllerValue = {
  colorScheme: AppColorScheme;
  preference: ThemePreference;
  theme: Theme;
  setThemePreference: (preference: ThemePreference) => void;
  toggleTheme: () => void;
};

const ThemeControllerContext = createContext<ThemeControllerValue | null>(null);

function resolveColorScheme(
  preference: ThemePreference,
  nativeColorScheme: ColorSchemeName,
): AppColorScheme {
  if (preference === "system") {
    return nativeColorScheme === "dark" ? "dark" : "light";
  }

  return preference;
}

export function ThemeControllerProvider({ children }: PropsWithChildren) {
  const nativeColorScheme = useNativeColorScheme();
  const [preference, setThemePreference] = useState<ThemePreference>("light");
  const colorScheme = resolveColorScheme(preference, nativeColorScheme);
  const theme = AppThemes[colorScheme];

  const value = useMemo(
    () => ({
      colorScheme,
      preference,
      theme,
      setThemePreference,
      toggleTheme: () => {
        setThemePreference(colorScheme === "dark" ? "light" : "dark");
      },
    }),
    [colorScheme, preference, theme],
  );

  return (
    <ThemeControllerContext.Provider value={value}>
      {children}
    </ThemeControllerContext.Provider>
  );
}

export function useThemeController() {
  const context = useContext(ThemeControllerContext);

  if (!context) {
    throw new Error("useThemeController must be used inside ThemeControllerProvider");
  }

  return context;
}

export function useTheme() {
  return useThemeController().theme;
}

export function useResolvedColorScheme(): AppColorScheme {
  const context = useContext(ThemeControllerContext);
  const nativeColorScheme = useNativeColorScheme();

  if (context) {
    return context.colorScheme;
  }

  return nativeColorScheme === "dark" ? "dark" : "light";
}
