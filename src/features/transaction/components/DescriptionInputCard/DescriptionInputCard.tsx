import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { createStyles } from "./DescriptionInputCard.styles";
import { DescriptionInputCardProps } from "./DescriptionInputCard.types";

const DescriptionInputCard = React.memo(
  ({
    value,
    onChangeText,
    suggestion,
    onApplySuggestion,
    required = false,
  }: DescriptionInputCardProps) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const styles = useMemo(
      () => createStyles({ theme, isFocused }),
      [theme, isFocused],
    );

    return (
      <View style={styles.wrapper}>
        <ThemedText type="bodyMediumSemibold" style={styles.label}>
          Description
          {required && (
            <ThemedText type="bodyMediumSemibold" colorVariant="danger">
              {" *"}
            </ThemedText>
          )}
        </ThemedText>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder="What did you spend on?"
          placeholderTextColor={theme.colors.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {suggestion && (
          <View style={styles.suggestionCard}>
            <View style={styles.suggestionHeader}>
              <View style={styles.suggestionIconWrapper}>
                <Ionicons
                  name="sparkles-outline"
                  size={theme.iconSizes.md}
                  color={theme.colors.ai}
                />
              </View>
              <ThemedText type="labelMediumSemibold" colorVariant="aiWhite">
                AI Suggestion
              </ThemedText>
            </View>

            <ThemedText type="labelMediumMedium" colorVariant="aiWhite">
              {suggestion}
            </ThemedText>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={onApplySuggestion}
              style={styles.suggestionButton}
            >
              <ThemedText
                type="labelMediumMedium"
                style={styles.suggestionButtonText}
              >
                ⚡ Apply Suggestion
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  },
);

DescriptionInputCard.displayName = "DescriptionInputCard";

export default DescriptionInputCard;
