import { Outlet, Link, useLocation, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useState } from "react"

const navItems = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/reports", label: "Reports" },
]

export default function AdminLayout() {
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-2">Admin Login</h1>
          <p className="text-gray-500 text-center mb-6">PipeBloom Dashboard</p>
          <AdminLogin />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className={`bg-white w-64 shadow-md fixed inset-y-0 left-0 z-30 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-200`}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-pink-600">PipeBloom</h2>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                (item.to === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(item.to))
                  ? "bg-pink-100 text-pink-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="text-sm text-gray-500 mb-2">{user?.name}</div>
          <button onClick={logout} className="text-red-500 hover:text-red-700 text-sm">Logout</button>
        </div>
      </aside>
      <div className="lg:ml-64 flex-1">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between lg:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <span className="font-semibold text-pink-600">PipeBloom Admin</span>
          <div className="w-6" />
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function AdminLogin() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(email, password)
    } catch {
      setError("Email atau password salah")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none" />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50 transition-colors">
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  )
}
