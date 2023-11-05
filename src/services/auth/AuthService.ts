import { HttpRequest } from "@/utils/HttpRequest";

export class AuthService {
  public static login(username: string, password: string) {
    return HttpRequest.get("/login", {
      username,
      password: ["1", "2", "3"],
    });
  }
}
