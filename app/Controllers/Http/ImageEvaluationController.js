'use strict'

const Helpers = use('Helpers')
const Evalualuation = use('App/Models/Evaluation')

/**
 * Resourceful controller for interacting with images
 */
class ImageEvaluationController {
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  /**
   * Create/save a new image.
   * POST images
   */
  async store ({ params, request, response }) {
    const evalualuation = await Evalualuation.find(params.id)

    const images = request.file('image', {
      types: ['image'],
      size: '30mb'
    })

    if(images){
      await images.moveAll(Helpers.tmpPath('/uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }))
    }

    if (!images.movedAll()) {
      return images.errors()
    }

    await Promise.all(
      images
        .movedList()
        .map(image => evalualuation.images().create({ path: image.fileName }))
    )
    
    if(!evalualuation){
      return response.status(404).json({
        success: false
      })
    }
    
     return response.status(201).json({
      success: true
    })
  }
}

module.exports = ImageEvaluationController