import { useEffect, useState } from "react"
import api from "../services/api"
import { formatCurrency } from "../utils/currency"
import { formatStatus, statusColor } from "../utils/formatter"
import type { Order } from "../types/order"

interface BestSeller {
  product: { id: number; name: string; price: number; imageUrl: string; category: { name: string } }
  totalSold: number
}

export default function AdminReports() {
  const [bestSellers, setBestSellers] = useState<BestSeller[]>([])
  const [latestOrders, setLatestOrders] = useState<Order[]>([])

  useEffect(() => {
    api.get("/dashboard/best-seller").then((r) => setBestSellers(r.data))
    api.get("/orders?limit=10").then((r) => setLatestOrders(r.data.data))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports</h1>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="font-semibold text-gray-800">Best Seller Products</h2>
          </div>
          <div className="p-6">
            {bestSellers.length > 0 ? (
              <div className="space-y-4">
                {bestSellers.map((item, i) => (
                  <div key={item.product.id} className="flex items-center gap-4">
                    <span className="text-lg font-bold text-gray-300 w-6">#{i + 1}</span>
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg bg-pink-100" onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%23fce7f3'/%3E%3Ctext x='24' y='30' font-family='Arial' font-size='14' font-weight='bold' text-anchor='middle' fill='%23be185d'%3EPB%3C/text%3E%3C/svg%3E" }} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.product.name}</p>
                      <p className="text-xs text-gray-400">{item.product.category.name}</p>
                      <p className="text-sm text-gray-500">{formatCurrency(item.product.price)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-pink-600">{item.totalSold}</p>
                      <p className="text-xs text-gray-400">terjual</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-400 text-sm">Belum ada data penjualan</p>}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="font-semibold text-gray-800">Latest Orders</h2>
          </div>
          <div className="p-6">
            {latestOrders.length > 0 ? (
              <div className="space-y-3">
                {latestOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm text-gray-800">#{order.id} - {order.customerName}</p>
                      <p className="text-xs text-gray-400">{formatCurrency(order.totalPrice)}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>{formatStatus(order.status)}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-400 text-sm">Belum ada pesanan</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
