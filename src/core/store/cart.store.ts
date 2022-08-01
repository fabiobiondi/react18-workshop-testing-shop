import create from 'zustand'
import {CartItem} from "../../model/cart-item";
import {Product} from "../../model/product";
import {useCartSummary} from "./cart-summary.store";

interface CartStore {
  items: CartItem[];
  totalCost: () => number;
  totalItems: () => number;
  cleanCart: () => void;
  addToCart: (product: Product, color: string, size: string) => void;
  removeFromCart: (cartItem: CartItem) => void;
  incQty: (cartItem: CartItem) => void;
  decQty: (cartItem: CartItem) => void;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  totalCost: () => get().items.reduce((acc, item) => {
    return acc + (item.product.price * item.qty)
  }, 0),
  totalItems: () => get().items.reduce((acc, item) => {
    return acc + item.qty
  }, 0),
  cleanCart: () => set(() => ({items: []})),
  addToCart: (product: Product, color: string, size: string) => {
    // check if items (id + color + size) has been already added
    const cartItemFound = get().items.find(item =>
      item.product.id === product.id &&
      item.color === color &&
      item.size === size
    );

    // the product is already in cart
    if (cartItemFound) {
      // increment qty
      get().incQty(cartItemFound);
    } else {
      // add product to cart with qty = 1
      set(s => ({ items: [...s.items, { product, qty: 1, color, size} ] }))
    }
    // open cart summary
    useCartSummary.getState().openCartSummary()
  },
  removeFromCart: (cartItem: CartItem) => {
    set(s => ({ items: s.items.filter(
        item => !(item.product.id === cartItem.product.id &&
          item.color === cartItem.color &&
          item.size === cartItem.size)
      )}))

  },
  incQty: (cartItem: CartItem) => {

    set(s => ({ items: s.items.map(item => {
      const productToIncrement = item.product.id === cartItem.product.id &&
        item.color === cartItem.color &&
        item.size === cartItem.size;

      return productToIncrement ? {...item, qty: ++item.qty } : item;
      })
    }))
  },
  decQty: (cartItem: CartItem) => {
    if (cartItem.qty > 1) {
      set(s => ({
        items: s.items.map(item => {
          const productToDecrement = item.product.id === cartItem.product.id &&
            item.color === cartItem.color &&
            item.size === cartItem.size;

          return productToDecrement ? {...item, qty: --item.qty} : item;
        })
      }))
    }
  }
}));
