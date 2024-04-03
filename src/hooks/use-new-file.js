import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  file: null,
  parentFolderId: null,
};

const useNewFile = create(
  persist(
    (set) => ({
      ...initialState,
      setParentFolderId: (newParentFolderId) =>
        set({ parentFolderId: newParentFolderId }),
      setFile: (newFile) => set({ file: newFile }),
      reset: () => set(initialState),
    }),
    {
      name: "new-file",
    }
  )
);

export default useNewFile;
