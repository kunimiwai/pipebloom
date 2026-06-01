import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { productService } from "../services/product.service"
import { categoryService } from "../services/category.service"
import ProductGrid from "../components/ProductGrid"
import type { Product, Category, PaginationMeta } from "../types/product"

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [loading, setLoading] = useState(true)

  const search = searchParams.get("search") || ""
  const categoryId = searchParams.get("categoryId") || ""
  const sortBy = searchParams.get("sortBy") || ""
  const sortOrder = searchParams.get("sortOrder") || ""
  const page = parseInt(searchParams.get("page") || "1")

  useEffect(() => {
    categoryService.getAll().then(setCategories)
  }, [])

  useEffect(() => {
    setLoading(true)
    productService.getAll({ search: search || undefined, categoryId: categoryId || undefined, sortBy: sortBy || undefined, sortOrder: sortOrder || undefined, page, limit: 12 })
      .then((res) => {
        setProducts(res.data)
        setMeta(res.meta)
      })
      .finally(() => setLoading(false))
  }, [search, categoryId, sortBy, sortOrder, page])

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) params.set(key, value)
    else params.delete(key)
    if (key !== "page") params.delete("page")
    setSearchParams(params)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Katalog Produk</h1>
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => updateParams("search", e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
        />
        <select value={categoryId} onChange={(e) => updateParams("categoryId", e.target.value)} className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-pink-500">
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select value={sortBy ? `${sortBy}-${sortOrder}` : ""} onChange={(e) => {
          const [sb, so] = e.target.value.split("-")
          if (sb) { updateParams("sortBy", sb); updateParams("sortOrder", so) }
          else { updateParams("sortBy", ""); updateParams("sortOrder", "") }
        }} className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-pink-500">
          <option value="">Urutkan</option>
          <option value="price-asc">Harga: Rendah ke Tinggi</option>
          <option value="price-desc">Harga: Tinggi ke Rendah</option>
          <option value="name-asc">Nama: A-Z</option>
          <option value="name-desc">Nama: Z-A</option>
          <option value="newest-desc">Terbaru</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : (
        <>
          <ProductGrid products={products} />
          {meta && meta.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => updateParams("page", String(p))} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${p === page ? "bg-pink-600 text-white" : "bg-white text-gray-600 hover:bg-pink-50 border"}`}>
                  {p}
                </button>
              ))}
            </div>
          )}
          {meta && <p className="text-center text-sm text-gray-400 mt-4">Menampilkan {products.length} dari {meta.total} produk</p>}
        </>
      )}
    </div>
  )
}
