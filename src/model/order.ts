export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  street: string;
  city: string;
  state_prov: string;
  zip: string;
  notification_email: boolean;
  notification_sms: boolean;
}

export interface Product {
  productId: number;
  color: string;
  size: string;
  qty: number;
}

export interface Order {
  id: number;
  status: 'pending' | 'shipped'
  client: Client;
  products: Product[];
  totalCost: number;
  totalItems: number;
}

