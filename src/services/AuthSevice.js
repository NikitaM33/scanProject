import instance from "../http";

export default class AuthSevice {
  static async login(login, password) {
    return instance.post("api/v1/account/login", { login, password });
  }
}
