import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartStatus as apiUpdateCartStatus } from "../api";

const useAdminOrder = (orderId: string) => {
  const queryClient = useQueryClient();

  const updateAdminOrder = useMutation({
    mutationFn: (status: string) => apiUpdateCartStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminOrders"]);
    },
  });

  return { updateAdminOrder };
};

export default useAdminOrder;
