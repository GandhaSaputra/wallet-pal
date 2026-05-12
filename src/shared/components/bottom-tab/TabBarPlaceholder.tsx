import { StyleSheet, Text, View } from "react-native";

import { Theme } from "@/src/constants/theme";
import { useTheme } from "@/src/shared/hooks/useThemeController";

type TabPlaceholderProps = {
  title: string;
};

export function TabPlaceholder({ title }: TabPlaceholderProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing.xl,
      backgroundColor: theme.colors.background,
    },
    title: {
      ...theme.fonts.titleLarge,
      color: theme.colors.text,
    },
  });
