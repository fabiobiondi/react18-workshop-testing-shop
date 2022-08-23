import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../model/product";
import { httpClient } from "../../../shared/utils/http.utils";

export function useProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      httpClient
        .get<Product>(`/products/${+id}`)
        .then(res => setProduct(res))
        .catch(() => navigate("/shop"));
    }
  }, [id, navigate]);

  return {
    product,
  };
}
