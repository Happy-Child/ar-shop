import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ResetPasswords extends BaseSchema {
  protected tableName = 'reset_passwords'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email')
      table.string('token').unique()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
