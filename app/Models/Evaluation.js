'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Evaluation extends Model {
    user () {
        return this.manyThrough('App/Models/User','evaluation')
    }

    weight () {
        return this.hasMany('App/Models/Weight')
    }

    images () {
        return this.hasMany('App/Models/ImageEvaluation')
    }
}

module.exports = Evaluation
