import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from "@nestjs/common"
import { CategoriesService } from "./categories.service"
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard"

@Controller("categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoriesService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body("name") name: string) {
    return this.categoriesService.create({ name })
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body("name") name: string) {
    return this.categoriesService.update(id, { name })
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.categoriesService.remove(id)
  }
}
