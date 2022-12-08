const { Masseus, Order, Testimony } = require('../models')
const { Op } = require('sequelize')
const { formatRupiah } = require('../helpers/index')
const Swal = require('sweetalert2')
const { default: swal } = require('sweetalert')


class Controller {
    static kangPijet(req, response){
        const { username, isAdmin } = req.session
        const user_name = req.session.name
        const {name, category, gender, sortBy} = req.query
        let option = {
            where : {
            }
        }
        if(name) {
            option.where.name = {
                [Op.iLike] : `%${name}%`
            }
        }
        if(category) {
            option.where.category = category
        }
        if (gender) {
            option.where.gender = gender
        }
        if (sortBy && sortBy === "hargaTerendah") {
            option.order = [['price', 'ASC']]
        } 
        if (sortBy && sortBy === "hargaTertinggi") {
            option.order = [['price', 'DESC']]
        }
        console.log(option);
        Masseus.findAll(option)
        .then(data => {
            response.render('kangPijet', {data , formatRupiah, name:user_name, isAdmin})
        })
        .catch(err => {
            response.redirect(err)
        })
    }


    static kangPijetId_order(req, response) {
        const { username, isAdmin, name } = req.session
        const { id } = req.params
        if (username) {
            Masseus.findOne({ where: { id } })
                .then(data => {
                    response.render('kangPijetId', { data, name, isAdmin, id })
                })
                .catch(err => {
                    response.send(err)
                })
        } else {
            response.redirect('/login')
        }
    }

    static kangPijetId(req, response){
        const { username, isAdmin, name, user_id } = req.session
        const {id} = req.params
        if (isAdmin){
            Masseus.findOne(
                {where:{id},
                include: Testimony},
            )
            .then(data => {
                console.log(data.Testimonies);
                response.render('kangPijetId', {data, isAdmin, name })
            })
            .catch(err => {
                console.log(err);
                response.send(err)
            })
        } else {
            response.redirect('/login')
        }
    }

    static kangPijetIdOrder(req, response) {
        const { username, isAdmin, name, user_id } = req.session
        const { id } = req.params
        const { orderDate, duration } = req.body
        console.log({ UserId: user_id, MasseusId: id, orderDate, duration })
        if (username) {
            Order.create({ UserId: user_id, MasseusId: id, orderDate, duration })
                .then((_) => {
                    response.render('order_process', { username, isAdmin, name })
                })
                .catch(err => {
                    response.send(err)
                })
        } else {
            response.redirect('/login')
        }
    }

    static testimoniGet (req, response){
        const { username, isAdmin, name, user_id } = req.session
        const id = req.params.id
        Masseus.findOne({where: {id}})
        .then(data => {
            response.render('addTestimoni', {data, isAdmin, name })
        })
        .catch(err => {
            response.send(err)
        })
    }
    static testimoniPost (req, response){
        const id = req.params.id
        const { username, isAdmin, name, user_id } = req.session
        const { message } = req.body
        Testimony.create({MasseuId: id, message, likeStatus: false})
        .then((_) => {
            response.redirect(`/kang-pijet/${id}`)
        }).catch((err) => {
            response.send(err)
        });

    }

}

module.exports = Controller