'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageUsersSchema extends Schema {
  up () {
    this.create('image_users', (table) => {
      table.increments()
      table
      .integer('user_id').unsigned().references('id').inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.string('path').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.dropIfExists('image_users')
  }
}

module.exports = ImageUsersSchema
