'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EvaluationSchema extends Schema {
  up () {
    this.create('evaluations', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.float('valorPago').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('evaluations')
  }
}

module.exports = EvaluationSchema
