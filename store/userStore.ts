import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  hasFinishedOnboarding: boolean;
  toggleHadOnboarded: () => void;
};

export type Plant = {
  name: string;
  wateringFrequency: string;
};

type PlantStore = {
  plants: Plant[];
  addPlant: (plant: Plant) => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      hasFinishedOnboarding: false,
      toggleHadOnboarded: () =>
        set((state) => ({
          ...state,
          hasFinishedOnboarding: !state.hasFinishedOnboarding
        }))
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export const usePlantStore = create(
  persist<PlantStore>(
    (set) => ({
      plants: [],
      addPlant: (plant: Plant) =>
        set((state) => ({ plants: [...state.plants, plant] }))
    }),
    {
      name: "plant-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
