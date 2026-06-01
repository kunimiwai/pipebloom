import { useEffect, useState } from "react"
import { categoryService } from "../services/category.service"
import type { Category } from "../types/product"

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState("")
  const [editing, setEditing] = useState<{ id: number; name: string } | null>(null)

  useEffect(() => {
    categoryService.getAll().then(setCategories).finally(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    if (!newName.trim()) return
    const cat = await categoryService.create(newName)
    setCategories((prev) => [...prev, cat])
    setNewName("")
  }

  const handleUpdate = async () => {
    if (!editing) return
    const cat = await categoryService.update(editing.id, editing.name)
    setCategories((prev) => prev.map((c) => (c.id === cat.id ? { ...c, name: cat.name, slug: cat.slug } : c)))
    setEditing(null)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Hapus kategori ini?")) {
      await categoryService.delete(id)
      setCategories((prev) => prev.filter((c) => c.id !== id))
    }
  }

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Categories</h1>
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex gap-3">
        <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New category name" className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none" onKeyDown={(e) => e.key === "Enter" && handleCreate()} />
        <button onClick={handleCreate} className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700">Add</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4 font-medium text-gray-600">Name</th>
              <th className="text-left p-4 font-medium text-gray-600">Slug</th>
              <th className="text-left p-4 font-medium text-gray-600">Products</th>
              <th className="text-right p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  {editing?.id === cat.id ? (
                    <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="px-2 py-1 border rounded text-sm outline-none" onKeyDown={(e) => e.key === "Enter" && handleUpdate()} />
                  ) : (
                    <span className="font-medium text-gray-800">{cat.name}</span>
                  )}
                </td>
                <td className="p-4 text-gray-500">{cat.slug}</td>
                <td className="p-4 text-gray-500">{cat._count?.products || 0}</td>
                <td className="p-4 text-right">
                  {editing?.id === cat.id ? (
                    <>
                      <button onClick={handleUpdate} className="text-green-600 hover:text-green-800 mr-3">Save</button>
                      <button onClick={() => setEditing(null)} className="text-gray-600 hover:text-gray-800">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditing({ id: cat.id, name: cat.name })} className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                      <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-800">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
