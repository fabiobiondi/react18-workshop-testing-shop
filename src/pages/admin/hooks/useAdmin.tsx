import {useEffect, useState} from "react";
import {Order} from "../../../model/order";
import axios from "axios";
import {BASE_API} from "../../../core/config";
import {getItemFromLocalStorage} from "../../../shared/utils/localstorage.utils";

export function useAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders();
  }, []);

  function getOrders() {
    axios.get<Order[]>(`${BASE_API}/660/orders`)
      .then(res => {
        setOrders(res.data)
      })
  }

  function toggleStatus(order: Order) {
    axios.patch<Order>(
      `${BASE_API}/660/orders/${order.id}`,
      { status: order.status === 'pending' ? 'shipped' : 'pending' },
      {
        /*headers: {
          Authorization: 'Bearer ' + getItemFromLocalStorage('token')
        }*/
      }
    )
      .then(res => {
        setOrders(orders.map(o => {
          return o.id === order.id ? res.data : o
        }))
      })
  }

  function deleteOrder(id: number) {
    axios.delete(`${BASE_API}/660/orders/${id}`, {
      /*headers: {
        Authorization: 'Bearer ' + getItemFromLocalStorage('token')
      }*/
    })
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
