import axios from "axios";

axios.defaults.baseURL = process.env.BACKEND_URL || "http://localhost:4000";

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

type Credentials = {
  email: string;
  password: string;
};

export const logIn = async (credentials: Credentials) => {
  try {
    const response = await axios.post<{ access_token: string }>(
      `/auth/login`,
      credentials
    );
    const { access_token: token } = response.data;
    localStorage.setItem("webshop-jwt", token);
    return token;
  } catch (error) {
    return undefined;
  }
};
