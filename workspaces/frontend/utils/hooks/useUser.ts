import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchUser,
  updateUser as apiUpdateUser,
  UpdateUserParams,
} from "../api";

const useUser = () => {
  const queryClient = useQueryClient();

  const { data: user, ...rest } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const updateUser = useMutation({
    mutationFn: (userDetails: UpdateUserParams) => apiUpdateUser(userDetails),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
  return { user, updateUser, ...rest };
};

export default useUser;
