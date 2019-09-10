const Weight = use('App/Models/Weight')

/**
 * Resourceful controller for interacting with user
 */
class WeightController {
  /**
   * Show a list of all user.
   * GET user
   */
  async index () {
    const weight = Weight.query()
    return weight 
  }

  /**
   * Create/save a new user.
   * POST user
   */
  // async store ({ request, response }) {}
  async store ({ request, response }) {
    const data = request.only([
      "evaluation_id",
      "antebraco",
      "bracoRelachado",
      "bracoContraido",
      "coxaProximal",
      "coxaMedial",
      "coxaDistal",
      "panturrilha",
      "abdomen",
      "ombro",
      "cintura",
      "altura",
      "peso"

    ])
    const weight = await Weight.findOrCreate(data)
    if (weight) {
      response.status(201).json({
        success: 'Created Weight',
        data: data
      })
    } else {
      response.status(204).send({ error: 'Weight Not Created' })
    }
  }

  /**
   * Display a single user.
   * GET user/:id
   */
  async show ({ params }) {
    const weight = await Weight.find(params.id)
    return weight
  }

  /**
   * Update user details.
   * PUT or PATCH user/:id
   */
  async update ({ params, request, response }) {
    const weight = await Weight.find(params.id)
    const data = request.only([
        "evaluation_id",
        "antebraco",
        "bracoRelachado",
        "bracoContraido",
        "coxaProximal",
        "coxaMedial",
        "coxaDistal",
        "panturrilha",
        "abdomen",
        "ombro",
        "cintura",
        "altura",
        "peso"
    ])
    weight.merge(data)
    if (weight) {
      response.status(200).json({
        success: 'Weight Updated',
        data: data
      })
      await weight.save()
    } else {
      response.status(304).send({ error: 'Weight Not Updated' })
    }
  }

  /**
   * Delete a user with id.
   * DELETE user/:id
   */
  async destroy ({ params, response }) {
      // retrieve the data by given id
      const weight = await Weight.find(params.id)
       if (weight) {
         response.status(200).json({
           success: 'Deleted Weight',
           data: weight
         })
         await weight.delete()
       }else {
         response.status(404).send({ error: 'Weight Not Found' })
       }
  }
}

module.exports = WeightController