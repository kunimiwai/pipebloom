import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const [totalProducts, totalOrders, totalCategories, orders] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.category.count(),
      this.prisma.order.findMany({ select: { totalPrice: true, status: true } }),
    ])

    const totalRevenue = orders
      .filter((o) => o.status !== "CANCELLED")
      .reduce((sum, o) => sum + Number(o.totalPrice), 0)

    return { totalProducts, totalOrders, totalRevenue, totalCategories }
  }

  async getSales() {
    const orders = await this.prisma.order.findMany({
      where: { status: { not: "CANCELLED" } },
      select: { totalPrice: true, createdAt: true },
    })

    const monthlyMap = new Map<string, { revenue: number; orders: number }>()

    for (const order of orders) {
      const key = order.createdAt.toISOString().slice(0, 7)
      const current = monthlyMap.get(key) || { revenue: 0, orders: 0 }
      current.revenue += Number(order.totalPrice)
      current.orders += 1
      monthlyMap.set(key, current)
    }

    const sales = Array.from(monthlyMap.entries())
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => a.month.localeCompare(b.month))

    return sales
  }

  async getBestSeller() {
    const orderItems = await this.prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    })

    const products = await this.prisma.product.findMany({
      where: { id: { in: orderItems.map((i) => i.productId) } },
      include: { category: true },
    })

    return orderItems.map((item) => {
      const product = products.find((p) => p.id === item.productId)
      return {
        product: product,
        totalSold: item._sum.quantity,
      }
    })
  }
}
