import { Link } from "react-router-dom"
import type { Product } from "../types/product"
import { formatCurrency } from "../utils/currency"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.slug}`} className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square bg-pink-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23fce7f3'/%3E%3Ctext x='200' y='210' font-family='Arial' font-size='60' font-weight='bold' text-anchor='middle' fill='%23be185d'%3EPB%3C/text%3E%3C/svg%3E" }}
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-pink-500 font-medium uppercase tracking-wide">{product.category.name}</p>
        <h3 className="font-semibold text-gray-800 mt-1 group-hover:text-pink-600 transition-colors">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-pink-600 font-bold">{formatCurrency(product.price)}</span>
          <span className="text-xs text-gray-400">Stock: {product.stock}</span>
        </div>
      </div>
    </Link>
  )
}
