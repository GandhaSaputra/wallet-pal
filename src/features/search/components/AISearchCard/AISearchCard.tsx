import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useMemo, useRef, useState } from "react";
import { Pressable, TextInput, TouchableOpacity, View } from "react-native";
import { createStyles } from "./AISearchCard.styles";
import { AISearchCardProps } from "./AISearchCard.types";

const DEFAULT_SUGGESTIONS = [
  '"Transport costs over $50"',
  '"All food purchases last week"',
  '"Credit card expenses today"',
];

const AISearchCard = React.memo(
  ({
    value,
    onChangeText,
    onSubmit,
    isProcessing = false,
    suggestions = DEFAULT_SUGGESTIONS,
    placeholder = "Show coffee expenses this month",
  }: AISearchCardProps) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const styles = useMemo(
      () => createStyles({ theme, isFocused }),
      [theme, isFocused],
    );
    const inputRef = useRef<TextInput>(null);
    const iconColor = isFocused ? theme.colors.ai : theme.colors.textMuted;

    const handleSuggestionPress = (suggestion: string) => {
      const stripped = suggestion.replace(/^"|"$/g, "");
      onChangeText(stripped);
      onSubmit(stripped);
      inputRef.current?.focus();
    };

    return (
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <Feather name="search" size={18} color={iconColor} />
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={() => onSubmit(value)}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textMuted}
            returnKeyType="search"
          />
          <Pressable onPress={() => onSubmit(value)} hitSlop={8}>
            <Ionicons
              name="sparkles-outline"
              size={theme.iconSizes.sm}
              color={iconColor}
            />
          </Pressable>
        </View>
        <View style={styles.suggestionsContainer}>
          <View style={styles.naturalLanguageRow}>
            <Ionicons
              name="sparkles-outline"
              size={theme.iconSizes.xs}
              color={theme.colors.ai}
            />
            <ThemedText type="bodySmall" colorVariant="textSecondary">
              Try natural language:
            </ThemedText>
          </View>
          {suggestions.map((suggestion) => (
            <TouchableOpacity
              key={suggestion}
              style={styles.suggestionChip}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <ThemedText type="labelSmallRegular" colorVariant="ai">
                {suggestion}
              </ThemedText>
            </TouchableOpacity>
          ))}
          {isProcessing && (
            <View style={styles.processingBadge}>
              <Ionicons
                name="sparkles-outline"
                size={theme.iconSizes.xs}
                color={theme.colors.ai}
              />
              <ThemedText type="labelSmallRegular" colorVariant="ai">
                AI Processing...
              </ThemedText>
            </View>
          )}
        </View>
      </View>
    );
  },
);

AISearchCard.displayName = "AISearchCard";

export default AISearchCard;
