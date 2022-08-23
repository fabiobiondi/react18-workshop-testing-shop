import { Link } from "react-router-dom";

interface CartSummaryFooterProps {
  totalCost: number;
  cartItemsTotal: number;
  closeCart: () => void;
}

export default function CartSummaryFooter(
  { totalCost, cartItemsTotal, closeCart }: CartSummaryFooterProps
) {
  return <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
    <div className="flex justify-between text-base font-medium text-gray-900">
      <p>Subtotal</p>
      <p>€ {totalCost}</p>
    </div>
    <p className="mt-0.5 text-sm text-gray-500">
      Shipping and taxes calculated at checkout.
    </p>
    <div className="mt-6">
      <Link
        to="/checkout"
        className="flex items-center justify-center"
      >
        <button
          className="w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
          disabled={!cartItemsTotal}
          onClick={() => closeCart()}
        >
          Checkout
        </button>
      </Link>
    </div>
    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
      <p>
        or{" "}
        <button
          type="button"
          className="font-medium text-indigo-600 hover:text-indigo-500"
          onClick={() => closeCart()}
        >
          Continue Shopping
          <span aria-hidden="true"> &rarr;</span>
        </button>
      </p>
    </div>
  </div>
}
