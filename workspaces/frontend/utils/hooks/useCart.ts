import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct as apiAddProduct, fetchCart } from "../api";

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
  return { cart, addProduct, ...rest };
};

export default useCart;
