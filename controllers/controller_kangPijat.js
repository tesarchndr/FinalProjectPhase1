const { Masseus, Order, Testimony } = require('../models')
const { Op } = require('sequelize')
const { formatRating } = require('../helpers/index')
const Swal = require('sweetalert2')


class Controller {
    static kangPijet(req, response) {
        const { errors } = req.query
        const { username, isAdmin } = req.session
        const user_name = req.session.name
        const { name, category, gender, sortBy } = req.query
        let search = {}

        search = { name, category, gender, sortBy }

        let option = { where: {} }
        if (name) { option.where.name = { [Op.iLike]: `%${name}%` } }
        if (category) { option.where.category = category }
        if (gender) { option.where.gender = gender }
        if (sortBy && sortBy === "hargaTerendah") { option.order = [['price', 'ASC']] }
        if (sortBy && sortBy === "hargaTertinggi") { option.order = [['price', 'DESC']] }

        Masseus.findAll(option)
            .then(data => {
                response.render('kangPijet', { data, formatRupiah, name: user_name, isAdmin, search, err: !errors ? null : errors })
            })
            .catch(err => {
                response.redirect(err)
            })
    }


    // static kangPijetId(req, response) {
    //     const { username, isAdmin, name } = req.session
    //     console.log({ username, isAdmin, name })
    //     const { id } = req.params
    //     if (username) {
    //         Masseus.findOne({ where: { id } })
    //             .then(data => {
    //                 response.render('kangPijetId', { data, name, isAdmin, id })
    //             })
    //             .catch(err => {
    //                 response.send(err)
    //             })
    //     } else {
    //         const err = 'Access Denied'
    //         response.redirect(`/kang-pijet?errors=${err}`)
    //     }
    // }

    static kangPijetId(req, response) {
        const { username, isAdmin, name, user_id } = req.session
        const { id } = req.params
        if (username) {
            let data
            Masseus.findOne(
                {
                    where: { id },
                    include: Testimony
                },
            )
                .then(result => {
                    data = result
                    // console.log(data);
                    // console.log(data.Testimonies);
                    return Masseus.findOne({
                        where: { id },
                        include: {
                            model: Testimony,
                            where: {
                                likeStatus: true
                            }
                        }
                    })
                })
                .then(dataLike => {
                    // console.log(dataLike);
                    response.render('kangPijetId', { data, isAdmin, name, dataLike, formatRating })
                })
                .catch(err => {
                    console.log(err);
                    response.send(err)
                })
        } else {
            const err = 'Access Denied'
            response.redirect(`/kang-pijet?errors=${err}`)
        }
    }

    static get_kangPijetIdOrder(req, response) {
        const { username, isAdmin, name, user_id } = req.session
        const { id } = req.params
        response.render('kangPijetId_order', { username, isAdmin, name, id })
    }


    static kangPijetIdOrder(req, response) {
        const { username, isAdmin, name, user_id } = req.session
        const { id } = req.params
        const { orderDate, duration } = req.body
        if (username) {
            Order.create({ UserId: user_id, MasseuId: id, orderDate, duration })
                .then((_) => {
                    console.log({ username, isAdmin, name, id })
                    response.render('order_process', { username, isAdmin, name, id })
                })
                .catch(err => {
                    response.send(err)
                })
        } else {
            response.redirect('/login')
        }
    }

    static testimoniGet(req, response) {
        const { errors } = req.query
        const { username, isAdmin, name, user_id } = req.session
        const id = req.params.id
        Masseus.findOne({ where: { id } })
            .then(data => {
                if (errors) {
                    response.render('addTestimoni', { data, isAdmin, name, err: JSON.parse(errors) })
                } else {
                    response.render('addTestimoni', { data, isAdmin, name, err: {} })
                }
            })
            .catch(err => {
                response.send(err)
            })
    }
    static testimoniPost(req, response) {
        const id = req.params.id
        const { username, isAdmin, name, user_id } = req.session
        const { message, likeStatus } = req.body
        Testimony.create({ MasseuId: id, message, likeStatus })
            .then((_) => {
                response.redirect(`/kang-pijet/${id}`)
            }).catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    let errors = {}
                    err.errors.forEach(el => {
                        errors[el.path] = el.message
                    })
                    response.redirect(`/kang-pijet/${id}/testimoni?errors=${JSON.stringify(errors)}`)
                } else {
                    response.send(err)

                }
            });
    }
}

module.exports = Controller