import { act, renderHook } from "@testing-library/react";
import { mockProducts } from "../../../mocks";
import { useCart } from "./cart.store";

const product = mockProducts[0];
const color = product.colors[0];
const size = product.sizes[0];

describe("useCart", () => {
  const initialStoreState = useCart.getState();

  beforeEach(() => {
    useCart.setState(initialStoreState, true);
  });

  it("should be the list of the items empty", () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.items).toEqual([]);
  });

  it("should add the product to the cart using the action `addToCart`", () => {
    const { result } = renderHook(() => useCart());

    act(() => result.current.addToCart(product, color, size));

    expect(result.current.items).toEqual([
      {
        product,
        qty: 1,
        color,
        size,
      },
    ]);
  });

  it("should update only the quantity of the cart item when a product in the cart with same color and size is added twice", () => {
    const { result } = renderHook(() => useCart());

    act(() => result.current.addToCart(product, color, size));
    expect(result.current.items.length).toBe(1);
    act(() => result.current.addToCart(product, color, size));

    expect(result.current.items).toEqual([
      {
        product,
        qty: 2,
        color,
        size,
      },
    ]);
  });

  it("should return the correct total cost of the items in the cart", () => {
    const product2 = mockProducts[1];
    const { result } = renderHook(() => useCart());

    act(() => result.current.addToCart(product, color, size));
    act(() => result.current.addToCart(product, color, size));

    act(() => result.current.addToCart(product2, color, size));

    const totalCost = result.current.totalCost();

    expect(totalCost).toBe(product.price * 2 + product2.price);
  });

  it("should return the correct amount of item in the cart", () => {
    const product2 = mockProducts[1];
    const { result } = renderHook(() => useCart());

    act(() => result.current.addToCart(product, color, size));
    act(() => result.current.addToCart(product, color, size));
    act(() => result.current.addToCart(product, color, size));

    act(() => result.current.addToCart(product2, color, size));
    act(() => result.current.addToCart(product2, color, size));
    act(() => result.current.addToCart(product2, color, size));

    const totalItems = result.current.totalItems();

    expect(totalItems).toBe(6);
  });

  it("should remove the item from the cart", () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addToCart(product, color, size));
    act(() => result.current.addToCart(product, color, size));
    act(() => result.current.addToCart(product, color, size));
    const currentItem = result.current.items[0];

    expect(result.current.items.length).toBe(1);

    act(() => result.current.removeFromCart(currentItem));

    expect(result.current.items.length).toBe(0);
  });

  it('should clean the cart when the action "cleanCart" is called', () => {
    const product2 = mockProducts[1];
    const { result } = renderHook(() => useCart());
    act(() => result.current.addToCart(product, color, size));
    act(() => result.current.addToCart(product, color, size));
    act(() => result.current.addToCart(product2, color, size));

    expect(result.current.items.length).toBe(2);

    act(() => result.current.cleanCart());

    expect(result.current.items.length).toBe(0);
    expect(result.current.totalCost()).toBe(0);
  });

  it("should increment the quantity of an item already in the cart", () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addToCart(product, color, size));
    const currentItem = result.current.items[0];

    expect(result.current.items[0].qty).toBe(1);
    act(() => result.current.incQty(currentItem));

    expect(result.current.items[0].qty).toBe(2);
    expect(result.current.items.length).toBe(1);
  });

  describe("decQty", () => {
    it("should decrement the quantity of an item already in the cart", () => {
      const { result } = renderHook(() => useCart());
      act(() => result.current.addToCart(product, color, size));
      const currentItem = result.current.items[0];

      act(() => result.current.incQty(currentItem));
      act(() => result.current.incQty(currentItem));
      expect(result.current.items[0].qty).toBe(3);

      act(() => result.current.decQty(currentItem));

      expect(result.current.items[0].qty).toBe(2);
      expect(result.current.items.length).toBe(1);
    });

    it("should not decrement the quantity of an item if the quantity is 1", () => {
      const { result } = renderHook(() => useCart());
      act(() => result.current.addToCart(product, color, size));
      const currentItem = result.current.items[0];

      act(() => result.current.decQty(currentItem));

      expect(result.current.items[0].qty).toBe(1);
    });

    it("should decrement only the item that have the same key", () => {
      const product2 = mockProducts[1];
      const { result } = renderHook(() => useCart());
      act(() => result.current.addToCart(product, color, size));
      act(() => result.current.addToCart(product, color, size));
      act(() => result.current.addToCart(product2, color, size));
      act(() => result.current.addToCart(product2, color, size));
      const currentItem = result.current.items[0];

      act(() => result.current.decQty(currentItem));

      expect(result.current.items[0].qty).toBe(1);
      expect(result.current.items[1].qty).toBe(2);
    });
  });
});
