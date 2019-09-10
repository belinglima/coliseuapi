'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.string('name', 40).notNullable()
      table.string('telephone', 40).notNullable()
      table.string('address', 80).notNullable()
      table.string('cpfCnpj', 20).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('companies')
  }
}

module.exports = CompanySchema
