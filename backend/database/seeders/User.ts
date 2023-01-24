import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.create(
      {
        name: 'raissa',
        email: 'raissa@adonisjs.com',
        password: '123456',
      })
  }

}