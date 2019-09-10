const Company = use('App/Models/Company')

/**
 * Resourceful controller for interacting with user
 */
class CompanyController {
  /**
   * Show a list of all user.
   * GET user
   */
  async index () {
    const company = Company.query()
    .with('images')
    .with('users')
    .fetch()
    return company 
  }

  /**
   * Create/save a new user.
   * POST user
   */
  // async store ({ request, response }) {}
  async store ({ request, response }) {
    const data = request.only([
      "name", 
      "telephone", 
      "address",
      "cpfCnpj"
    ])
    const company = await Company.findOrCreate(data)
    if (company) {
      response.status(201).json({
        success: 'Created Company',
        data: data
      })
    } else {
      response.status(204).send({ error: 'Company Not Created' })
    }
  }

  /**
   * Display a single user.
   * GET user/:id
   */
  async show ({ params }) {
    const company = await Company.find(params.id)
    await company.loadMany(['images', 'users'])
    return company
  }

  /**
   * Update user details.
   * PUT or PATCH user/:id
   */
  async update ({ params, request, response }) {
    const company = await Company.find(params.id)
    const data = request.only([
      "name", 
      "telephone", 
      "address",
      "cpfCnpj"
    ])
    company.merge(data)
    if (company) {
      response.status(200).json({
        success: 'Company Updated',
        data: data
      })
      await company.save()
    } else {
      response.status(304).send({ error: 'Coompany Not Updated' })
    }
  }

  /**
   * Delete a user with id.
   * DELETE user/:id
   */
  async destroy ({ params, response }) {
      // retrieve the data by given id
      const company = await Company.find(params.id)
       if (company) {
         response.status(200).json({
           success: 'Deleted Company',
           data: company
         })
         await company.delete()
       }else {
         response.status(404).send({ error: 'Company Not Found' })
       }
  }
}

module.exports = CompanyController