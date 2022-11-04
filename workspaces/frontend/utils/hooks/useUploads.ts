import { useMutation } from "@tanstack/react-query";
import {
  addUpload as apiAddUpload,
  removeUpload as apiRemoveUpload,
} from "../api";

export const useUploads = () => {
  const addUpload = useMutation({
    mutationFn: apiAddUpload,
  });

  const removeUpload = useMutation({
    mutationFn: apiRemoveUpload,
  });

  return { addUpload, removeUpload };
};
