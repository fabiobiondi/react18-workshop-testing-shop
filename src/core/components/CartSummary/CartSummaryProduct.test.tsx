import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockProducts } from "../../../../mocks";
import CartSummaryProduct from "./CartSummaryProduct";


describe('CartSummaryProduct', () => {

  let props: Parameters<typeof CartSummaryProduct>[0];
  const product = mockProducts[0];

  beforeEach(() => {
    props = {
      cartItem: {
        product: product,
        qty: 1,
        size: product.sizes[0],
        color: product.colors[0],
      },
      decrement: jest.fn(),
      increment: jest.fn(),
      remove: jest.fn(),
    }
  });

  test('should set the product name to the alternative text of the image', () => {
    render(<CartSummaryProduct {...props} />);

    // TODO: this test is weak
    expect(screen.getByAltText("Basic Tee")).toBeInTheDocument();
  });

  test('should render the first image of the product as image in the box', () => {
    render(<CartSummaryProduct {...props} />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', product.images[0]);
  });

  test('should render product name as header', () => {
    render(<CartSummaryProduct {...props} />);

    const header = screen.getByTestId('product-header')
    expect(header).toHaveTextContent(product.name);
  })

  test('should render the size of the product in the header', () => {
    render(<CartSummaryProduct {...props} />);

    const size = screen.getByTestId('product-size')
    expect(size).toHaveTextContent(props.cartItem.size);
  })

  test('should render the price', () => {
    render(<CartSummaryProduct {...props} />);

    const element = screen.getByTestId('cart-summary-product')
    const price = within(element).getByText(`€ ${product.price * props.cartItem.qty}`)
    expect(price).toBeInTheDocument();
  })

  test('should render the quantity in the picker', () => {
    render(<CartSummaryProduct {...props} />);

    const element = screen.getByTestId('cart-summary-product')
    const quantity = within(element).getByText(`Qty ${props.cartItem.qty}`)
    expect(quantity).toBeInTheDocument();
  })

  test('should call the decrement event when user click the decrement button', () => {
    render(<CartSummaryProduct {...props} />);
    const element = screen.getByTestId('cart-summary-product')
    const button = within(element).getByText(`-`)

    userEvent.click(button);

    expect(props.decrement).toHaveBeenCalled();
  })

  test('should call the increment event when user click the decrement button', () => {
    render(<CartSummaryProduct {...props} />);
    const element = screen.getByTestId('cart-summary-product')
    const button = within(element).getByText(`+`)

    userEvent.click(button);

    expect(props.increment).toHaveBeenCalled();
  })

  test('should call the remove event when user click the remove button', () => {
    render(<CartSummaryProduct {...props} />);
    const element = screen.getByTestId('cart-summary-product')
    const button = within(element).getByText(`Remove`)

    userEvent.click(button);

    expect(props.remove).toHaveBeenCalled();
  })

});