import { DateTime } from 'luxon'
import {BaseModel, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import {BelongsTo} from "@ioc:Adonis/Lucid/Relations";
import User from "App/Models/User";
import Category from "App/Models/Category";

export default class Product extends BaseModel {
  @belongsTo(() => Category, {
    foreignKey: 'category_id'
  })
  public category: BelongsTo<typeof Category>

  @belongsTo(() => User, {
    foreignKey: 'user_id'
  })
  public user: BelongsTo<typeof User>

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
