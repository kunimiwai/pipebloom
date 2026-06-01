import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { formatCurrency } from "../utils/currency"

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Kosong</h1>
        <p className="text-gray-500 mb-6">Belum ada produk di keranjang Anda</p>
        <Link to="/products" className="inline-block bg-pink-600 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-700">Lihat Produk</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Keranjang Belanja</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="bg-white rounded-xl p-4 shadow-sm flex gap-4">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-pink-100" onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23fce7f3'/%3E%3Ctext x='40' y='46' font-family='Arial' font-size='20' font-weight='bold' text-anchor='middle' fill='%23be185d'%3EPB%3C/text%3E%3C/svg%3E" }} />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                {item.color && <p className="text-sm text-gray-400">Warna: {item.color}</p>}
                <p className="text-pink-600 font-medium">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeItem(item.productId)} className="text-gray-400 hover:text-red-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-8 h-8 rounded-full border flex items-center justify-center text-sm hover:bg-gray-50">-</button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 rounded-full border flex items-center justify-center text-sm hover:bg-gray-50">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
          <h3 className="font-semibold text-gray-800 mb-4">Ringkasan Belanja</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Subtotal ({items.length} items)</span><span className="font-medium">{formatCurrency(totalPrice)}</span></div>
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between text-lg"><span className="font-semibold">Total</span><span className="font-bold text-pink-600">{formatCurrency(totalPrice)}</span></div>
          </div>
          <Link to="/checkout" className="block mt-6 bg-pink-600 text-white text-center py-3 rounded-full font-medium hover:bg-pink-700 transition-colors">
            Lanjut Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
