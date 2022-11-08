import axios from "axios";
import { apiCall, apiCallAuth } from "./apiHelpers";

export const fetchCategories = async () =>
  apiCall<Category[]>("get", "/categories");

export type CreateCategoryParams = {
  name: string;
};
export const createCategory = async (data: CreateCategoryParams) =>
  apiCallAuth<Category, CreateCategoryParams>("post", "/categories", data);

export type UpdateCategoryParams = {
  name: string;
};

export const fetchCategory = async (categoryId: string) =>
  apiCall<Category>("get", `/categories/${categoryId}`);

export const updateCategory = async (
  categoryId: string,
  data: CreateCategoryParams
) =>
  apiCallAuth<Category, UpdateCategoryParams>(
    "patch",
    `/categories/${categoryId}`,
    data
  );

export const fetchProducts = async (search: string = "") =>
  apiCall<Product[]>("get", `/products${search ? `?search=${search}` : ""}`);

export const fetchProduct = async (productId: string) =>
  apiCall<Product>("get", `/products/${productId}`);

export type CreateProductParams = {
  name: string;
  description: string;
  weight: number;
  price: number;
  manufacturer: string;
  images: string[];
};

export const createProduct = async (product: CreateProductParams) =>
  apiCallAuth<Product, CreateProductParams>("post", "/products", product);

export type UpdateProductParams = Partial<CreateProductParams>;
export const updateProduct = async (
  productId: string,
  product: UpdateProductParams
) =>
  apiCallAuth<Product, UpdateProductParams>(
    "patch",
    `/products/${productId}`,
    product
  );

export const fetchUser = async () => <User>apiCallAuth("get", "/users/me");

export type CreateUserParams = {
  fullName: string;
  email: string;
  password: string;
};

export const createUser = async (userDetails: CreateUserParams) =>
  apiCall<User>("post", "/users", userDetails);

export type UpdateUserParams = {
  fullName: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: Address;
};

export const updateUser = async (userDetails: UpdateUserParams) =>
  apiCallAuth<User>("patch", "/users/me", userDetails);

export const fetchCart = async () => apiCallAuth<Cart>("get", "/carts/active");

export const fetchOrders = async () =>
  apiCallAuth<Cart[]>("get", "/carts/checked-out");

type ProductQuantity = {
  productId: string;
  quantity: number;
};

export const addProduct = async (data: ProductQuantity) =>
  apiCallAuth<Cart, ProductQuantity>(
    "patch",
    "/carts/active/add-product",
    data
  );

export const updateProductQuantity = async (data: ProductQuantity) =>
  apiCallAuth<Cart, ProductQuantity>(
    "patch",
    "/carts/active/update-quantity",
    data
  );

export const emptyCart = async () =>
  apiCallAuth<Cart>("patch", "/carts/active/empty");

export const checkoutOrder = async (address?: Address) =>
  apiCallAuth<User, Address>("post", "/users/checkout", address);

export const addUpload = async (formData: FormData) =>
  apiCallAuth<Upload[] | Upload, FormData>("post", "/uploads", formData);

export const removeUpload = async (uploadId: string) =>
  apiCallAuth<Upload>("delete", `/uploads/${uploadId}`);

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
