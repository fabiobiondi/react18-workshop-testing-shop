import { Order } from "../../../src/model/order";

export const ordersListMock: Order[] = [
  {
    id: 1,
    client: {
      id: 1,
      first_name: "John",
      last_name: "Biondi",
      email: "john@biondi.com",
      country: "Italy",
      street: "Via Bianchi 123",
      city: "Verdagno",
      state_prov: "RM",
      zip: "12345",
      notification_email: false,
      notification_sms: true,
    },
    items: [
      {
        productId: 1,
        color: "Black",
        size: "XS",
        qty: 1,
      },
      {
        productId: 1,
        color: "black",
        size: "S",
        qty: 2,
      },
      {
        productId: 2,
        color: "white",
        size: "XXS",
        qty: 1,
      },
    ],
    totalCost: 125,
    totalItems: 4,
    status: "pending",
  },
  {
    client: {
      id: 123,
      first_name: "Math",
      last_name: "Verdi",
      email: "3",
      country: "4",
      street: "5",
      city: "6",
      state_prov: "7",
      zip: "8",
      notification_email: false,
      notification_sms: true,
    },
    totalCost: 95,
    totalItems: 4,
    status: "shipped",
    items: [
      {
        productId: 2,
        color: "white",
        size: "XS",
        qty: 2,
      },
      {
        productId: 2,
        color: "lightblue",
        size: "XS",
        qty: 1,
      },
      {
        productId: 1,
        color: "purple",
        size: "M",
        qty: 1,
      },
    ],
    id: 2,
  },
];
