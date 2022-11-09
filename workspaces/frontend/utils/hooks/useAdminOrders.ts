import { useQuery } from "@tanstack/react-query";
import { fetchCarts as apiFetchCarts } from "../api";

const useAdminOrders = () => {
  const { data: orders, ...rest } = useQuery({
    queryFn: apiFetchCarts,
    queryKey: ["adminOrders"],
  });

  return { orders, ...rest };
};

export default useAdminOrders;
