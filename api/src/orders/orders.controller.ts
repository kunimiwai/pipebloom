import { Controller, Get, Post, Patch, Body, Param, Query, ParseIntPipe, UseGuards } from "@nestjs/common"
import { OrdersService } from "./orders.service"
import { CreateOrderDto } from "./dto/create-order.dto"
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard"
import { OrderStatus } from "@prisma/client"

@Controller("orders")
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("status") status?: OrderStatus
  ) {
    return this.ordersService.findAll({
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      status,
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.ordersService.findById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id/status")
  async updateStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status") status: OrderStatus
  ) {
    return this.ordersService.updateStatus(id, status)
  }
}
