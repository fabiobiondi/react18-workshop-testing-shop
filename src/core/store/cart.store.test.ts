import { act, renderHook } from "@testing-library/react";
import { mockProducts } from "../../mocks/products";
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
});
