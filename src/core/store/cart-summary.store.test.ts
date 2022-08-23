import { act, renderHook } from "@testing-library/react";
import { useCartSummary } from "./cart-summary.store";

describe("CartSummaryStore", () => {
  const initialStoreState = useCartSummary.getState();

  beforeEach(() => {
    useCartSummary.setState(initialStoreState, true);
  });

  it("should be 'isOpen' equals to false on init", () => {
    const { result } = renderHook(() => useCartSummary());

    expect(result.current.isOpen).toBe(false);
  });

  it("should be 'isOpen' equals to true after event 'openCartSummary'", () => {
    const { result } = renderHook(() => useCartSummary());

    act(() => result.current.openCartSummary());

    expect(result.current.isOpen).toBe(true);
  });

  it("should be 'isOpen' equals to false after the sequence 'openCartSummary' 'closeCartSummary'", () => {
    const { result } = renderHook(() => useCartSummary());

    act(() => result.current.openCartSummary());

    expect(result.current.isOpen).toBe(true);

    act(() => result.current.closeCartSummary());

    expect(result.current.isOpen).toBe(false);
  });
});
