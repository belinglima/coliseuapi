'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WeightSchema extends Schema {
  up () {
    this.create('weights', (table) => {
      table.increments()
      table.float('antebraco').notNullable()
      table.float('bracoRelachado').notNullable()
      table.float('bracoContraido').notNullable()
      table.float('coxaProximal').notNullable()
      table.float('coxaMedial').notNullable()
      table.float('coxaDistal').notNullable()
      table.float('panturrilha').notNullable()
      table.float('abdomen').notNullable()
      table.float('ombro').notNullable()
      table.float('cintura').notNullable()
      table.float('altura').notNullable()
      table.float('peso').notNullable()
      table.integer('evaluation_id').unsigned().references('id').inTable('evaluations')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('weights')
  }
}

module.exports = WeightSchema
