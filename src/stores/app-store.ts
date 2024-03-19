import { RGBColor } from 'react-color';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import { IllustratorGenerateResponse } from '@/lib/service';
export type AppState = {
  currentStep: number; // Current step in the app
  preferences?: { colors: RGBColor[] }; // User preferences
  formData?: IllustratorGenerateResponse | null;
};

export type AppActions = {
  setCurrentStep: (step: number) => void;
  setPreferences: (preferences: { colors: RGBColor[] }) => void;
  setFormData: (formData: IllustratorGenerateResponse | null) => void;
};

export type AppStore = AppState & AppActions;

export const initAppStore = (): AppState => {
  return {
    currentStep: 0,
    formData: { image_url: '', model_latency_ms: 0, id: '' },
  };
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
        setPreferences: (preferences: { colors: RGBColor[] }) =>
          set({ preferences }),
        setFormData: (formData: IllustratorGenerateResponse | null) =>
          set({ formData }),
      }),
      {
        name: 'app-store',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );
};
