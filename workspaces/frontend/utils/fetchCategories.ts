import axios from "axios"

axios.defaults.baseURL = process.env.BACKEND_URL || "http://localhost:4000";

export const fetchCategories = async () => {
  const response = await axios.get<Category[]>("/categories")
  const categories: Category[] = response.data
  return categories
}