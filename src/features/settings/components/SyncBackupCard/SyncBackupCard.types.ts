export type SyncStatus = "connected" | "disconnected" | "syncing";

export type SyncBackupCardProps = {
  status: SyncStatus;
  lastBackup: string; // "2 hours ago"
  onBackupNow: () => void;
  onSyncData: () => void;
  isBackingUp?: boolean;
  isSyncing?: boolean;
};
