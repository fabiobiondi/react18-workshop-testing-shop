import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../../../core/config";
import { Product } from "../../../model/product";

export function useShop() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>(`${BASE_API}/products`)
      .then((res) => setProducts(res.data));
  }, []);

  return {
    products,
  };
}
