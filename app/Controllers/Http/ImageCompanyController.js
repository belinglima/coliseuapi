'use strict'

const Helpers = use('Helpers')
const Company = use('App/Models/Company')

/**
 * Resourceful controller for interacting with images
 */
class ImageCompanyController {
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  /**
   * Create/save a new image.
   * POST images
   */
  async store ({ params, request, response }) {
    const company = await Company.findOrFail(params.id)

    const images = request.file('image', {
      types: ['image'],
      size: '30mb'
    })

    await images.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }))

    if (!images.movedAll()) {
      return images.errors()
    }

    await Promise.all(
      images
        .movedList()
        .map(image => company.images().create({ path: image.fileName }))
    )

    if(!company){
      return response.status(404).json({
        success: false
      })
    }

    return response.status(201).json({
      success: true
    })
  }
}

module.exports = ImageCompanyController