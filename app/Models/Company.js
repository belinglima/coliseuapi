'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Company extends Model {
    images () {
        return this.hasMany('App/Models/ImageCompany')
    }

    users () {
        return this.hasMany('App/Models/User')
    }

    evaluations () {
    	return this.hasMany('App/Models/Evaluation')
    }
}

module.exports = Company
