import { DateTime } from 'luxon'
import {BaseModel, column, hasMany} from '@ioc:Adonis/Lucid/Orm'
import {HasMany} from "@ioc:Adonis/Lucid/Relations";

export default class Product extends BaseModel {
  @hasMany(() => Product, {
    foreignKey: 'category_id'
  })
  public products: HasMany<typeof Product>

  @column({ isPrimary: true })
  public id: number

  @column()
  public category_id: number

  @column()
  public user_id: number

  @column()
  public image?: string | null

  @column()
  public image_small?: string | null

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public description_small?: string | null

  @column()
  public description_full?: string | null

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
