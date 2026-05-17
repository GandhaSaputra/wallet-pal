export type ExportFormat = "csv" | "pdf";

export type ExportDataCardProps = {
  onExport: (format: ExportFormat) => void;
  isExporting?: boolean;
};
