import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { createStyles } from "./ExportDataCard.styles";
import { ExportDataCardProps, ExportFormat } from "./ExportDataCard.types";

type ExportButtonProps = {
  label: string;
  format: ExportFormat;
  onPress: (format: ExportFormat) => void;
  isExporting: boolean;
  styles: ReturnType<typeof createStyles>;
  theme: ReturnType<typeof useTheme>;
};

const ExportButton = React.memo(
  ({
    label,
    format,
    onPress,
    isExporting,
    styles,
    theme,
  }: ExportButtonProps) => (
    <Pressable
      style={({ pressed }) => [
        styles.exportButton,
        pressed && styles.exportButtonPressed,
        isExporting && styles.exportButtonDisabled,
      ]}
      onPress={() => onPress(format)}
      disabled={isExporting}
    >
      {isExporting ? (
        <ActivityIndicator size="small" color={theme.colors.primary} />
      ) : (
        <Feather name="file-text" size={28} color={theme.colors.icon} />
      )}
      <ThemedText type="bodySmallSemibold">{label}</ThemedText>
    </Pressable>
  ),
);

ExportButton.displayName = "ExportButton";

const ExportDataCard = React.memo(
  ({ onExport, isExporting = false }: ExportDataCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View style={styles.container}>
        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Feather name="download" size={20} color={theme.colors.icon} />
          <ThemedText type="bodyMediumSemibold">Export Data</ThemedText>
        </View>

        {/* Export buttons */}
        <View style={styles.exportButtons}>
          <ExportButton
            label="Export CSV"
            format="csv"
            onPress={onExport}
            isExporting={isExporting}
            styles={styles}
            theme={theme}
          />
          <ExportButton
            label="Export PDF"
            format="pdf"
            onPress={onExport}
            isExporting={isExporting}
            styles={styles}
            theme={theme}
          />
        </View>

        {/* Description */}
        <ThemedText type="bodySmall" colorVariant="textMuted">
          Export your expense data for backup or analysis in other tools.
        </ThemedText>
      </View>
    );
  },
);

ExportDataCard.displayName = "ExportDataCard";

export default ExportDataCard;
