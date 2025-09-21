import { create } from "zustand";

type UserStore = {
  hasFinishedOnboarding: boolean;
  toggleHadOnboarded: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  hasFinishedOnboarding: false,
  toggleHadOnboarded: () =>
    set((state) => ({
      ...state,
      hasFinishedOnboarding: !state.hasFinishedOnboarding,
    })),
}));
