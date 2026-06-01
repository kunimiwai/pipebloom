import api from "./api"
import type { LoginRequest, LoginResponse } from "../types/auth"

export const authService = {
  login: async (data: LoginRequest) => {
    const res = await api.post<LoginResponse>("/auth/login", data)
    return res.data
  },
}
