import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct as apiCreateProduct,
  CreateProductParams,
  fetchProducts,
} from "../api";

const useProducts = () => {
  const queryClient = useQueryClient();

  const { data: products, ...rest } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const createProduct = useMutation({
    mutationFn: (product: CreateProductParams) => apiCreateProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return { products, createProduct, ...rest };
};

export default useProducts;
