import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import React, { useMemo, useState } from "react";
import { TextInput, View } from "react-native";
import { createStyles } from "./AmountInput.styles";
import { AmountInputProps } from "./AmountInput.types";

const AmountInput = React.memo(
  ({
    value,
    onChangeText,
    currencySymbol = "$",
    label = "Amount",
    required = false,
    placeholder = "0",
  }: AmountInputProps) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const styles = useMemo(
      () => createStyles({ theme, isFocused }),
      [theme, isFocused],
    );

    const handleChangeText = (text: string) => {
      // Allow only numbers and single decimal point
      const sanitized = text.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
      onChangeText(sanitized);
    };

    return (
      <View style={styles.wrapper}>
        <ThemedText type="bodyMediumSemibold" style={styles.label}>
          {label}
          {required && (
            <ThemedText type="bodyMediumSemibold" colorVariant="danger">
              {" *"}
            </ThemedText>
          )}
        </ThemedText>

        <View style={styles.inputContainer}>
          <ThemedText type="titleSmall" style={styles.currencySymbol}>
            {currencySymbol}
          </ThemedText>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={handleChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType="decimal-pad"
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textMuted}
          />
        </View>
      </View>
    );
  },
);

AmountInput.displayName = "AmountInput";

export default AmountInput;
