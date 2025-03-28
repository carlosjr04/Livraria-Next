import { create } from "zustand";

interface ValidStore {
  valid: boolean;
  validPress: () => void;
  
}

const useValidStore = create<ValidStore>((set) => ({
valid: false,
validPress:  () => set((state) => ({ valid: !state.valid })),
  
}));

export default useValidStore;
