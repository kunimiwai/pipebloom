# PipeBloom - Planning Document

## Project Overview
PipeBloom adalah platform katalog dan penjualan bunga handmade berbahan pipe cleaner.

## Tech Stack
- **Frontend:** React + TypeScript + Vite + Tailwind CSS v4
- **Backend:** NestJS + TypeScript + Prisma ORM
- **Database:** PostgreSQL
- **Storage:** Cloudinary
- **Auth:** JWT + Bcrypt

## Project Structure
```
reactProject/
+-- api/          # NestJS Backend
¦   +-- prisma/   # Schema + Seed
¦   +-- src/      # Source code
¦       +-- auth/         # JWT Authentication
¦       +-- users/        # User management
¦       +-- products/     # Product CRUD
¦       +-- categories/   # Category CRUD
¦       +-- orders/       # Order management
¦       +-- dashboard/    # Analytics
¦       +-- cloudinary/   # Image upload
¦       +-- prisma/       # Database service
¦       +-- common/       # Guards, decorators
+-- web/          # React Frontend
    +-- src/
        +-- components/   # Reusable UI
        +-- pages/        # Public pages
        +-- admin/        # Admin pages
        +-- layouts/      # Main & Admin layout
        +-- contexts/     # Auth & Cart context
        +-- services/     # API services
        +-- types/        # TypeScript types
        +-- utils/        # Utilities
        +-- routes/       # Router config
```

## API Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/products` - Public product list (filterable)
- `GET /api/products/:id` - Product detail
- `POST/PUT/DELETE /api/products` - Admin CRUD
- `GET /api/categories` - Public category list
- `POST/PUT/DELETE /api/categories` - Admin CRUD
- `POST /api/orders` - Create order (public)
- `GET /api/orders` - Admin order list
- `PATCH /api/orders/:id/status` - Update status
- `GET /api/dashboard/summary` - Stats
- `GET /api/dashboard/sales` - Monthly sales
- `GET /api/dashboard/best-seller` - Top products

## Database Models
- User (id, name, email, password, role)
- Category (id, name, slug)
- Product (id, categoryId, name, slug, description, price, stock, imageUrl, material, size)
- ProductColor (id, productId, colorName)
- Order (id, customerName, customerPhone, customerAddress, notes, totalPrice, status)
- OrderItem (id, orderId, productId, quantity, price)

## Pages
### Public
1. Home - Hero, Featured Products, Categories, Why Choose Us, WhatsApp CTA
2. About - Story, Vision, Mission
3. Products - Search, Filter, Sort, Pagination
4. Product Detail - Image, Info, Colors, Add to Cart, WhatsApp
5. Cart - List, Quantity, Summary
6. Checkout - Form + Order Summary
7. Contact - Contact info, WhatsApp

### Admin
1. Dashboard - Stat cards, Revenue chart, Orders chart, Best sellers
2. Products - Table + CRUD modal
3. Categories - Table + inline edit
4. Orders - Table + status management
5. Reports - Best sellers, Latest orders

## Development Phases
Phase 1: Project Setup (both projects)
Phase 2: Database Schema + Seed
Phase 3: Backend Modules (Auth, CRUD)
Phase 4: Frontend Pages + Components
Phase 5: Integration & Testing
Phase 6: Deployment

## Default Admin
- Email: admin@pipebloom.com
- Password: admin123
