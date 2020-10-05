import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').notNullable()
      table.string('image').nullable()
      table.string('image_small').nullable()
      table.string('name', 255).unique().notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
