import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateOrderDto } from "./dto/create-order.dto"
import { OrderStatus } from "@prisma/client"

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    const productIds = dto.items.map((item) => item.productId)
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    if (products.length !== dto.items.length) {
      throw new BadRequestException("Beberapa produk tidak ditemukan")
    }

    let totalPrice = 0
    for (const item of dto.items) {
      const product = products.find((p) => p.id === item.productId)
      if (!product) throw new BadRequestException(`Produk ID ${item.productId} tidak ditemukan`)
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Stok ${product.name} tidak mencukupi`)
      }
      totalPrice += Number(product.price) * item.quantity
    }

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          customerName: dto.customerName,
          customerPhone: dto.customerPhone,
          customerAddress: dto.customerAddress,
          notes: dto.notes,
          totalPrice,
          status: "PENDING",
          items: {
            create: dto.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: products.find((p) => p.id === item.productId)!.price,
            })),
          },
        },
        include: { items: { include: { product: true } } },
      })

      for (const item of dto.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      }

      return order
    })
  }

  async findAll(query: { page?: number; limit?: number; status?: OrderStatus }) {
    const { page = 1, limit = 20, status } = query
    const skip = (page - 1) * limit
    const where = status ? { status } : {}

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.order.count({ where }),
    ])

    return {
      data: orders,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async findById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    })
  }

  async updateStatus(id: number, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
      include: { items: { include: { product: true } } },
    })
  }
}
