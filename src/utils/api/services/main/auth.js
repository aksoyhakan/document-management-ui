export class AuthService {
  constructor(instance) {
    this.instance = instance;
  }

  async logout() {
    return await this.instance.post("/auth/logout");
  }

  async login(email, password) {
    const response = await this.instance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  }

  async register(name, email, password) {
    const response = await this.instance.post("/auth/register", {
      name,
      email,
      password,
    });

    return response.data;
  }
}
