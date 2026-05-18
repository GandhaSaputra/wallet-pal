import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { createStyles } from "./AddExpenseButton.styles";
import { AddExpenseButtonProps } from "./AddExpenseButton.types";

const AddExpenseButton = React.memo(
  ({
    onPress,
    label = "Add Expense",
    disabled = false,
  }: AddExpenseButtonProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.button, disabled ? styles.disabledButton : undefined]}
      >
        <ThemedText type="bodyLargeSemibold" style={styles.label}>
          {label}
        </ThemedText>
      </TouchableOpacity>
    );
  },
);

AddExpenseButton.displayName = "AddExpenseButton";

export default AddExpenseButton;
