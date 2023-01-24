/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.post("register", "RegisterController.store");
Route.post("sessions", "SessionsController.create");
Route.post("logout", "SessionsController.logout");

Route.group(() => {
  Route.get("/car/:id/history", "CarsController.show");
  Route.get("/cars/history", "HistoriesController.index");
  Route.resource("cars", "CarsController").only([
    "index",
    "store",
    "update",
    "destroy",
  ]);
  Route.resource("/brands", "BrandController").only([
    "store",
    "index",
    "update",
  ]);
  
  Route.get("/cars/stats" , "StatsController.getStats");
  Route.get("/cars/stats/cars-by-brand", "StatsController.getCarsStatsByBrand");
  Route.get("/cars/stats/cars-by-odometer", "StatsController.getStatsByOdometer");
  Route.get("/cars/stats/history-in-year", "StatsController.getHistoryStatsInYear");
  Route.get("/cars/stats/cars-by-year", "StatsController.getCarsByYear");
})
  .prefix("/user")
  .namespace("App/Controllers/Http")
  .middleware("auth");
