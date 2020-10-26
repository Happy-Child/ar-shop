import { DateTime } from 'luxon'
import {BaseModel, column, hasMany} from '@ioc:Adonis/Lucid/Orm'
import EOrderStatuses from "Contracts/enums/orderStatuses";
import OrdersProduct from "App/Models/OrdersProduct";
import {HasMany} from "@ioc:Adonis/Lucid/Relations";

export default class Order extends BaseModel {
  @hasMany(() => OrdersProduct, {
    foreignKey: 'order_id'
  })
  public products: HasMany<typeof OrdersProduct>

  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public name: string

  @column()
  public phone?: string | null

  @column()
  public email: string

  @column()
  public delivery_address: string

  @column()
  public comment?: string | null

  @column()
  public status: EOrderStatuses

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
