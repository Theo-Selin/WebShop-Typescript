import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProduct as apiAddProduct,
  updateProductQuantity as apiUpdateProductQuantity,
  checkoutOrder as apiCheckoutOrder,
  emptyCart as apiEmptyCart,
  fetchCart,
  CheckoutOrderParams,
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
    onSuccess: () => {
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

  const checkoutOrder = useMutation({
    mutationFn: (checkoutAddress?: CheckoutOrderParams) =>
      apiCheckoutOrder(checkoutAddress),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["cart"]);
    },
  });

  return {
    cart,
    addProduct,
    updateProductQuantity,
    emptyCart,
    checkoutOrder,
    ...rest,
  };
};

export default useCart;
