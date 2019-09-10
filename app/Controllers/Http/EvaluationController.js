const Evaluation = use('App/Models/Evaluation')

/**
 * Resourceful controller for interacting with user
 */
class EvaluationController {
  /**
   * Show a list of all user.
   * GET user
   */
  async index () {
    const evaluation = Evaluation.query()
    .with('images')
    .with('weight')
    .fetch()
    return evaluation 
  }

  /**
   * Create/save a new user.
   * POST user
   */
  // async store ({ request, response }) {}
  async store ({ request, response }) {
    const data = request.only([
      "user_id", 
      "valorPago"
    ])
    const evaluation = await Evaluation.findOrCreate(data)
    if (evaluation) {
      response.status(201).json({
        success: 'Created Evaluation',
        data: data
      })
    } else {
      response.status(204).send({ error: 'Evaluation Not Created' })
    }
  }

  /**
   * Display a single user.
   * GET user/:id
   */
  async show ({ params }) {
    const evaluation = await Evaluation.find(params.id)
    await evaluation.loadMany(['images', 'weight'])
    return evaluation
  }

  /**
   * Update user details.
   * PUT or PATCH user/:id
   */
  async update ({ params, request, response }) {
    const evaluation = await Evaluation.find(params.id)
    const data = request.only([
      "user_id", 
      "valorPago"
    ])
    evaluation.merge(data)
    if (evaluation) {
      response.status(200).json({
        success: 'Evaluation Updated',
        data: data
      })
      await evaluation.save()
    } else {
      response.status(304).send({ error: 'Evaluation Not Updated' })
    }
  }

  /**
   * Delete a user with id.
   * DELETE user/:id
   */
  async destroy ({ params, response }) {
      // retrieve the data by given id
      const evaluation = await Evaluation.find(params.id)
       if (evaluation) {
         response.status(200).json({
           success: 'Deleted Evaluation',
           data: evaluation
         })
         await evaluation.delete()
       }else {
         response.status(404).send({ error: 'Evaluation Not Found' })
       }
  }
}

module.exports = EvaluationController