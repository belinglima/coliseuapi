'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageEvaluationSchema extends Schema {
  up () {
    this.create('image_evaluations', (table) => {
      table.increments()
      table
      .integer('evaluation_id').unsigned().references('id').inTable('evaluations')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.string('path').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('image_evaluations')
  }
}

module.exports = ImageEvaluationSchema
