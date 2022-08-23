import { CartItem } from "../../../model/cart-item";
import { ColorCircle } from "../../../shared/components/ColorCircle";

interface CartSummaryProductProps {
  cartItem: CartItem;
  remove: () => void;
  increment: () => void;
  decrement: () => void;
}

export default function CartSummaryProduct(
  { cartItem, decrement, increment, remove }: CartSummaryProductProps
) {
  return <li
    data-testid="cart-summary-product"
    className="flex py-6"
  >
    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <img
        alt={cartItem.product.name}
        src={cartItem.product.images[0]}
        className="h-full w-full object-cover object-center"
      />
    </div>

    <div className="ml-4 flex flex-1 flex-col">
      <div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3 data-testid="product-header">
            {cartItem.product.name}
            <span className="ml-2 text-sm text-gray-500" data-testid="product-size">
              ({cartItem.size})
            </span>
          </h3>
          <p className="ml-4">
            € {cartItem.product.price * cartItem.qty}
          </p>
        </div>

        <ColorCircle color={cartItem.color} />
      </div>
      <div className="flex flex-1 items-end justify-between text-sm">
        <div className="text-gray-500 flex gap-3">
          <button
            onClick={() => decrement()}
            className="border w-5 h-5 flex items-center justify-center cursor-pointer"
          >
            -
          </button>
          Qty {cartItem.qty}
          <button
            onClick={() => increment()}
            className="border w-5 h-5 flex items-center justify-center cursor-pointer"
          >
            +
          </button>
        </div>

        <div className="flex">
          <div
            className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
            onClick={() => remove()}
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  </li>
}
