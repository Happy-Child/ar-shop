import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category_id: number

  @column()
  public user_id: number

  @column()
  public image: string | null

  @column()
  public image_small: string | null

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public description_small: string | null

  @column()
  public description_full: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
