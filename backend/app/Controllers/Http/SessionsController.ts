import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";

export default class SessionsController {
  public async create({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all();
    try {
      const token = await auth.use("api").attempt(email, password);
      const userData = await User.findByOrFail("email", email);
      return { auth: token, permissions: userData.$preloaded };
    } catch (e) {
      let message = "Falha na autenticação.";
      if (e.message.includes("User not found")) message = "Email incorreto.";
      if (e.message.includes("Password mis-match"))
        message = "Senha incorreta.";
      return response.unauthorized({ message });
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.logout();
      return response.ok({});
    } catch (e) {
      console.log(e);
    }
  }
}
