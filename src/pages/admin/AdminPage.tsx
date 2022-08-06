import clsx from "clsx";
import {
  ArrowCircleRightIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { useAdmin } from "./hooks/useAdmin";
import DropDown from "../../shared/components/DropDown";
import { DialogConfirm } from "../../shared/components/DialogConfirm";
import { useState } from "react";
import { Order } from "../../model/order";

export default function AdminPage() {
  const { orders, actions } = useAdmin();
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4"
      aria-label="Top"
    >
      <DialogConfirm
        show={!!orderToDelete}
        title="Delete Order"
        description="Are you sure to delete this order?"
        cancelLabel="Cancel"
        confirmLabel="Confirm"
        onCancel={() => setOrderToDelete(null)}
        onConfirm={() => {
          actions.deleteOrder(orderToDelete!.id);
          setOrderToDelete(null);
        }}
        icon={<TrashIcon />}
      />
      <div className="flex flex-col">
        <div className="-my-2  sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow  border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Client
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order Info
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody
                  data-testid="order-list"
                  className="bg-white divide-y divide-gray-200"
                >
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/*<div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={order.image} alt="" />
                        </div>*/}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {order.client.first_name +
                                " " +
                                order.client.last_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.client.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          € {order.totalCost} ({order.totalItems} items)
                        </div>
                        <div className="text-sm text-gray-500">Date: TODO</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={clsx(
                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                            {
                              "bg-green-100 text-green-800":
                                order.status === "shipped",
                            },
                            {
                              "bg-red-100 text-red-800":
                                order.status === "pending",
                            }
                          )}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropDown
                          defaultLabel="Actions"
                          items={[
                            {
                              label: "Toggle Status",
                              action: () => actions.toggleStatus(order),
                              Icon: () => (
                                <PencilAltIcon className="dropdown-icon" />
                              ),
                            },
                            {
                              label: "Delete",
                              action: () => setOrderToDelete(order),
                              Icon: () => (
                                <TrashIcon className="dropdown-icon" />
                              ),
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
