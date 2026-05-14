import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import {
  useTheme,
  useThemeController,
} from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ScanReceiptCardProps } from "./ScanReceiptCard.types";

const ScanReceiptCard = React.memo(({ onScan }: ScanReceiptCardProps) => {
  const { theme, colorScheme } = useThemeController();
  const styles = useMemo(() => createStyles({ theme }), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Feather
          name="camera"
          size={theme.iconSizes.lg}
          color={
            colorScheme === "dark"
              ? theme.colors.primaryBorder
              : theme.colors.primary
          }
        />
      </View>
      <ThemedText type="bodyLargeSemibold" textAlign="center">
        Scan Receipt
      </ThemedText>
      <ThemedText
        type="bodySmall"
        colorVariant="textSecondary"
        textAlign="center"
      >
        Use AI to automatically extract expense details
      </ThemedText>
      <TouchableOpacity
        style={styles.button}
        onPress={onScan}
        activeOpacity={0.7}
      >
        <Feather
          name="camera"
          size={theme.iconSizes.sm}
          color={theme.colors.primary}
        />
        <ThemedText type="bodySmallSemibold" style={styles.buttonText}>
          Scan Receipt
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
});

ScanReceiptCard.displayName = "ScanReceiptCard";

export default ScanReceiptCard;

const createStyles = ({ theme }: { theme: ReturnType<typeof useTheme> }) =>
  StyleSheet.create({
    container: {
      borderWidth: 1.5,
      borderColor: theme.colors.primaryBorder,
      borderStyle: "dashed",
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.primarySoft,
      padding: theme.spacing.xl,
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    iconWrapper: {
      width: 68,
      height: 68,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.surfacePrimary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: theme.spacing.xs,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderWidth: 1.5,
      borderColor: theme.colors.primary,
      borderRadius: theme.radii.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      width: "100%",
    },
    buttonText: {
      color: theme.colors.primary,
    },
  });
