import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { orderService } from "../services/order.service"
import { formatCurrency } from "../utils/currency"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  customerName: z.string().min(3, "Nama minimal 3 karakter"),
  customerPhone: z.string().min(10, "Nomor telepon tidak valid"),
  customerAddress: z.string().min(10, "Alamat minimal 10 karakter"),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  if (items.length === 0 && !success) {
    navigate("/cart")
    return null
  }

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      await orderService.create({
        ...data,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      })
      setSuccess(true)
      clearCart()
    } catch (err) {
      console.error(err)
      alert("Gagal membuat pesanan. Silakan coba lagi.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pesanan Berhasil!</h1>
        <p className="text-gray-500 mb-6">Terima kasih! Pesanan Anda akan segera diproses.</p>
        <button onClick={() => navigate("/products")} className="bg-pink-600 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-700">Belanja Lagi</button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="font-semibold text-lg text-gray-800">Informasi Pelanggan</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input {...register("customerName")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" />
              {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
              <input {...register("customerPhone")} placeholder="0812-3456-7890" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" />
              {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <textarea {...register("customerAddress")} rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" />
              {errors.customerAddress && <p className="text-red-500 text-xs mt-1">{errors.customerAddress.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catatan (opsional)</label>
              <textarea {...register("notes")} rows={2} placeholder="Misal: warna favorit, pesan untuk kado, dll." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" />
            </div>
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-pink-600 text-white py-3 rounded-full font-medium hover:bg-pink-700 disabled:opacity-50 transition-colors">
            {submitting ? "Memproses..." : "Buat Pesanan"}
          </button>
        </form>
        <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
          <h3 className="font-semibold text-gray-800 mb-4">Ringkasan Pesanan</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} x{item.quantity}</span>
                <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between text-lg"><span className="font-semibold">Total</span><span className="font-bold text-pink-600">{formatCurrency(totalPrice)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
