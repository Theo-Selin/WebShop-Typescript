import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateCategoryParams,
  fetchCategories,
  createCategory as apiCreateCategory,
} from "../api";

const useCategories = () => {
  const queryClient = useQueryClient();
  const { data: categories, ...rest } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const createCategory = useMutation({
    mutationFn: (data: CreateCategoryParams) => apiCreateCategory(data),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  return { categories, createCategory, ...rest };
};

export default useCategories;
