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

  async usuario ({ request, response }) {
    const email = request.only([
      "email"
    ])

    if(!email['email']){
      response.status(200).json({
        data: false,
        erro: 'necessário inserir o email'
      })
    }else {
      const user = await Database
	.select('*')
      .table('users as o')
      .where('email', email['email'])
  
      if (user) {
        response.status(200).json({
          data: true,
	  nome: user[0]['name'],
	  id: user[0].id
        })
      } else {
        response.status(200).json({
          data: false,
        })
      }
    }
  }
}

module.exports = SessionController
