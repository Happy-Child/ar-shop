import {DateTime} from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {BaseModel, beforeSave, column, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import EUserRoles from "Contracts/enums/userRoles";
import EUserSexes from "Contracts/enums/userSexes";
import {ModelObject} from "@ioc:Adonis/Lucid/Model";
import Order from "App/Models/Order";

export default class User extends BaseModel {
  @hasMany(() => Order, {
    foreignKey: 'user_id'
  })
  public orders: HasMany<typeof Order>

  @column({ isPrimary: true })
  public id: number

  @column()
  public role?: EUserRoles

  @column()
  public avatar?: string | null

  @column()
  public name: string

  @column()
  public phone?: string | null

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public remember_me_token?: string | null

  @column()
  public sex?: EUserSexes | null

  @column()
  public verified?: boolean

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public static async thisEmailVerified (email: string): Promise<boolean> {
    const userInstance: User | null = await this.findBy('email', email)

    if (!userInstance) {
      return true
    }

    const {verified}: ModelObject = userInstance

    return verified || false
  }
}
