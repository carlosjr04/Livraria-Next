import { create } from "zustand";

interface loggedStore {
  logged: boolean;
  loging: () => void;
  unloged: ()=> void;
}

const useloggedStore = create<loggedStore>((set) => ({
    logged: false,
    loging:  () => set((state) => ({ logged: !state.logged })),
    unloged: () => set(() => ({ logged: false }))
}));

export default useloggedStore;
