import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ParseIntPipe } from "@nestjs/common"
import { ProductsService } from "./products.service"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard"

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query("search") search?: string,
    @Query("categoryId") categoryId?: string,
    @Query("color") color?: string,
    @Query("sortBy") sortBy?: string,
    @Query("sortOrder") sortOrder?: "asc" | "desc",
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ) {
    return this.productsService.findAll({
      search,
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      color,
      sortBy,
      sortOrder,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    })
  }

  @Get("slug/:slug")
  async findBySlug(@Param("slug") slug: string) {
    return this.productsService.findBySlug(slug)
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.findById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.remove(id)
  }
}
