import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Car from './Car'

export default class History extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public car_id: number

  @column()
  public user_id: number

  @column()
  public fields: string

  @column()
  public action: string

  @column()
  public old_info: string

  @column()
  public new_info: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Car, {
    localKey: 'id',
    foreignKey: 'car_id',
  })
  public car: BelongsTo<typeof Car>
}
