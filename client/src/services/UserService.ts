import $api from "@/http";
import { TUser } from "@/models/TUser";

export default class UserService {
  static async fetchUsers() {
    return $api.get<TUser[]>("/users");
  }
}
