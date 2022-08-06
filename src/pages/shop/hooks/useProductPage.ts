import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../../../core/config";
import { Product } from "../../../model/product";

export function useProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`${BASE_API}/products/${+id}`)
        .then((res) => setProduct(res.data))
        .catch(() => navigate("/shop"));
    }
  }, [id, navigate]);

  return {
    product,
  };
}
