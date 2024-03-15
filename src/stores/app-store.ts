import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';
export type AppState = {
  currentStep: number; // Current step in the app
  preferences?: { [key: string]: string }; // User preferences
  formData?: { [key: string]: string }; // Form data
};

export type AppActions = {
  setCurrentStep: (step: number) => void;
  setPreferences: (preferences: { [key: string]: string }) => void;
  setFormData: (formData: { [key: string]: string }) => void;
};

export type AppStore = AppState & AppActions;

export const initAppStore = (): AppState => {
  return { currentStep: 0, formData: {} };
};

export const defaultInitState: AppState = {
  currentStep: 0,
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()(
    persist(
      (set) => ({
        ...initState,
        setCurrentStep: (step: number) => set({ currentStep: step }),
        setPreferences: (preferences: { [key: string]: string }) =>
          set({ preferences }),
        setFormData: (formData: { [key: string]: string }) =>
          set((state) => ({ ...state.formData, ...formData })),
      }),
      {
        name: 'app-store',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
};
