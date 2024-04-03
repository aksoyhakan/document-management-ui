import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  token: undefined,
  name: undefined,
};

const useGlobal = create(
  persist(
    (set) => ({
      ...initialState,
      setToken: (newToken) => set({ token: newToken }),
      setName: (newName) => set({ name: newName }),
      reset: () => set(initialState),
    }),
    {
      name: "global-state",
    }
  )
);

export default useGlobal;
