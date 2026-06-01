import { useEffect, useState } from "react"
import { orderService } from "../services/order.service"
import { formatCurrency } from "../utils/currency"
import { formatDate, formatStatus, statusColor } from "../utils/formatter"
import type { Order, OrderStatus } from "../types/order"

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Order | null>(null)

  useEffect(() => {
    orderService.getAll({ limit: 50 }).then((r) => setOrders(r.data)).finally(() => setLoading(false))
  }, [])

  const handleStatus = async (id: number, status: OrderStatus) => {
    const updated = await orderService.updateStatus(id, status)
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)))
    if (selected?.id === id) setSelected(updated)
  }

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4 font-medium text-gray-600">Order ID</th>
              <th className="text-left p-4 font-medium text-gray-600">Customer</th>
              <th className="text-left p-4 font-medium text-gray-600">Date</th>
              <th className="text-left p-4 font-medium text-gray-600">Status</th>
              <th className="text-right p-4 font-medium text-gray-600">Total</th>
              <th className="text-right p-4 font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">#{order.id}</td>
                <td className="p-4">
                  <p className="font-medium text-gray-800">{order.customerName}</p>
                  <p className="text-xs text-gray-400">{order.customerPhone}</p>
                </td>
                <td className="p-4 text-gray-500">{formatDate(order.createdAt)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>{formatStatus(order.status)}</span>
                </td>
                <td className="p-4 text-right font-medium">{formatCurrency(order.totalPrice)}</td>
                <td className="p-4 text-right">
                  <button onClick={() => setSelected(order)} className="text-pink-600 hover:text-pink-800 text-sm">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Order #{selected.id}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="font-medium text-gray-700">Customer:</span> <span className="text-gray-600">{selected.customerName}</span></div>
              <div><span className="font-medium text-gray-700">Phone:</span> <span className="text-gray-600">{selected.customerPhone}</span></div>
              <div><span className="font-medium text-gray-700">Address:</span> <span className="text-gray-600">{selected.customerAddress}</span></div>
              {selected.notes && <div><span className="font-medium text-gray-700">Notes:</span> <span className="text-gray-600">{selected.notes}</span></div>}
              <div><span className="font-medium text-gray-700">Date:</span> <span className="text-gray-600">{formatDate(selected.createdAt)}</span></div>
              <div><span className="font-medium text-gray-700">Status:</span> <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(selected.status)}`}>{formatStatus(selected.status)}</span></div>
            </div>
            <div className="border-t mt-4 pt-4">
              <h3 className="font-semibold text-sm text-gray-700 mb-2">Items</h3>
              <div className="space-y-2">
                {selected.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.product.name} x{item.quantity}</span>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t font-bold">
                <span>Total</span>
                <span className="text-pink-600">{formatCurrency(selected.totalPrice)}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-medium text-gray-700 mb-2">Update Status:</p>
              <div className="flex gap-2 flex-wrap">
                {(["PENDING", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED"] as OrderStatus[]).map((s) => (
                  <button key={s} onClick={() => handleStatus(selected.id, s)} disabled={selected.status === s} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selected.status === s ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}>{formatStatus(s)}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
