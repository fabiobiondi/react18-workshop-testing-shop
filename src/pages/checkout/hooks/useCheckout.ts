import { useState } from "react";
import { useCart } from "../../../core/store/cart.store";
import { Client, Order } from "../../../model/order";
import { httpClient } from "../../../shared/utils/http.utils";

export function useCheckout() {
  const { totalCost, totalItems, items, cleanCart } = useCart();
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  function sendOrder(client: Omit<Client, "id">) {
    setError(false);
    setError(true);

    return httpClient
      .post<Order>(`/orders`, {
        date: Date.now(),
        client,
        status: "pending",
        totalCost: totalCost(),
        totalItems: totalItems(),

        items: items.map(item => {
          return {
            productId: item.product.id,
            color: item.color,
            size: item.size,
            qty: item.qty,
          };
        }),
      })
      .then(() => cleanCart())
      .catch(() => setError(true))
      .finally(() => {
        setError(false);
        setPending(false);
      });
  }

  return {
    sendOrder,
    error,
    pending,
  };
}
