import { create } from "zustand";
import { useBudgetStore } from "../budget/budget.store";
import { CustomCategory } from "./components/CustomCategoriesCard";
import { ExportFormat } from "./components/ExportDataCard";
import { PreferencesState } from "./components/PreferencesCard";
import {
  SettingsSnapshot,
  UserProfile,
  addCategory as addCategoryService,
  backupNow as backupNowService,
  deleteCategory as deleteCategoryService,
  exportData as exportDataService,
  fetchSettings,
  getInitialSettings,
  syncData as syncDataService,
  updateCategory as updateCategoryService,
  updatePreferences as updatePreferencesService,
  updateProfile as updateProfileService,
} from "./settings.service";

type AsyncStatus = "idle" | "loading" | "success" | "error";
type SettingsOperation = "export" | "backup" | "sync";

type SettingsStore = SettingsSnapshot & {
  status: AsyncStatus;
  error: string | null;
  operations: Record<SettingsOperation, AsyncStatus>;
  fetchSettings: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  updatePreference: (
    key: keyof PreferencesState,
    value: PreferencesState[keyof PreferencesState],
  ) => Promise<void>;
  addCategory: (
    data: Omit<CustomCategory, "id" | "transactionCount">,
  ) => Promise<void>;
  updateCategory: (category: CustomCategory) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  exportData: (format: ExportFormat) => Promise<boolean>;
  backupNow: () => Promise<boolean>;
  syncData: () => Promise<boolean>;
  resetError: () => void;
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

const initialSettings = getInitialSettings();
const idleOperations: Record<SettingsOperation, AsyncStatus> = {
  backup: "idle",
  export: "idle",
  sync: "idle",
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  ...initialSettings,
  status: "success",
  error: null,
  operations: idleOperations,
  fetchSettings: async () => {
    set({ status: "loading", error: null });

    try {
      const settings = await fetchSettings();
      set({ ...settings, status: "success" });
    } catch (error) {
      set({ error: getErrorMessage(error), status: "error" });
    }
  },
  updateProfile: async (profile) => {
    try {
      const nextProfile = await updateProfileService(profile);
      set({ profile: nextProfile });

      if (profile.monthlyBudget !== undefined) {
        const monthlyBudget = Number(profile.monthlyBudget);

        if (profile.monthlyBudget.trim() && !Number.isNaN(monthlyBudget)) {
          await useBudgetStore.getState().updateBudget({ monthlyBudget });
        }
      }
    } catch (error) {
      set({ error: getErrorMessage(error) });
    }
  },
  updatePreference: async (key, value) => {
    try {
      const preferences = await updatePreferencesService({ [key]: value });
      set({ preferences });
    } catch (error) {
      set({ error: getErrorMessage(error) });
    }
  },
  addCategory: async (data) => {
    try {
      const category = await addCategoryService(data);
      set((state) => ({ categories: [...state.categories, category] }));
    } catch (error) {
      set({ error: getErrorMessage(error) });
    }
  },
  updateCategory: async (category) => {
    try {
      const updatedCategory = await updateCategoryService(category);
      set((state) => ({
        categories: state.categories.map((currentCategory) =>
          currentCategory.id === updatedCategory.id
            ? updatedCategory
            : currentCategory,
        ),
      }));
    } catch (error) {
      set({ error: getErrorMessage(error) });
    }
  },
  deleteCategory: async (id) => {
    try {
      await deleteCategoryService(id);
      set((state) => ({
        categories: state.categories.filter((category) => category.id !== id),
      }));
    } catch (error) {
      set({ error: getErrorMessage(error) });
    }
  },
  exportData: async (format) => {
    set((state) => ({
      operations: { ...state.operations, export: "loading" },
    }));

    try {
      await exportDataService(format);
      set((state) => ({
        operations: { ...state.operations, export: "success" },
      }));
      return true;
    } catch (error) {
      set((state) => ({
        error: getErrorMessage(error),
        operations: { ...state.operations, export: "error" },
      }));
      return false;
    }
  },
  backupNow: async () => {
    set((state) => ({
      operations: { ...state.operations, backup: "loading" },
    }));

    try {
      const syncBackup = await backupNowService();
      set((state) => ({
        operations: { ...state.operations, backup: "success" },
        syncBackup,
      }));
      return true;
    } catch (error) {
      set((state) => ({
        error: getErrorMessage(error),
        operations: { ...state.operations, backup: "error" },
      }));
      return false;
    }
  },
  syncData: async () => {
    set((state) => ({
      operations: { ...state.operations, sync: "loading" },
      syncBackup: { ...state.syncBackup, status: "syncing" },
    }));

    try {
      const syncBackup = await syncDataService();
      set((state) => ({
        operations: { ...state.operations, sync: "success" },
        syncBackup,
      }));
      return true;
    } catch (error) {
      set((state) => ({
        error: getErrorMessage(error),
        operations: { ...state.operations, sync: "error" },
        syncBackup: { ...get().syncBackup, status: "connected" },
      }));
      return false;
    }
  },
  resetError: () => set({ error: null }),
}));
