import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cars'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('brand_id')
        .unsigned()
        .references('id')
        .inTable('brands')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.string('model').notNullable()
      table.string('color').notNullable()
      table.string('year').notNullable()
      table.string('renavam').notNullable()
      table.string('licence_plate').notNullable()
      table.string('odometer').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
