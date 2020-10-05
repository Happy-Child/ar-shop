import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import EUserRoles from "Contracts/enums/userRoles";

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.enum('role', Object.keys(EUserRoles)).notNullable().defaultTo(EUserRoles.ROLE_USER)
      table.string('avatar').unique()
      table.string('name', 255).notNullable()
      table.string('phone', 30).nullable()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.string('sex', 10).nullable()
      table.boolean('verified').defaultTo(false)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
