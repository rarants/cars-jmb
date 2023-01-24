import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BrandValidator {  
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string(),
  })

  public messages: CustomMessages = {
    'name.required': 'É necessário informar o nome da marca'
  }
}
