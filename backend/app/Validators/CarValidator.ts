import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CarValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    model: schema.string(),
    color: schema.string(),
    year: schema.string(),
    renavam: schema.string(),
    licence_plate: schema.string(),
    odometer: schema.string(),
    brand_id: schema.number(),
  })

  public messages: CustomMessages = {
    'model.required': 'É necessário informar o modelo do carro',
    'color.required': 'É necessário informar a cor do carro',
    'year.required': 'É necessário informar o ano do carro',
    'renavam.required': 'É necessário informar o renavam do carro',
    'licence_plate.required': 'É necessário informar a placa do carro',
    'odometer.required': 'É necessário informar o hodômetro do carro',
    'brand_id.number': 'É necessário informar a marca do carro',
    'model.string': 'O modelo do carro deve ser uma string',
    'color.string': 'A cor do carro deve ser uma string',
    'year.string': 'O ano do carro deve ser uma string',
    'renavam.string': 'O renavam do carro deve ser uma string',
    'licence_plate.string': 'A placa do carro deve ser uma string',
    'odometer.requistringed': 'O odômetro do carro deve ser uma string',
    'brand_id.string': 'A marca do carro deve ser uma string',
  }
}
