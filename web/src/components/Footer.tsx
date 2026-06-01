import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="PipeBloom" className="w-7 h-7" />
              <span className="text-lg font-bold text-pink-600">PipeBloom</span>
            </div>
            <p className="text-gray-500 text-sm">Handmade bunga cantik dari pipe cleaner. Hadiah spesial untuk orang tersayang.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Pages</h3>
            <div className="space-y-2 text-sm text-gray-500">
              <Link to="/" className="block hover:text-pink-600">Home</Link>
              <Link to="/about" className="block hover:text-pink-600">About</Link>
              <Link to="/products" className="block hover:text-pink-600">Products</Link>
              <Link to="/contact" className="block hover:text-pink-600">Contact</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2 text-sm text-gray-500">
              <Link to="/products?category=1" className="block hover:text-pink-600">Bouquet</Link>
              <Link to="/products?category=2" className="block hover:text-pink-600">Bucket Flower</Link>
              <Link to="/products?category=3" className="block hover:text-pink-600">Vase Flower</Link>
              <Link to="/products?category=4" className="block hover:text-pink-600">Keychain</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <div className="space-y-2 text-sm text-gray-500">
              <p>WhatsApp: 0812-3456-7890</p>
              <p>Email: hello@pipebloom.com</p>
              <p>Lokasi: Jakarta, Indonesia</p>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-400">
          &copy; 2026 PipeBloom. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
