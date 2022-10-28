import axios from "axios"

axios.defaults.baseURL = process.env.BACKEND_URL || "http://localhost:4000";

// Access blocked by CORS
export const fetchCart = async () => {
  const response = await axios.get<Cart>("/carts")
  const cart: Cart = response.data
  return cart
}