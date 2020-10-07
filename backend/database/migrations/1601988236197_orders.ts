import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import EOrderStatuses from "Contracts/enums/orderStatuses";

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').notNullable()
      table.string('name', 255).notNullable()
      table.string('phone', 30).nullable()
      table.string('email', 255).notNullable()
      table.string('delivery_address', 300).notNullable()
      table.text('comment').nullable()
      table.enum('status', Object.keys(EOrderStatuses)).notNullable().defaultTo(EOrderStatuses.STATUS_NEW)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
