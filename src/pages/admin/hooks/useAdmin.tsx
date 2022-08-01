import {useEffect, useState} from "react";
import {Order} from "../../../model/order";
import axios from "axios";
import {BASE_API} from "../../../core/config";

export function useAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders();
  }, []);

  function getOrders() {
    axios.get<Order[]>(`${BASE_API}/orders`)
      .then(res => {
        setOrders(res.data)
      })
  }

  function toggleStatus(order: Order) {
    axios.patch<Order>(`${BASE_API}/orders/${order.id}`, {
      status: order.status === 'pending' ? 'shipped' : 'pending'
    })
      .then(res => {
        setOrders(orders.map(o => {
          return o.id === order.id ? res.data : o
        }))
      })
  }

  function deleteOrder(id: number) {
    axios.delete(`${BASE_API}/orders/${id}`)
      .then(() => {
        setOrders(orders.filter(o => {
          return o.id !== id
        }))
      })
  }

  return {
    orders,
    actions: {
      getOrders,
      toggleStatus,
      deleteOrder
    }
  }
}
