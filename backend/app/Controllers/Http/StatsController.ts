import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Brand from "App/Models/Brand";
import Car from "App/Models/Car";

export default class StatsController {
  public async getStats({}: HttpContextContract) {
    const year = new Date().getFullYear();
    const cars = await Database.from("cars").count("* as total");
    const colaborators = await Database.from("users").count("* as total");
    const cars_registered_last_year = await Database.from("cars")
      .count("* as total")
      .where("created_at", ">=", `${year}-01-01`)
      .where("created_at", "<=", `${year}-12-31`);
    return {
      cars,
      colaborators,
      cars_registered_last_year,
    };
  }

  public async getCarsStatsByBrand({}: HttpContextContract) {
    const cars_by_brand = await Database.from("cars")
      .select("brand_id")
      .count("* as total")
      .groupBy("brand_id");
    const brands = await Brand.query();
    for (const brand of brands) {
      const idx = cars_by_brand.findIndex((car) => {
        return car.brand_id === brand.$attributes.id;
      });
      if (idx >= 0) {
        cars_by_brand[idx] = {
          ...cars_by_brand[idx],
          brand,
        };
      }
    }
    return cars_by_brand;
  }

  public async getCarsByYear({}: HttpContextContract) {
    const cars_by_year = await Database.from("cars")
      .select("year")
      .count("* as total")
      .groupBy("year");
    return cars_by_year;
  }

  public async getHistoryStatsInYear({}: HttpContextContract) {
    let cars_by_history = await Database.from("histories")
      .select("car_id")
      .count("* as total")
      .groupBy("car_id");


    const cars = await Car.query();
    for (const car of cars) {
      const idx = cars_by_history.findIndex((history) => {
        return history.car_id === car.id;
      });
      if (idx >= 0) {        
        cars_by_history[idx] = {
          ...cars_by_history[idx],
          car,
        };
      }
    }
    const cars_list: any[] = []
    for (const c of cars_by_history) {
      if (c.car_id !== null) 
        cars_list.push(c)
    }
    return cars_list;
  }

  public async getStatsByOdometer({}: HttpContextContract) {
    const cars_by_odometer = await Database.from("cars")
      .select("odometer")
      .count("* as total")
      .groupBy("odometer");
    return cars_by_odometer;
  }
}
