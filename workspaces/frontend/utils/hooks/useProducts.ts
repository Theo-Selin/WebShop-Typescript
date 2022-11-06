import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct as apiCreateProduct,
  CreateProductParams,
  fetchProducts,
} from "../api";

const useProducts = (search: string = "") => {
  const queryClient = useQueryClient();

  const { data: products, ...rest } = useQuery({
    queryKey: ["products", search],
    queryFn: () => fetchProducts(search),
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
