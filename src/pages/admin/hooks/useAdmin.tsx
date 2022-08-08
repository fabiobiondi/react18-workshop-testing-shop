import { useEffect, useState } from "react";
import { Order } from "../../../model/order";
import { httpClient } from "../../../shared/utils/http.utils";

export function useAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders();
  }, []);

  function getOrders() {
    httpClient.get<Order[]>(`/660/orders`).then((res) => {
      setOrders(res);
    });
  }

  function toggleStatus(order: Order) {
    httpClient
      .patch<Order>(
        `/660/orders/${order.id}`,
        { status: order.status === "pending" ? "shipped" : "pending" },
      )
      .then((res) => {
        setOrders(
          orders.map((o) => {
            return o.id === order.id ? res : o;
          })
        );
      });
  }

  function deleteOrder(id: number) {
    httpClient
      .delete(`/660/orders/${id}`)
      .then(() => {
        setOrders(
          orders.filter((o) => {
            return o.id !== id;
          })
        );
      });
  }

  return {
    orders,
    actions: {
      getOrders,
      toggleStatus,
      deleteOrder,
    },
  };
}
