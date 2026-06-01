import { useEffect, useState } from "react"
import { productService } from "../services/product.service"
import { categoryService } from "../services/category.service"
import { formatCurrency } from "../utils/currency"
import type { Product, Category } from "../types/product"

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState({ categoryId: 0, name: "", description: "", price: 0, stock: 0, imageUrl: "", material: "", size: "", colors: "" })

  useEffect(() => {
    Promise.all([productService.getAll({ limit: 100 }), categoryService.getAll()]).then(([p, c]) => {
      setProducts(p.data)
      setCategories(c)
    }).finally(() => setLoading(false))
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ categoryId: categories[0]?.id || 0, name: "", description: "", price: 0, stock: 0, imageUrl: "", material: "", size: "", colors: "" })
    setShowModal(true)
  }

  const openEdit = (product: Product) => {
    setEditing(product)
    setForm({
      categoryId: product.categoryId,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      stock: product.stock,
      imageUrl: product.imageUrl,
      material: product.material || "",
      size: product.size || "",
      colors: product.colors.map((c) => c.colorName).join(", "),
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    const data = {
      ...form,
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
    }
    if (editing) {
      await productService.update(editing.id, data as any)
    } else {
      await productService.create(data as any)
    }
    setShowModal(false)
    const res = await productService.getAll({ limit: 100 })
    setProducts(res.data)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Hapus produk ini?")) {
      await productService.delete(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button onClick={openCreate} className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700">+ Add Product</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4 font-medium text-gray-600">Product</th>
              <th className="text-left p-4 font-medium text-gray-600">Category</th>
              <th className="text-left p-4 font-medium text-gray-600">Price</th>
              <th className="text-left p-4 font-medium text-gray-600">Stock</th>
              <th className="text-right p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded bg-pink-100" onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23fce7f3'/%3E%3Ctext x='20' y='26' font-family='Arial' font-size='12' font-weight='bold' text-anchor='middle' fill='%23be185d'%3EPB%3C/text%3E%3C/svg%3E" }} />
                  <span className="font-medium text-gray-800">{product.name}</span>
                </td>
                <td className="p-4 text-gray-500">{product.category.name}</td>
                <td className="p-4 font-medium">{formatCurrency(product.price)}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{product.stock}</span></td>
                <td className="p-4 text-right">
                  <button onClick={() => openEdit(product)} className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-4">{editing ? "Edit Product" : "Add Product"}</h2>
            <div className="space-y-3">
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: parseInt(e.target.value) })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none" />
              <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) })} className="px-3 py-2 border rounded-lg text-sm outline-none" />
                <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })} className="px-3 py-2 border rounded-lg text-sm outline-none" />
              </div>
              <input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Material" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} className="px-3 py-2 border rounded-lg text-sm outline-none" />
                <input placeholder="Size" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="px-3 py-2 border rounded-lg text-sm outline-none" />
              </div>
              <input placeholder="Colors (comma separated: Red, Pink, Blue)" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none" />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="flex-1 bg-pink-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-pink-700">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
