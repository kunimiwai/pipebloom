import api from "./api"
import type { Category } from "../types/product"

export const categoryService = {
  getAll: async () => {
    const res = await api.get<Category[]>("/categories")
    return res.data
  },
  create: async (name: string) => {
    const res = await api.post<Category>("/categories", { name })
    return res.data
  },
  update: async (id: number, name: string) => {
    const res = await api.put<Category>(`/categories/${id}`, { name })
    return res.data
  },
  delete: async (id: number) => {
    await api.delete(`/categories/${id}`)
  },
}
