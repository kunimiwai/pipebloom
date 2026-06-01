export interface ProductColor {
  id: number
  productId: number
  colorName: string
}

export interface Product {
  id: number
  categoryId: number
  name: string
  slug: string
  description: string
  price: number
  stock: number
  imageUrl: string
  material: string | null
  size: string | null
  category: Category
  colors: ProductColor[]
  createdAt: string
}

export interface Category {
  id: number
  name: string
  slug: string
  _count?: { products: number }
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}
