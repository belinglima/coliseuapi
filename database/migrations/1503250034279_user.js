'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.integer('company_id', 10).nullable()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('birthday', 10).notNullable()
      table.boolean('isAdmin').notNullable().defaultTo(false)
      table.timestamps()
    }) 
  }

  down () {
    this.dropIfExists('users')
  }
}

module.exports = UserSchema
