'use strict'

const Model = use('Model')
const Env = use('Env')

class ImageCompany extends Model {
    static get computed () {
        return ['url']
      }
    
      getUrl ({ path }) {
        return `${Env.get('APP_URL')}/image/${path}`
      }
}

module.exports = ImageCompany