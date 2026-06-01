import { IsString, IsPhoneNumber, IsOptional, IsArray, MinLength } from "class-validator"

export class CreateOrderDto {
  @IsString()
  @MinLength(3)
  customerName: string

  @IsString()
  customerPhone: string

  @IsString()
  customerAddress: string

  @IsOptional()
  @IsString()
  notes?: string

  @IsArray()
  items: { productId: number; quantity: number }[]
}
