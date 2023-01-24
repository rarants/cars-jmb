import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Brand from "App/Models/Brand";
import Car from "App/Models/Car";
import History from "App/Models/History";
import CarValidator from "App/Validators/CarValidator";
import UpdateCarValidator from "App/Validators/UpdateCarValidator";
import GetCarValidator from "App/Validators/GetCarValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class CarsController {
  public async index({ request }: HttpContextContract) {
    const filters = await request.validate(GetCarValidator);
    let cars = Car.query().preload("brand");
    if (filters && filters.type && filters.text) {
      if (filters.type !== "brand") {
        cars.where(filters.type, "like", `%${filters.text}%`);
      } else {
        const brand = await Brand.findOrFail(filters.text);
        cars.where(filters.type + "_id", brand.id);
      }
    }
    await cars.orderBy("model", "asc");

    return cars;
  }

  public async store({ auth, request }: HttpContextContract) {
    const data = await request.validate(CarValidator);

    const brand = await Brand.findOrFail(data.brand_id);
    const trx = await Database.transaction();
    try {
      const car = await Car.create(
        { ...data, brand_id: brand.id },
        { client: trx }
      );
      const history = await History.create(
        {
          car_id: car.id,
          user_id: auth.user?.id,
          fields: "brand_id;model;color;year;renavam;odometer;licence_plate;",
          action: "create",
          old_info: "",
          new_info: `${data.brand_id};${data.model};${data.color};${data.year};${data.renavam};${data.odometer};${data.licence_plate};`,
        },
        { client: trx }
      );
      await trx.commit();
      return { car, history };
    } catch (e) {
      await trx.rollback();
    }
  }

  public async show({ params }: HttpContextContract) {
    Car.findOrFail(params.id);
    const history = await History.query()
      .preload("user")
      .preload("car", (builder) => {
        builder.preload("brand");
      })
      .where("car_id", params.id)
      .orderBy("created_at", "desc");
    return history;
  }

  public compareInfo(action, old_info, new_info, car, user) {
    const fields = Object.keys(old_info);
    const data = {
      fields: "",
      old_info: "",
      new_info: "",
      action: action,
      user_id: user?.id,
      car_id: car.id,
    };

    fields.forEach((field) => {
      if (old_info[field] !== new_info[field]) {
        if (field !== "createdAt" && field !== "updatedAt" && field !== "id") {
          data.fields += field + ";";
          data.old_info = old_info[field] ? old_info[field] + ";": ";";
          data.new_info = new_info[field] ? new_info[field] + ";": ";";
        }
      }
    });
    return data;
  }

  public async update({
    auth,
    params,
    request,
    response,
  }: HttpContextContract) {
    const car = await Car.findOrFail(params.id);
    
    const trx = await Database.transaction();
    try {
      const data = await request.validate(UpdateCarValidator);
      const historyData = this.compareInfo(
        "update",
        car.$attributes,
        data,
        car,
        auth.user
      );
      if (historyData.fields) {
        const history = await History.create(historyData)
        history.useTransaction(trx);
        car.merge(data);
        await car.useTransaction(trx).save();
        await trx.commit();
        return { car, history };
      } else {
        car.merge(data);
        await car.useTransaction(trx).save();
        await trx.commit();
        return { car };
      }
    } catch (e) {
      await trx.rollback();
      return response.badRequest({
        message: "Ocorreu um erro ao editar o veículo.",
      });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const car = await Car.findOrFail(params.id);
    const trx = await Database.transaction();

    try {
      await History.create(
        {
          fields: "brand_id;model;color;year;renavam;odometer;licence_plate;",
          action: "delete",
          old_info: `${car.model};${car.color};${car.year};${car.renavam};${car.odometer};${car.licence_plate};`,
          new_info: "",
        },
        { client: trx }
      );
      await car.delete();
      await trx.commit();
    } catch (e) {
      await trx.rollback();
      return response.badRequest({
        message: "Ocorreu um erro ao remover o veículo.",
      });
    }
  }
}
