import api from "./api"
import type { Product, PaginatedResponse } from "../types/product"

export const productService = {
  getAll: async (params?: Record<string, string | number | undefined>) => {
    const res = await api.get<PaginatedResponse<Product>>("/products", { params })
    return res.data
  },
  getBySlug: async (slug: string) => {
    const res = await api.get<Product>(`/products/slug/${slug}`)
    return res.data
  },
  getById: async (id: number) => {
    const res = await api.get<Product>(`/products/${id}`)
    return res.data
  },
  create: async (data: FormData | Record<string, unknown>) => {
    const res = await api.post<Product>("/products", data)
    return res.data
  },
  update: async (id: number, data: FormData | Record<string, unknown>) => {
    const res = await api.put<Product>(`/products/${id}`, data)
    return res.data
  },
  delete: async (id: number) => {
    await api.delete(`/products/${id}`)
  },
}
