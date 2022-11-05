import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateCategoryParams,
  fetchCategory,
  updateCategory as apiUpdateCategory,
} from "../api";

const useCategory = (categoryId: string) => {
  const queryClient = useQueryClient();

  const { data: category, ...rest } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategory(categoryId),
  });

  const updateCategory = useMutation({
    mutationFn: (data: CreateCategoryParams) =>
      apiUpdateCategory(categoryId, data),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });
  return { updateCategory, category, ...rest };
};

export default useCategory;
