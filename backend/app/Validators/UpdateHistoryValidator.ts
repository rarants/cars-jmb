import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HistoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    car_id: schema.string(),
    fields: schema.string.optional(),
    old_info: schema.string.optional(),
    new_info: schema.string.optional()
  })

  public messages: CustomMessages = {
    'car_id.required': 'É necessário informar o carro alterado',
    'fields.string': 'Os campos alterados devem estar no formato string',
    'old_info.string': 'As informações antigas devem estar no formato string',
    'new_info.string': 'As novas informações devem estar no formato string',
  }
}
