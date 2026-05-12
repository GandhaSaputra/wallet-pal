import { StyleSheet } from "react-native";

import { Theme } from "@/src/constants/theme";
import HomeHeader from "@/src/shared/components/header/HomeHeader";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";

export default function HomeScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <ThemedView style={styles.container}>
      <HomeHeader />
    </ThemedView>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.default,
    },
  });
