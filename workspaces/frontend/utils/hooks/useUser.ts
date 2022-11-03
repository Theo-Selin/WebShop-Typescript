import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api";

const useUser = () => {
  const { data: user, ...rest } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
  return { ...rest, user };
};

export default useUser;
