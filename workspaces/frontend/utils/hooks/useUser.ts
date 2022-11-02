import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../fetchUserInfo";

const useUser = () => {
  const { data: user, ...rest } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserInfo,
  });
  return { ...rest, user };
};

export default useUser;
