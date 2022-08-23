import { useEffect, useState } from "react";
import { Product } from "../../../model/product";
import { httpClient } from "../../../shared/utils/http.utils";

export function useShop() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    httpClient.get<Product[]>(`/products`).then(res => setProducts(res));
  }, []);

  return {
    products,
  };
}
