import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import EOrderStatuses from "Contracts/enums/orderStatuses";

export default class Order extends BaseModel {
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
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
