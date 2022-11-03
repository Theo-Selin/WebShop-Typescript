import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProduct as apiAddProduct,
  updateProductQuantity as apiUpdateProductQuantity,
  emptyCart as apiEmptyCart,
  fetchCart,
} from "../api";

const useCart = () => {
  const queryClient = useQueryClient();
  const { data: cart, ...rest } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(),
  });

  const addProduct = useMutation({
    mutationFn: (data: { productId: string; quantity: number }) =>
      apiAddProduct(data),
    onSuccess: (data, variables, context) => {
      console.log(data, variables, context);
      return queryClient.invalidateQueries(["cart"]);
    },
  });

  const updateProductQuantity = useMutation({
    mutationFn: (data: { productId: string; quantity: number }) =>
      apiUpdateProductQuantity(data),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const emptyCart = useMutation({
    mutationFn: () => apiEmptyCart(),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });
  return { cart, addProduct, updateProductQuantity, emptyCart, ...rest };
};

export default useCart;
