import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Image, TextInput, View } from "react-native";
import { createStyles } from "./ProfileCard.styles";
import { ProfileCardProps } from "./ProfileCard.types";

const getInitials = (name: string): string => {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};

const ProfileCard = React.memo(
  ({
    fullName,
    avatarUrl,
    monthlyBudget,
    onFullNameChange,
    onMonthlyBudgetChange,
  }: ProfileCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    const initials = useMemo(() => getInitials(fullName), [fullName]);

    const handleBudgetChange = (value: string) => {
      // Allow only numbers, single decimal point, and leading $
      const stripped = value.replace(/^\$/, "");
      const sanitized = stripped
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1");
      onMonthlyBudgetChange(sanitized);
    };

    const budgetDisplay = monthlyBudget ? `$${monthlyBudget}` : "";

    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Feather name="user" size={20} color={theme.colors.icon} />
          <ThemedText type="bodyMediumSemibold">Profile</ThemedText>
        </View>

        <View style={styles.content}>
          <View style={styles.avatarWrapper}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            ) : (
              <ThemedText type="titleMedium" colorVariant="white">
                {initials || "?"}
              </ThemedText>
            )}
          </View>

          <View style={styles.fields}>
            <View style={styles.fieldGroup}>
              <ThemedText type="labelSmallRegular" colorVariant="textSecondary">
                Full Name
              </ThemedText>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={onFullNameChange}
                placeholder="Enter your name"
                placeholderTextColor={theme.colors.textMuted}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            <View style={styles.fieldGroup}>
              <ThemedText type="labelSmallRegular" colorVariant="textSecondary">
                Monthly Budget
              </ThemedText>
              <TextInput
                style={styles.input}
                value={budgetDisplay}
                onChangeText={handleBudgetChange}
                placeholder="$0"
                placeholderTextColor={theme.colors.textMuted}
                keyboardType="decimal-pad"
                returnKeyType="done"
              />
            </View>
          </View>
        </View>
      </View>
    );
  },
);

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
