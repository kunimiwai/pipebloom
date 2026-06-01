import api from "./api"
import type { Order, PaginatedResponse, CreateOrderRequest, OrderStatus } from "../types/order"

export const orderService = {
  create: async (data: CreateOrderRequest) => {
    const res = await api.post<Order>("/orders", data)
    return res.data
  },
  getAll: async (params?: Record<string, string | number | undefined>) => {
    const res = await api.get<PaginatedResponse<Order>>("/orders", { params })
    return res.data
  },
  getById: async (id: number) => {
    const res = await api.get<Order>(`/orders/${id}`)
    return res.data
  },
  updateStatus: async (id: number, status: OrderStatus) => {
    const res = await api.patch<Order>(`/orders/${id}/status`, { status })
    return res.data
  },
}
