import { Link, useLocation } from "react-router-dom"
import { useCart } from "../contexts/CartContext"

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
]

export default function Navbar() {
  const location = useLocation()
  const { totalItems } = useCart()

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="PipeBloom" className="w-8 h-8" />
            <span className="text-xl font-bold text-pink-600">PipeBloom</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative text-gray-600 hover:text-pink-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
