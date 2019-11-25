const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with user
 */
class UserController {
  /**
   * Show a list of all user.
   * GET user
   */
  async index () {
    const user = await User.query()
    .with('images')
    .fetch()

    if(user.rows.length === 0 ) {
      response.status(404).json({ 
        user: 'Não existem usuários cadastrados.',
        data: false 
      })
    } 

    return user 
  }

  /**
   * Create/save a new user.
   * POST user
   */
  // async store ({ request, response }) {}
  async store ({ request, response }) {
    const data = request.only([
      "name", 
      "company_id",
      "email", 
      "password",
      "username",
      "birthday",
      "isAdmin"
    ])

    if (data['name'] === '' || 
        data['company_id']  === '' || 
        data['email']  === '' || 
        data['password'] === '' ||
        data['username']  === '' || 
        data['birthday'] === ''  || 
        data['isAdmin']  === '' ) {

      response.status(200).json({ 
        data: 'Necessário preencher os campos.' 
      })
    } else {
      const user = await User.findOrCreate(data)
      if (user) {
        response.status(201).json({
          success: true,
          data: user['id']
        })
      } else {
        response.status(204).send({ success: false, error: 'User Not Created' })
      }
    }
  }

  /**
   * Display a single user.
   * GET user/:id
   */

  async show ({ params, response }) {
    const user = await User.find(params.id)
    
    if(user){
      await user.load('images')
    } else {
      response.status(404).json({ 
        user: 'Não existe usuário cadastrado com esse id.' 
      })
    }

    // if(user.rows === 0 ) {
    //   response.status(404).json({ 
    //     user: 'Não existem usuários cadastrados.' 
    //   })
    // } 

    return user
  }

  /**
   * Update user details.
   * PUT or PATCH user/:id
   */
  async update ({ params, request, response }) {
    const user = await User.find(params.id)
    const data = request.only([
      "name", 
      "company_id",
      "email", 
      "password",
      "username",
      "birthday",
      "isAdmin"
    ])

    // if (!data['name'] || !data['company_id'] || !data['email'] || !data['password'] || 
    // !data['username'] || !data['birthday'] || !data['isAdmin']) {

    //   response.status(200).json({ 
    //     data: 'Necessário preencher os campos.'
    //   })
    // } else {
      user.merge(data)
      if (user) {
        response.status(200).json({
          success: true,
          data: user['id']
        })
        await user.save()
      } else {
        response.status(304).send({ success: false, data: 'User Not Updated' })
      }
    // }
  }

  /**
   * Delete a user with id.
   * DELETE user/:id
   */
  async destroy ({ params, response }) {
      // retrieve the data by given id
      const user = await User.find(params.id)
       if (user) {
         response.status(200).json({
           success: true,
           data: user['id']
         })
         await user.delete()
       }else {
         response.status(404).send({ success: false, data: 'User Not Found' })
       }
  }
}

module.exports = UserController