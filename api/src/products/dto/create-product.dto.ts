import { IsString, IsNumber, IsOptional, IsArray, MinLength, Min } from "class-validator"

export class CreateProductDto {
  @IsNumber()
  categoryId: number

  @IsString()
  @MinLength(3)
  name: string

  @IsString()
  description: string

  @IsNumber()
  @Min(0)
  price: number

  @IsNumber()
  @Min(0)
  stock: number

  @IsString()
  imageUrl: string

  @IsOptional()
  @IsString()
  material?: string

  @IsOptional()
  @IsString()
  size?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[]
}
