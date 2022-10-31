import axios from "axios";

axios.defaults.baseURL = process.env.BACKEND_URL || "http://localhost:4000";

export const fetchUserInfo = async () => {
  const response = await axios.get<User>(`/users/635e6c3883516bd8c183e4aa`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlcml0QGJlcml0LmNvbSIsInN1YiI6IjYzNWU2YzM4ODM1MTZiZDhjMTgzZTRhYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NzIxODUzNSwiZXhwIjoxNjY3MjIyMTM1fQ.HP9XlapuE-47HuldqGnCEw3xhkN0AhQb66Wt7DaMkdg",
    },
  });
  const user: User = response.data;
  return user;
};
