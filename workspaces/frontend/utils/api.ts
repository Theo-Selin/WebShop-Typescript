import { useMutation } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = process.env.BACKEND_URL || "http://localhost:4000";

export const fetchCategories = async () => {
  const response = await axios.get<Category[]>("/categories");
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axios.get<Product[]>("/products");
  return response.data;
};

export const fetchUserInfo = async () => {
  const token = localStorage.getItem("webshop-jwt");
  if (!token) {
    return null;
  }

  const response = await axios.get<User>(`/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const addToCart = async () => {
  const token = localStorage.getItem("webshop-jwt");
  if (!token) {
    return null;
  }
};

export const logIn = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post<{ access_token: string }>(
      `/auth/login`,
      credentials
    );
    const { access_token: token } = response.data;
    localStorage.setItem("webshop-jwt", token);
    return token;
  } catch (error) {
    return null;
  }
};
