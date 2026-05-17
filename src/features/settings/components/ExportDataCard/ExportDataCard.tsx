import { ThemedText } from "@/src/shared/components/themed-text/ThemedText";
import { useTheme } from "@/src/shared/hooks/useThemeController";
import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
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
    <TouchableOpacity
      style={[styles.exportButton, isExporting && styles.exportButtonDisabled]}
      onPress={() => onPress(format)}
      disabled={isExporting}
      activeOpacity={0.7}
    >
      {isExporting ? (
        <ActivityIndicator size="small" color={theme.colors.primary} />
      ) : (
        <Feather name="file-text" size={28} color={theme.colors.icon} />
      )}
      <ThemedText type="bodySmallSemibold">{label}</ThemedText>
    </TouchableOpacity>
  ),
);

ExportButton.displayName = "ExportButton";

const ExportDataCard = React.memo(
  ({ onExport, isExporting = false }: ExportDataCardProps) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles({ theme }), [theme]);

    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Feather name="download" size={20} color={theme.colors.icon} />
          <ThemedText type="bodyMediumSemibold">Export Data</ThemedText>
        </View>

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

        <ThemedText type="bodySmall" colorVariant="textMuted">
          Export your expense data for backup or analysis in other tools.
        </ThemedText>
      </View>
    );
  },
);

ExportDataCard.displayName = "ExportDataCard";

export default ExportDataCard;
