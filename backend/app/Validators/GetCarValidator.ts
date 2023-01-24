import { schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class GetCarValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.enum.optional([
      "model",
      "brand",
      "color",
      "year",
      "odometer",
      "license_plate",
      "renavam",
    ]),
    text: schema.string.optional(),
  });

  public messages = {
    "type.string":
      "O título deve ser model, brand, color, year, odometer, license_plate ou renavam",
    "text.string": "As palavras devem ser uma string",
  };
}
