const Evaluation = use('App/Models/Evaluation')

/**
 * Resourceful controller for interacting with evaluation
 */
class EvaluationController {
  /**
   * Show a list of all evaluations.
   * GET evaluation
   */
  async index ({response}) {
      const evaluation = await Evaluation.query()
      .with('images')
      .with('weight')
      .fetch()

      if(evaluation.rows.length === 0 ) {
        response.status(404).json({ 
          evaluation: 'Não existem Avaliações cadastradas.',
          data: false 
        })
      } 
      
      return evaluation    
  }

  /**
   * Create/save a new evaluation.
   * POST 
   */
  async store ({ request, response }) {
    
    const data = request.only([
      'user_id', 
      'valorPago',
    ])

    if (!data['user_id'] || !data['valorPago']) {
      response.status(200).json({ 
        data: 'Necessário preencher os campos.' 
      })
    } else {
      const evaluation = await Evaluation.findOrCreate(data);
      if (evaluation) {
        response.status(201).json({
          success: true,
          data: evaluation['id']
        })
      } else {
        response.status(204).send({ success: false, data: 'Evaluation Not Created' })
      }
    }
  }
    
  
  /**
   * Display a single user.
   * GET user/:id
   */
  async show ({ params, response }) {

    const evaluation = await Evaluation.find(params.id)
    await evaluation.loadMany(['images', 'weight'])

    if(evaluation.rows === 0 ) {
      response.status(404).json({ 
        evaluation: 'Não existem Avaliações cadastradas.' 
      })
    } 

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

    if(!data['user_id'] || !data['valorPago']){
      response.status(200).json({ 
        data: 'Necessário preencher os campos.' 
      })
    }

    evaluation.merge(data)
    if (evaluation) {
      response.status(200).json({
        success: true,
        data: evaluation['id']
      })
      await evaluation.save()
    } else {
      response.status(304).send({ success: false })
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
           success: true,
           data: evaluation
         })
         await evaluation.delete()
       }else {
         response.status(404).send({ error: 'Evaluation Not Found' })
       }
  }
}

module.exports = EvaluationController