import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { productService } from "../services/product.service"
import { categoryService } from "../services/category.service"
import ProductGrid from "../components/ProductGrid"
import type { Product, Category } from "../types/product"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    productService.getAll({ limit: 8 }).then((res) => setProducts(res.data))
    categoryService.getAll().then(setCategories)
  }, [])

  return (
    <div>
      <section className="bg-gradient-to-br from-pink-100 via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
              Bunga <span className="text-pink-600">Abadi</span> dari Pipe Cleaner
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Handmade bunga cantik yang tak pernah layu. Hadiah spesial yang penuh makna untuk orang tersayang.
            </p>
            <div className="flex gap-4 mt-8">
              <Link to="/products" className="bg-pink-600 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-700 transition-colors">
                Lihat Katalog
              </Link>
              <Link to="/contact" className="border border-pink-600 text-pink-600 px-8 py-3 rounded-full font-medium hover:bg-pink-50 transition-colors">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Kategori Populer</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/products?categoryId=${cat.id}`} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto mb-2 bg-pink-100 rounded-full flex items-center justify-center">
                  <img src="/logo.svg" alt="" className="w-6 h-6 opacity-60" />
                </div>
                <p className="font-semibold text-gray-800">{cat.name}</p>
                <p className="text-sm text-gray-400">{cat._count?.products || 0} products</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Produk Unggulan</h2>
          <Link to="/products" className="text-pink-600 hover:text-pink-700 font-medium text-sm">Lihat Semua &rarr;</Link>
        </div>
        <ProductGrid products={products} />
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">Kenapa Memilih PipeBloom?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "handmade", title: "Handmade Quality", desc: "Setiap bunga dibuat dengan tangan, detail, dan penuh cinta." },
              { icon: "abadi", title: "Tidak Pernah Layu", desc: "Terbuat dari pipe cleaner berkualitas, bunga kami abadi selamanya." },
              { icon: "kado", title: "Kado Spesial", desc: "Cocok untuk hadiah ulang tahun, anniversary, atau ucapan terima kasih." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  {item.icon === "handmade" ? (
                    <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  ) : item.icon === "abadi" ? (
                    <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  ) : (
                    <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pesan Sekarang!</h2>
          <p className="text-pink-100 mb-8">Hubungi kami via WhatsApp untuk pemesanan dan konsultasi</p>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full font-medium hover:bg-green-600 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
