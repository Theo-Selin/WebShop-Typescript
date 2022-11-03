import axios from "axios";

axios.defaults.baseURL = process.env.BACKEND_URL || "http://localhost:4000";

export const fetchCategories = async () => {
  const response = await axios.get<Category[]>("/categories");
  return response.data;
};

export type CreateCategoryParams = {
  name: string;
};

export const createCategory = async (category: CreateCategoryParams) => {
  const token = localStorage.getItem("webshop-jwt");
  if (!token) {
    return null;
  }

  const response = await axios.post<Category>("/categories", category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const fetchProducts = async () => {
  const response = await axios.get<Product[]>("/products");
  return response.data;
};

export const fetchProduct = async (productId: string) => {
  const response = await axios.get<Product>(`/products/${productId}`);
  return response.data;
};

export type CreateProductParams = {
  name: string;
  description: string;
  weight: number;
  price: number;
  manufacturer: string;
  images: string[];
};

export const createProduct = async (product: CreateProductParams) => {
  const token = localStorage.getItem("webshop-jwt");
  if (!token) {
    return null;
  }

  const response = await axios.post("/products", product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export type UpdateProductParams = Partial<CreateProductParams>;

export const updateProduct = async (
  id: string,
  product: UpdateProductParams
) => {
  const token = localStorage.getItem("webshop-jwt");
  if (!token) {
    return null;
  }

  const response = await axios.patch(`/products/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

export const fetchCart = async () => {
  const token = localStorage.getItem("webshop-jwt");
  if (!token) {
    return null;
  }

  const response = await axios.get<Cart>(`/carts/active`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const addProduct = async (data: {
  productId: string;
  quantity: number;
}) => {
  const token = localStorage.getItem("webshop-jwt");
  if (!token) {
    return null;
  }

  const response = await axios.patch(`/carts/active/add-product`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProductQuantity = async (data: {
  productId: string;
  quantity: number;
}) => {
  const token = localStorage.getItem("webshop-jwt");
  if (!token) {
    return null;
  }

  const response = await axios.patch(`/carts/active/update-quantity`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const emptyCart = async () => {
  const token = localStorage.getItem("webshop-jwt");
  if (!token) {
    return null;
  }

  const response = await axios.patch(
    `/carts/active/empty`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
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
