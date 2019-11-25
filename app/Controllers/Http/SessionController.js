'use strict'

const Database = use('Database')

class SessionController {
  async create ({ request, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return token
  }

  async novos () {
   return Database.table('users')
           .select(Database.raw('DATE_FORMAT(created_at, "%m") as mes'))
           .count('* as total')
           .groupBy('mes')
  }

   async novas () {
   return Database.table('evaluations')
           .select(Database.raw('DATE_FORMAT(created_at, "%m") as mes'))
           .count('* as total')
           .groupBy('mes')
  }
}

module.exports = SessionController
