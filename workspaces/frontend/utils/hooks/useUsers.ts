import { useMutation } from "@tanstack/react-query";
import { createUser as apiCreateUser, CreateUserParams } from "../api";

const useUsers = () => {
  const createUser = useMutation({
    mutationFn: (userDetails: CreateUserParams) => apiCreateUser(userDetails),
    onSuccess: () => {},
  });

  return { createUser };
};

export default useUsers;
