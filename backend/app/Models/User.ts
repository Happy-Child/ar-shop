import {DateTime} from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {BaseModel, beforeSave, column,} from '@ioc:Adonis/Lucid/Orm'
import EUserRoles from "Contracts/enums/userRoles";
import EUserSexes from "Contracts/enums/userSexes";
import {ModelObject} from "@ioc:Adonis/Lucid/Model";

export default class User extends BaseModel {
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
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

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
