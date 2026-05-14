import { Theme } from "@/src/constants/theme";
import ScanReceiptCard from "@/src/features/ai/components/ScanReceiptCard";
import AmountInput from "@/src/shared/components/amount-input/AmountInput";
import Spacer from "@/src/shared/components/spacer/Spacer";
import { ThemedView } from "@/src/shared/components/themed-view/ThemedView";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { useMemo, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(
    () => createStyles({ theme, insets }),
    [theme, insets],
  );

  const [amount, setAmount] = useState("");

  const handleScanReceipt = () => {
    // TODO: integrate camera / AI OCR
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <ScanReceiptCard onScan={handleScanReceipt} />
        <Spacer height={theme.spacing.xl} />
        <AmountInput value={amount} onChangeText={setAmount} required />
      </KeyboardAwareScrollView>
    </ThemedView>
  );
}

const createStyles = ({
  theme,
  insets,
}: {
  theme: Theme;
  insets: EdgeInsets;
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      flex: 1,
      paddingTop: Platform.select({
        android: insets.top + theme.spacing.xl,
        ios: insets.top + theme.spacing.sm,
        web: theme.spacing.default,
      }),
    },
    contentContainer: {
      paddingHorizontal: theme.spacing.default,
    },
  });
