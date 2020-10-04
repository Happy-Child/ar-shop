import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VerifiedEmailsTokens extends BaseSchema {
  protected tableName = 'verified_emails_tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email')
      table.string('token').unique()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
