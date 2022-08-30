import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { mockProducts } from "../../../../mocks";
import { useCartSummary } from "../../store/cart-summary.store";
import { useCart } from "../../store/cart.store";
import { ExtractState } from "../../store/store.utils";
import CartSummaryPanel from "./CartSummaryPanel";

jest.mock("../../store/cart-summary.store");
jest.mock("../../store/cart.store");

describe("CartSummaryPanel", () => {
  let mockedUseCartSummary = useCartSummary as unknown as jest.MockedFunction<
    typeof useCartSummary
  >;
  let mockedUseCartSummaryInstance: Pick<
    jest.Mocked<ExtractState<typeof useCartSummary>>,
    "closeCartSummary" | "isOpen"
  >;
  let mockedUseCart = useCart as unknown as jest.MockedFunction<typeof useCart>;
  let mockedUseCartInstance: Pick<
    jest.Mocked<ExtractState<typeof useCart>>,
    "items" | "removeFromCart" | "incQty" | "decQty" | "totalCost"
  >;

  beforeEach(() => {
    mockedUseCartSummaryInstance = {
      closeCartSummary: jest.fn(),
      isOpen: false,
    };
    mockedUseCartSummary.mockReturnValue(mockedUseCartSummaryInstance);

    mockedUseCartInstance = {
      items: [],
      removeFromCart: jest.fn(),
      incQty: jest.fn(),
      decQty: jest.fn(),
      totalCost: jest.fn(),
    };
    mockedUseCart.mockReturnValue(mockedUseCartInstance);
  });

  it("should be not visible at startup", async () => {
    render(<CartSummaryPanel />);

    return expect(screen.findByTestId("cart-summary")).rejects.toThrow();
  });

  describe("panel open", () => {
    beforeEach(() => {
      mockedUseCartSummaryInstance.isOpen = true;
    });

    it("should be visible when the isOpen flag is true", async () => {
      render(<CartSummaryPanel />, { wrapper: BrowserRouter });

      return expect(
        screen.findByTestId("cart-summary")
      ).resolves.toBeInTheDocument();
    });

    it('should call the event to close the panel when the user click the button with text "Close panel"', async () => {
      render(<CartSummaryPanel />, { wrapper: BrowserRouter });

      userEvent.click(await screen.findByText("Close panel"));

      expect(
        mockedUseCartSummaryInstance.closeCartSummary.mock.calls.length
      ).toBe(1);
    });

    describe("CartItems", () => {
      const product1 = mockProducts[0];
      const product2 = mockProducts[1];

      beforeEach(() => {
        mockedUseCartInstance.items = [
          {
            product: product1,
            qty: 1,
            color: product1.colors[0],
            size: product1.sizes[0],
          },
          {
            product: product2,
            qty: 3,
            color: product2.colors[0],
            size: product2.sizes[0],
          },
        ];
      });

      it("should render the items in the cart", async () => {
        render(<CartSummaryPanel />, { wrapper: BrowserRouter });

        const cartItems = await screen.findAllByTestId("cart-summary-product");

        expect(cartItems.length).toBe(2);
      });
    });
  });
});
