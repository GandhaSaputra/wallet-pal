import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import React, { useMemo, useState } from "react";
import { TextInput, View } from "react-native";
import { createStyles } from "./NotesInputCard.styles";
import { NotesInputCardProps } from "./NotesInputCard.types";

const NotesInputCard = React.memo(
  ({
    value,
    onChangeText,
    placeholder = "Weekly grocery shopping...",
  }: NotesInputCardProps) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const styles = useMemo(
      () => createStyles({ theme, isFocused }),
      [theme, isFocused],
    );

    return (
      <View style={styles.wrapper}>
        <ThemedText type="bodyMediumSemibold" style={styles.label}>
          Notes (Optional)
        </ThemedText>
        <TextInput
          multiline
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
        />
      </View>
    );
  },
);

NotesInputCard.displayName = "NotesInputCard";

export default NotesInputCard;
