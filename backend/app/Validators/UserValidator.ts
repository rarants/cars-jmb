import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string(),
    password: schema.string(),
  })

  public messages: CustomMessages = {
    'name.required': 'É necessário informar o nome do usuário',
    'email.required': 'É necessário informar o nome do usuário',
    'password.required': 'É necessário informar o nome do usuário'
  }
}
