import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system/legacy";

export type PlantType = {
  id: string;
  name: string;
  wateringFrequency: string;
  isWateredAtTimestamp?: number;
  imageUri?: string;
};

type PlantsState = {
  nextId: number;
  plants: PlantType[];
  addPlant: (plant: PlantType, imageUri?: string) => void;
  removePlant: (id: string) => void;
  waterPlant: (id: string) => void;
  clearPlants: () => void;
};

export const usePlantStore = create(
  persist<PlantsState>(
    (set) => ({
      nextId: 1,
      plants: [],
      addPlant: async (plant, imageUri?: string) => {
        const savedImageUri =
          FileSystem.documentDirectory! +
          `${new Date().getTime()}-${imageUri?.split("/").slice(-1)[0]}`;
        if (savedImageUri) {
          await FileSystem.copyAsync({ from: imageUri, to: savedImageUri });
        }
        set((state) => ({
          nextId: state.nextId + 1,
          plants: [
            {
              ...plant,
              id: state.nextId.toString(),
              imageUri: imageUri ? savedImageUri : undefined
            },
            ...state.plants
          ]
        }));
      },

      removePlant: (id: string) =>
        set((state) => ({
          plants: state.plants.filter((plant) => plant.id !== id)
        })),
      waterPlant: (id: string) =>
        set((state) => ({
          plants: state.plants.map((plant) =>
            plant.id === id
              ? { ...plant, isWateredAtTimestamp: Date.now() }
              : plant
          )
        })),
      clearPlants: () => set({ plants: [], nextId: 0 })
    }),
    {
      name: "plant-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
