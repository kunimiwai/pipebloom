import { Controller, Get, UseGuards, Req } from "@nestjs/common"
import { UsersService } from "./users.service"
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard"

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Req() req: any) {
    return this.usersService.findById(req.user.id)
  }
}
