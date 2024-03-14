import { createStore } from 'zustand/vanilla';

export type AppState = {
  currentStep: number; // Current step in the app
  preferences?: { [key: string]: string }; // User preferences
};

export type AppActions = {
  setCurrentStep: (step: number) => void;
  setPreferences: (preferences: { [key: string]: string }) => void;
};

export type AppStore = AppState & AppActions;

export const initAppStore = (): AppState => {
  return { currentStep: 0 };
};

export const defaultInitState: AppState = {
  currentStep: 0,
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()((set) => ({
    ...initState,
    setCurrentStep: (step: number) => set({ currentStep: step }),
    setPreferences: (preferences: { [key: string]: string }) =>
      set({ preferences }),
  }));
};
