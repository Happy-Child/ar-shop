import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrdersProducts extends BaseSchema {
  protected tableName = 'orders_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('order_id').notNullable()
      table.integer('product_id').notNullable()
      table.integer('quantity').notNullable().defaultTo(1)
      table.string('name', 255).notNullable()
      table.string('image').nullable()
      table.integer('price').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
