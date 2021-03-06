import { DateTime } from 'luxon'
import {BaseModel, column, hasMany, belongsTo} from '@ioc:Adonis/Lucid/Orm'
import Product from "App/Models/Product";
import User from "App/Models/User";
import {HasMany, BelongsTo} from "@ioc:Adonis/Lucid/Relations";

export default class Category extends BaseModel {
  @hasMany(() => Product, {
    foreignKey: 'category_id'
  })
  public products: HasMany<typeof Product>

  @belongsTo(() => User, {
    foreignKey: 'user_id'
  })
  public user: BelongsTo<typeof User>

  @column({ isPrimary: true })
  public id: number

  @column()
  public products_count?: number

  @column()
  public user_id?: number

  @column()
  public image?: string | null

  @column()
  public image_small?: string | null

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
