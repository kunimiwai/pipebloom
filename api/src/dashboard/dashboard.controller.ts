import { Controller, Get, UseGuards } from "@nestjs/common"
import { DashboardService } from "./dashboard.service"
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard"

@UseGuards(JwtAuthGuard)
@Controller("dashboard")
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get("summary")
  getSummary() {
    return this.dashboardService.getSummary()
  }

  @Get("sales")
  getSales() {
    return this.dashboardService.getSales()
  }

  @Get("best-seller")
  getBestSeller() {
    return this.dashboardService.getBestSeller()
  }
}
