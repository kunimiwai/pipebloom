import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import { Prisma } from "@prisma/client"

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    search?: string
    categoryId?: number
    color?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
    page?: number
    limit?: number
  }) {
    const { search, categoryId, color, sortBy, sortOrder, page = 1, limit = 12 } = query
    const skip = (page - 1) * limit

    const where: Prisma.ProductWhereInput = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }
    if (categoryId) where.categoryId = categoryId
    if (color) {
      where.colors = { some: { colorName: { contains: color, mode: "insensitive" } } }
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput = {}
    if (sortBy === "price") orderBy.price = sortOrder || "asc"
    if (sortBy === "name") orderBy.name = sortOrder || "asc"
    if (sortBy === "newest") orderBy.createdAt = "desc"

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: { colors: true, category: true },
        orderBy: Object.keys(orderBy).length ? orderBy : { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ])

    return {
      data: products,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: { colors: true, category: true },
    })
    if (!product) throw new NotFoundException("Product not found")
    return product
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { colors: true, category: true },
    })
    if (!product) throw new NotFoundException("Product not found")
    return product
  }

  async create(dto: CreateProductDto) {
    const slug = dto.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    const { colors, ...productData } = dto as any

    return this.prisma.product.create({
      data: {
        ...productData,
        slug,
        colors: colors ? { create: (colors as string[]).map((name: string) => ({ colorName: name })) } : undefined,
      },
      include: { colors: true, category: true },
    })
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findById(id)
    const dtoAny = dto as any
    const { colors, ...productData } = dtoAny

    if (colors) {
      await this.prisma.productColor.deleteMany({ where: { productId: id } })
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        colors: colors ? { create: (colors as string[]).map((name: string) => ({ colorName: name })) } : undefined,
      },
      include: { colors: true, category: true },
    })
  }

  async remove(id: number) {
    await this.findById(id)
    return this.prisma.product.delete({ where: { id } })
  }
}
