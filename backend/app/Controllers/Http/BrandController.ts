import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Brand from 'App/Models/Brand'
import BrandValidator from 'App/Validators/BrandValidator'
import UpdateBrandValidator from 'App/Validators/UpdateBrandValidator'

export default class BrandController {
  public async index({ }: HttpContextContract) {
    let brands = await Brand.query().orderBy("name", "asc")
    return brands
  }

  public async store({ request }: HttpContextContract) {
    const { name } = await request.validate(BrandValidator)
    try {
      const brand = await Brand.create({ name })
      return brand
    } catch (e) {
      console.log(e)
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate(UpdateBrandValidator)
    const brand = await Brand.findOrFail(params.id)

    const repeated = await Brand.query()
      .where('name', data.name)
      .first()

    if (repeated)
      return response.unauthorized({
        message: 'Já existe marca cadastrada com esse nome.',
      })

    brand.merge(data)
    await brand.save()
    return brand
  }
}