import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({ include: { _count: { select: { products: true } } } })
  }

  async findById(id: number) {
    return this.prisma.category.findUnique({ where: { id } })
  }

  async create(dto: { name: string }) {
    const slug = dto.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    return this.prisma.category.create({ data: { ...dto, slug } })
  }

  async update(id: number, dto: { name: string }) {
    const slug = dto.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    return this.prisma.category.update({ where: { id }, data: { ...dto, slug } })
  }

  async remove(id: number) {
    return this.prisma.category.delete({ where: { id } })
  }
}
