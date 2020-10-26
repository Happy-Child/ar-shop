import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OrdersProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public order_id?: number

  @column()
  public product_id?: number

  @column()
  public quantity?: number

  @column()
  public name?: string

  @column()
  public image?: string | null

  @column()
  public price?: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
