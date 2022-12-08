const { Masseus, Profile, User } = require('../models')
const { Op } = require('sequelize')


class Controller {
    static home(req, response) {
        const { username, isAdmin, name } = req.session
        const option = {}
        if (username) {
            option.where = { username }
        }

        User.findAll(option)
            .then((data) => {
                if (!username) {
                    response.render('home', { name:null, isAdmin:null})
                } else {
                    const name = data[0].name
                    req.session.name = name
                    response.render('home', { name, isAdmin })
                }
            }).catch((err) => {
                response.send(err)
            });
    }

    static admin(req, response) {
        const { username, isAdmin, name } = req.session
        const { search } = req.query
        if (req.session.isAdmin) {
            let option = {
                where: {}
            }
            if (search) {
                option.where.name = {
                    [Op.iLike]: `%${search}%`
                }
            }
            Masseus.findAll(option)
                .then(data => {
                    response.render('admin', { data, name, isAdmin })
                })
        } else {
            response.redirect('/login')
        }
    }


    static addMasseusGet(req, response) {
        const { username, isAdmin, name } = req.session
        const errors = req.query.errors
        if (errors) {
            response.render('addMasseus', { name, isAdmin, err: JSON.parse(errors)})
        } else {
            response.render('addMasseus', { name, isAdmin , err: {}})
        }

        console.log(errors);
    }

    static addMasseusPost(req, response) {
        const { name, gender, category, location, rating, price, img } = req.body
        Masseus.create({ name, gender, category, location, rating, price, img })
            .then(() => {
                response.redirect('/admin')
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    let errors = {}
                    err.errors.forEach(el => {
                        errors[el.path] = el.message
                    })
                    response.redirect(`/admin/add?errors=${JSON.stringify(errors)}`)
                } else {
                    response.send(err)
                }
            })
    }

    static editMasseusGet(req, response) {
        const { username, isAdmin, name } = req.session
        const id = req.params.id
        Masseus.findByPk(id)
            .then(data => {
                console.log(data);
                response.render('editMasseus', { data, name, isAdmin })
            })
            .catch(err => {
                response.send(err)
            })
    }
    static editMasseusPost(req, response) {
        const id = req.params.id
        const { name, gender, category, location, rating, price, img } = req.body
        console.log(req.body, id);
        Masseus.update({ name, gender, category, location, rating, price, img }, { where: { id } })
            .then(() => {
                response.redirect('/admin')
            })
            .catch(err => {
                response.send(err)
            })
    }
    static deleteMasseus(req, response) {
        const id = req.params.id
        Masseus.destroy({ where: { id } })
            .then(() => {
                response.redirect('/admin')
            })
            .catch(err => {
                response.send(err)
            })

    }
}

module.exports = Controller