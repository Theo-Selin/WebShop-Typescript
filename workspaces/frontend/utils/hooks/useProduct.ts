import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api";

const useProduct = (productId: string) => {
  const { data: product, ...rest } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
  });

  return { product, ...rest };
};

export default useProduct;
