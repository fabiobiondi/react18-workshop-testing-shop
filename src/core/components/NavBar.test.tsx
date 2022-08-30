import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { useCartSummary } from "../store/cart-summary.store";
import { useCart } from "../store/cart.store";
import { ExtractState } from "../store/store.utils";
import NavBar from "./NavBar";

jest.mock("../store/cart.store");
jest.mock("../store/cart-summary.store");

describe("NavBar", () => {
  let mockedUseCart = useCart as unknown as jest.MockedFunction<typeof useCart>;
  let mockedUseCartInstance: Pick<
    jest.Mocked<ExtractState<typeof useCart>>,
    "totalItems"
  >;

  let mockedUseCartSummary = useCartSummary as unknown as jest.MockedFunction<
    typeof useCartSummary
  >;

  beforeEach(() => {
    mockedUseCartInstance = {
      totalItems: jest.fn(),
    };
    mockedUseCart.mockReturnValue(mockedUseCartInstance);
  });

  test("should created", async () => {
    render(<NavBar />, { wrapper: BrowserRouter });

    return expect(screen.findByTestId("navbar")).resolves.toBeInTheDocument();
  });

  test("should show the total items in the cart", async () => {
    mockedUseCartInstance.totalItems.mockReturnValue(2);

    render(<NavBar />, { wrapper: BrowserRouter });

    return expect(screen.findByText("Cart (2)")).resolves.toBeInTheDocument();
  });

  test("should open the cart summary when user click the cart element", async () => {
    const mockedOpenCartSummary = jest.fn();
    mockedUseCartSummary.mockReturnValue(mockedOpenCartSummary);

    render(<NavBar />, { wrapper: BrowserRouter });

    userEvent.click(await screen.findByTestId("cart-summary"));

    return expect(mockedOpenCartSummary.mock.calls.length).toBe(1);
  });
});
