import create from 'zustand'

interface CartSummaryState {
  isOpen: boolean;
  openCartSummary: () => void;
  closeCartSummary: () => void;
}


export const useCartSummary = create<CartSummaryState>((set) => ({
  isOpen: false,
  openCartSummary: () => set({ isOpen: true }),
  closeCartSummary: () => set({ isOpen: false }),
}));
