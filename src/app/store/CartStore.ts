import { create } from "zustand";
import { livro } from "../types/types";

interface CartStore {
  cart: livro[];
  addToCart: (item: livro) => void;
  removeFromCart: (id: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id: number) =>
    set((state) => {
      const newCart = [...state.cart];
      const index = newCart.findIndex((item) => item.id === id);
      if (index !== -1) {
        newCart.splice(index, 1);
      }

      return { cart: newCart };
    }),
}));

export default useCartStore;
