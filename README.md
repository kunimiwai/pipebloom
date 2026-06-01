# PipeBloom

Full-stack e-commerce platform for handmade pipe cleaner flowers. Built with NestJS + Prisma + PostgreSQL (backend) and React + Vite + Tailwind CSS v4 (frontend).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, Recharts |
| Backend | NestJS 11, TypeScript, Prisma ORM 6 |
| Database | PostgreSQL 16 (Docker) |
| Auth | JWT + Passport + Bcrypt |
| Storage | Cloudinary (image upload) |
| Validation | Zod + React Hook Form |

## Project Structure

```
reactProject/
+-- api/              # NestJS Backend (:3000)
|   +-- prisma/       # Schema, migrations, seed
|   +-- src/
|       +-- auth/           # JWT authentication
|       +-- users/          # User management
|       +-- products/       # CRUD + filter/pagination
|       +-- categories/     # CRUD
|       +-- orders/         # Order + stock management
|       +-- dashboard/      # Analytics endpoints
|       +-- cloudinary/     # Image upload service
|       +-- prisma/         # Database service
|       +-- common/         # Guards, decorators
+-- web/              # React Frontend (:5173)
    +-- src/
        +-- components/     # Navbar, Footer, ProductCard, ProductGrid
        +-- pages/          # Home, About, Products, Detail, Cart, Checkout, Contact
        +-- admin/          # Dashboard, Products, Categories, Orders, Reports
        +-- layouts/        # MainLayout, AdminLayout
        +-- contexts/       # AuthContext, CartContext
        +-- services/       # API service layer
        +-- types/          # TypeScript interfaces
        +-- utils/          # Currency, formatter
        +-- routes/         # Router config
```

## Quick Start

### Prerequisites

- Node.js 20+
- Docker Desktop (for PostgreSQL)
- npm

### 1. Database

```bash
docker run -d --name pipebloom-db `
  -e POSTGRES_USER=postgres `
  -e POSTGRES_PASSWORD=password `
  -e POSTGRES_DB=pipebloom `
  -p 5432:5432 postgres:16
```

### 2. Backend

```bash
cd api
npm install
npx prisma generate
npx prisma migrate dev
npx ts-node prisma/seed.ts
npm run start:dev
```

Backend runs at `http://localhost:3000`.

### 3. Frontend

```bash
cd web
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` (proxies `/api` to backend).

## Default Admin

| Field | Value |
|-------|-------|
| Email | `admin@pipebloom.com` |
| Password | `admin123` |

## API Endpoints

### Public
- `POST /api/auth/login` — Admin login
- `GET /api/products?search=&category=&color=&minPrice=&maxPrice=&sortBy=&order=&page=&limit=` — Product list
- `GET /api/products/:id` — Product detail
- `GET /api/categories` — Category list
- `POST /api/orders` — Create order

### Admin (requires JWT)
- `POST/PUT/DELETE /api/products` — Product CRUD
- `POST/PUT/DELETE /api/categories` — Category CRUD
- `GET /api/orders` — Order list
- `PATCH /api/orders/:id/status` — Update order status
- `GET /api/dashboard/summary` — Stats
- `GET /api/dashboard/sales` — Monthly sales
- `GET /api/dashboard/best-seller` — Top products

## Features

- Product catalog with search, filter, sort, pagination
- Shopping cart with localStorage persistence
- Checkout with form validation (Zod)
- Admin panel: Dashboard with charts, product/category/order management
- JWT authentication for admin access
- Responsive design (Tailwind CSS v4)

## Deployment

- **Backend:** Railway / Render (set `DATABASE_URL`, `JWT_SECRET`, `CLOUDINARY_*`)
- **Frontend:** Vercel (set `VITE_API_URL`)
