import axios from "axios";

axios.defaults.baseURL = process.env.BACKEND_URL || "http://localhost:4000";

export const fetchProducts = async () => {
  const response = await axios.get<Product[]>("/products");
  const products: Product[] = response.data;
  return products;
};
