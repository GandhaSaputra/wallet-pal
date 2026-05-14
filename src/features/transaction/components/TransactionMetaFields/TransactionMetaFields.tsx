import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createStyles } from "./TransactionMetaFields.styles";
import { TransactionMetaFieldsProps } from "./TransactionMetaFields.types";

const TransactionMetaFields = React.memo(
  ({
    dateLabel,
    paymentLabel,
    paymentIcon = "💳",
    onPressDate,
    onPressPayment,
  }: TransactionMetaFieldsProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View style={styles.row}>
        <View style={styles.card}>
          <ThemedText type="labelMediumMedium" colorVariant="text">
            Date
          </ThemedText>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={onPressDate}
            style={styles.valueBox}
          >
            <ThemedText type="labelMediumMedium" style={styles.valueText}>
              {dateLabel}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <ThemedText type="labelMediumMedium" colorVariant="text">
            Payment
          </ThemedText>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={onPressPayment}
            style={styles.valueBox}
          >
            <Text style={styles.paymentIcon}>{paymentIcon}</Text>
            <ThemedText type="labelMediumMedium" style={styles.valueText}>
              {paymentLabel}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

TransactionMetaFields.displayName = "TransactionMetaFields";

export default TransactionMetaFields;
