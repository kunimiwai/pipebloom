import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import AdminLayout from "../layouts/AdminLayout"
import Home from "../pages/Home"
import About from "../pages/About"
import Products from "../pages/Products"
import ProductDetail from "../pages/ProductDetail"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"
import Contact from "../pages/Contact"
import AdminDashboard from "../admin/Dashboard"
import AdminProducts from "../admin/Products"
import AdminCategories from "../admin/Categories"
import AdminOrders from "../admin/Orders"
import AdminReports from "../admin/Reports"

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:slug", element: <ProductDetail /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "categories", element: <AdminCategories /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "reports", element: <AdminReports /> },
    ],
  },
])
