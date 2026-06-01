import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { UsersService } from "../users/users.service"
import { LoginDto } from "./dto/login.dto"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email)
    if (!user) throw new UnauthorizedException("Email atau password salah")

    const isPasswordValid = await bcrypt.compare(dto.password, user.password)
    if (!isPasswordValid) throw new UnauthorizedException("Email atau password salah")

    const payload = { sub: user.id, email: user.email, role: user.role }
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }
  }
}
