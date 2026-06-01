import { useEffect, useState } from "react"
import api from "../services/api"
import { formatCurrency } from "../utils/currency"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

interface Summary {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  totalCategories: number
}

interface SalesData {
  month: string
  revenue: number
  orders: number
}

interface BestSeller {
  product: { id: number; name: string; price: number; imageUrl: string }
  totalSold: number
}

export default function AdminDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [sales, setSales] = useState<SalesData[]>([])
  const [bestSellers, setBestSellers] = useState<BestSeller[]>([])

  useEffect(() => {
    api.get("/dashboard/summary").then((r) => setSummary(r.data))
    api.get("/dashboard/sales").then((r) => setSales(r.data))
    api.get("/dashboard/best-seller").then((r) => setBestSellers(r.data))
  }, [])

  const cards = summary ? [
    { label: "Total Products", value: summary.totalProducts, color: "text-pink-500", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { label: "Total Orders", value: summary.totalOrders, color: "text-blue-500", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
    { label: "Total Revenue", value: formatCurrency(summary.totalRevenue), color: "text-green-500", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Categories", value: summary.totalCategories, color: "text-purple-500", icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" },
  ] : []

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <svg className={`w-8 h-8 ${card.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} /></svg>
            </div>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            <p className="text-sm text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
          {sales.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-400 text-sm">No data yet</p>}
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Monthly Orders</h2>
          {sales.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
              </LineChart>
            </ResponsiveContainer>
          ) : <p className="text-gray-400 text-sm">No data yet</p>}
        </div>
      </div>

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
                    <p className="text-sm text-gray-400">{formatCurrency(item.product.price)}</p>
                  </div>
                  <span className="text-sm font-medium text-pink-600">{item.totalSold} terjual</span>
                </div>
              ))}
            </div>
          ) : <p className="text-gray-400 text-sm">No sales data yet</p>}
        </div>
      </div>
    </div>
  )
}
