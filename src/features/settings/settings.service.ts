import { MOCK_CATEGORIES } from "@/src/mocks/settings";
import { CustomCategory } from "./components/CustomCategoriesCard";
import { PreferencesState } from "./components/PreferencesCard";
import { ExportFormat } from "./components/ExportDataCard";

export type UserProfile = {
  fullName: string;
  monthlyBudget: string;
};

export type SyncBackupState = {
  status: "connected" | "disconnected" | "syncing";
  lastBackup: string;
};

export type SettingsSnapshot = {
  categories: CustomCategory[];
  preferences: PreferencesState;
  profile: UserProfile;
  syncBackup: SyncBackupState;
};

let settings: SettingsSnapshot = {
  categories: MOCK_CATEGORIES,
  preferences: {
    budgetAlerts: true,
    darkMode: false,
    pushNotifications: true,
  },
  profile: {
    fullName: "Sarah Anderson",
    monthlyBudget: "3500",
  },
  syncBackup: {
    lastBackup: "2 hours ago",
    status: "connected",
  },
};

const createId = () =>
  `category-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function getInitialSettings() {
  return settings;
}

export async function fetchSettings() {
  return settings;
}

export async function updateProfile(profile: Partial<UserProfile>) {
  settings = {
    ...settings,
    profile: {
      ...settings.profile,
      ...profile,
    },
  };

  return settings.profile;
}

export async function updatePreferences(preferences: Partial<PreferencesState>) {
  settings = {
    ...settings,
    preferences: {
      ...settings.preferences,
      ...preferences,
    },
  };

  return settings.preferences;
}

export async function addCategory(
  data: Omit<CustomCategory, "id" | "transactionCount">,
) {
  const category: CustomCategory = {
    ...data,
    id: createId(),
    transactionCount: 0,
  };

  settings = {
    ...settings,
    categories: [...settings.categories, category],
  };

  return category;
}

export async function updateCategory(category: CustomCategory) {
  settings = {
    ...settings,
    categories: settings.categories.map((currentCategory) =>
      currentCategory.id === category.id ? category : currentCategory,
    ),
  };

  return category;
}

export async function deleteCategory(id: string) {
  settings = {
    ...settings,
    categories: settings.categories.filter((category) => category.id !== id),
  };
}

export async function exportData(format: ExportFormat) {
  return { format };
}

export async function backupNow() {
  settings = {
    ...settings,
    syncBackup: {
      ...settings.syncBackup,
      lastBackup: "Just now",
      status: "connected",
    },
  };

  return settings.syncBackup;
}

export async function syncData() {
  settings = {
    ...settings,
    syncBackup: {
      ...settings.syncBackup,
      status: "connected",
    },
  };

  return settings.syncBackup;
}
