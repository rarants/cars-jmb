import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import User from "App/Models/User";
import UserValidator from "App/Validators/UserValidator";

export default class RegisterController {
  public async store({ request, response }: HttpContextContract) {
    const { name, email, password } = await request.validate(UserValidator);
    const existing_email = User.query().where("email", email).first()
    if (existing_email != null)
      return response.badRequest("Email já cadastrado");
    try {
      const user = await User.create({ name, email, password });
      return user;
    } catch (e) {
      console.log(e);
    }
  }
}
