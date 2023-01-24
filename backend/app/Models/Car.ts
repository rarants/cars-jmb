import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Brand from './Brand'
import History from './History'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public brand_id: number

  @column()
  public model: string

  @column()
  public color: string

  @column()
  public year: string

  @column()
  public renavam: string

  @column()
  public licence_plate: string

  @column()
  public odometer: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Brand, {
    localKey: 'brand_id',
    foreignKey: 'id',
  })
  public brand: HasOne<typeof Brand>  
  
  @hasMany(() => History, {
    localKey: 'car_id',
    foreignKey: 'id',
  })
  public history: HasMany <typeof History>
}
