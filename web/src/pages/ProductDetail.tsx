import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { productService } from "../services/product.service"
import { useCart } from "../contexts/CartContext"
import { formatCurrency } from "../utils/currency"
import type { Product } from "../types/product"

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    productService.getBySlug(slug).then((p) => {
      setProduct(p)
      if (p.colors.length > 0) setSelectedColor(p.colors[0].colorName)
    }).finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">Loading...</div>
  if (!product) return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">Produk tidak ditemukan</div>

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      quantity,
      imageUrl: product.imageUrl,
      color: selectedColor,
    })
  }

  const waMessage = `Halo PipeBloom! Saya tertarik dengan ${product.name} (${formatCurrency(product.price)}). Apakah tersedia?`

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-400 mb-4">
        <Link to="/" className="hover:text-pink-600">Home</Link> / <Link to="/products" className="hover:text-pink-600">Products</Link> / <span className="text-gray-600">{product.name}</span>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-pink-100 rounded-xl aspect-square overflow-hidden">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Crect width='600' height='600' fill='%23fce7f3'/%3E%3Ctext x='300' y='320' font-family='Arial' font-size='100' font-weight='bold' text-anchor='middle' fill='%23be185d'%3EPB%3C/text%3E%3C/svg%3E" }} />
        </div>
        <div>
          <p className="text-pink-500 font-medium text-sm uppercase tracking-wide">{product.category.name}</p>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">{product.name}</h1>
          <p className="text-3xl font-bold text-pink-600 mt-4">{formatCurrency(product.price)}</p>
          <p className="text-gray-500 mt-4 leading-relaxed">{product.description}</p>

          <div className="mt-6 space-y-3">
            {product.material && <p className="text-sm text-gray-500"><span className="font-medium text-gray-700">Material:</span> {product.material}</p>}
            {product.size && <p className="text-sm text-gray-500"><span className="font-medium text-gray-700">Ukuran:</span> {product.size}</p>}
            <p className="text-sm text-gray-500"><span className="font-medium text-gray-700">Stock:</span> {product.stock > 0 ? `${product.stock} tersedia` : "Habis"}</p>
          </div>

          {product.colors.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Pilihan Warna:</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button key={color.id} onClick={() => setSelectedColor(color.colorName)} className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${selectedColor === color.colorName ? "bg-pink-600 text-white border-pink-600" : "bg-white text-gray-600 border-gray-300 hover:border-pink-300"}`}>
                    {color.colorName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.stock > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Jumlah:</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-50">-</button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-50">+</button>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {product.stock > 0 && (
              <button onClick={handleAddToCart} className="flex-1 bg-pink-600 text-white py-3 rounded-full font-medium hover:bg-pink-700 transition-colors">
                Tambah ke Keranjang
              </button>
            )}
            <a href={`https://wa.me/6281234567890?text=${encodeURIComponent(waMessage)}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 text-white py-3 rounded-full font-medium hover:bg-green-600 transition-colors text-center">
              Beli via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
