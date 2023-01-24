import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import History from "App/Models/History";

export default class HistoriesController {
  public async index({}: HttpContextContract) {
    const history = await History.query()
      .preload("user")
      .preload("car", (builder) => {
        builder.preload("brand");
      })
      .orderBy("created_at", "desc");
    return history;
  }
}
