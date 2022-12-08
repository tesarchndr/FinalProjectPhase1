const {masseus, Profile, User} = require('../models')
const {Op} = require('sequelize')

class Controller{
    static home(req, response){
        response.render('home')
    }

    static admin(req, response){
        const {search} = req.query
        let option = {
            where: {}
        }
        if (search) {
            option.where.name = {
                [Op.iLike] : `%${search}%`
            }
        }
        masseus.findAll(option)
        .then(data => {
            response.render('admin', {data})
        })
    }

    static addMasseusGet(req, response){
        response.render('addMasseus')
    }
    static addMasseusPost(req, response){
        const {name, gender, category, location, rating, price, img} = req.body
        masseus.create({name, gender, category, location, rating, price, img})
        .then (()=> {
            response.redirect('/admin')
        })
        .catch(err => {
            response.send(err)
        })
    }
    static editMasseusGet(req,response){
        const id = req.params.id
        masseus.findByPk(id)
        .then (data => {
            console.log(data);
            response.render('editMasseus', {data})
        })
        .catch(err => {
            response.send(err)
        })
    }
    static editMasseusPost(req,response){
        const id = req.params.id
        const {name, gender, category, location, rating, price, img} = req.body
        console.log(req.body, id);
        masseus.update({name, gender, category, location, rating, price, img},{where: {id}})
        .then (()=> {
            response.redirect('/admin')
        })
        .catch(err => {
            response.send(err)
        })
    }
    static deleteMasseus(req, response){
        const id = req.params.id
        masseus.destroy({where: {id}})
        .then(()=> {
            response.redirect('/admin')
        })
        .catch(err => {
            response.send(err)
        })

    }
}

module.exports = Controller