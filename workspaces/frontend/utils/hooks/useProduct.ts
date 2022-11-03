import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchProduct,
  updateProduct as apiUpdateProduct,
  UpdateProductParams,
} from "../api";

const useProduct = (productId: string) => {
  const queryClient = useQueryClient();

  const { data: product, ...rest } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
  });

  const updateProduct = useMutation({
    mutationFn: (productPartial: UpdateProductParams) =>
      apiUpdateProduct(productId, productPartial),
    onSuccess: () => queryClient.invalidateQueries(["product", productId]),
  });

  return { product, updateProduct, ...rest };
};

export default useProduct;
