import {create} from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";  

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  changeQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (product) => set((state) => {
                const existing = state.items.find(i => i.product.id === product.id);
                if (existing) {
                    return {
                        items: state.items.map((i) =>
                            i.product.id === product.id
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                        ),
                    }
                }
                return { items: [...state.items, { product, quantity: 1 }] }
            }),
            removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.product.id !== id) })),
            changeQuantity: (id, delta) =>
                set((state) => ({
                    items: state.items.map((i) => i.product.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta)} : i)
                        .filter((i) => i.quantity > 0),
                })),
            clearCart: () => set({ items: [] }),    
    }), 
    { name: "cart-storage" }
))

export const getTotalPrice = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

export const getTotalCount = (items: CartItem[]) =>
    items.reduce((sum, i) => sum + i.quantity, 0)   