'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageCompanySchema extends Schema {
  up () {
    this.create('image_companies', (table) => {
      table.increments()
      table
      .integer('company_id').unsigned().references('id').inTable('companies')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.string('path').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('image_companies')
  }
}

module.exports = ImageCompanySchema
