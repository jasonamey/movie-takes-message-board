import { create } from "zustand";

interface TagStore {
  selectedTag: string;
  onSelect: (tagName: string) => void;
}

export const useTag = create<TagStore>((set) => ({
  selectedTag: "All",
  onSelect: (tag) =>
    set((state) => {
      return {
        ...state,
        selectedTag: tag,
      };
    }),
}));
