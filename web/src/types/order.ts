export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "COMPLETED" | "CANCELLED"

export interface OrderItem {
  id: number
  orderId: number
  productId: number
  quantity: number
  price: number
  product: {
    id: number
    name: string
    imageUrl: string
  }
}

export interface Order {
  id: number
  customerName: string
  customerPhone: string
  customerAddress: string
  notes: string | null
  totalPrice: number
  status: OrderStatus
  items: OrderItem[]
  createdAt: string
}

export interface CreateOrderRequest {
  customerName: string
  customerPhone: string
  customerAddress: string
  notes?: string
  items: { productId: number; quantity: number }[]
}
