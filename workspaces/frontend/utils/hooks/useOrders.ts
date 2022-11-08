import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api";

const useOrders = () => {
  const { data: orders, ...rest } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(),
  });

  return { orders, ...rest };
};

export default useOrders;
