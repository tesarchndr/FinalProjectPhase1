const { masseus } = require('../models')
const {Op} = require('sequelize')
const {formatRupiah} = require('../helpers/index')


class Controller {
    static kangPijet(req, response){
        masseus.findAll()
        .then(data => {
            response.render('kangPijet', {data , formatRupiah})
        })
        .catch(err => {
            response.redirect(err)
        })
    }
    static kangPijetId(req, response){
        const {id} = req.params
        masseus.findOne({where: {id} })
        .then(data => {
            response.render('kangPijetId', {data})
        })
        .catch(err => {
            response.send(err)
        })
    }
}

module.exports = Controller