import { useColorScheme } from "@/src/shared/hooks/useColorScheme";
import { ThemeControllerProvider } from "@/src/shared/hooks/useThemeController";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootNavigator() {
  const colorScheme = useColorScheme();

  return (
    <NavigationThemeProvider
      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeControllerProvider>
        <BottomSheetModalProvider>
          <KeyboardProvider>
            <RootNavigator />
          </KeyboardProvider>
        </BottomSheetModalProvider>
      </ThemeControllerProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
