import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CartSummaryFooter from "./CartSummaryFooter";

describe("CartSummaryFooter", () => {
  let props: Parameters<typeof CartSummaryFooter>[0];

  beforeEach(() => {
    props = {
      totalCost: 10,
      cartItemsTotal: 3,
      closeCart: jest.fn(),
    };
  });

  test("should match the snapshot", () => {
    render(<CartSummaryFooter {...props} />, { wrapper: BrowserRouter });

    expect(screen).toMatchSnapshot();
  });

  test("should render the right cost", () => {
    render(<CartSummaryFooter {...props} />, { wrapper: BrowserRouter });

    expect(screen.getByText("€ 10")).toBeInTheDocument();
  });

  test("should enable the Checkout button when the items totals is grater than ZERO", () => {
    render(<CartSummaryFooter {...props} />, { wrapper: BrowserRouter });

    expect(screen.getByText("Checkout")).not.toHaveAttribute("disabled");
  });

  test("should disable the Checkout button when the items totals is ZERO", () => {
    props.cartItemsTotal = 0;
    render(<CartSummaryFooter {...props} />, { wrapper: BrowserRouter });

    expect(screen.getByText("Checkout")).toHaveAttribute("disabled");
  });

  test("should call the closeCart event when the user click the button 'Continue Shopping'", () => {
    render(<CartSummaryFooter {...props} />, { wrapper: BrowserRouter });

    userEvent.click(screen.getByText('Continue Shopping'));

    expect(props.closeCart).toHaveBeenCalled();
  });

  test("should call the closeCart event when the user click the button 'Checkout'", () => {
    render(<CartSummaryFooter {...props} />, { wrapper: BrowserRouter });

    userEvent.click(screen.getByText('Checkout'));

    expect(props.closeCart).toHaveBeenCalled();
  });
});
