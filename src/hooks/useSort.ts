import { create } from "zustand";

interface FilterStore {
  selectedFilter: string;
  selectFilter: (selection: string) => void;
}

const useSort = create<FilterStore>((set) => ({
  selectedFilter: "",
  selectFilter: (selection: string) => set({ selectedFilter: selection }),
}));

export default useSort;
