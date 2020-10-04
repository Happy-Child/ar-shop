import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('category_id').nullable()
      table.integer('user_id').notNullable()
      table.string('image').nullable()
      table.string('image_small').nullable()
      table.string('name', 255).unique().notNullable()
      table.integer('price').notNullable()
      table.text('description_small').nullable()
      table.text('description_full').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
