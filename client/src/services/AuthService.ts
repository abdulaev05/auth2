import { TAuthResponse } from "@/models/response/TAuthResponse";
import $api from "@/http/index";

export default class AuthService {
  static async registration(email: string, password: string) {
    return $api.post<TAuthResponse>("/registration", { email, password });
  }
  static async login(email: string, password: string) {
    return $api.post<TAuthResponse>("/login", { email, password });
  }
  static async logout() {
    return $api.get("/logout");
  }
}
