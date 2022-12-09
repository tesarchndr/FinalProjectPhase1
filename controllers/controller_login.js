const bcrypt = require('bcryptjs')
const { User } = require('../models')

class Controller {
    static get_register(req, res) {
        const err_validation = req.query.errors
        if (err_validation) {
            res.render('register', { name:null, isAdmin:null, err:JSON.parse(err_validation)}) 
        } else {
            res.render('register', { name:null, isAdmin:null, err:{}}) 
        }
    }

    static post_register(req, res) {
        const { username, password, email, phone, address, name } = req.body
        User.create({ username, password, email, phone, address, name })
        .then((user) => {
                res.redirect('/login')
            }
        ).catch((err) => {
            if (err.name === "SequelizeValidationError"){
                const err_validation = {}
                err.errors.forEach(el => {
                    err_validation[el.path] = el.message
                });
                // res.send(err)
                res.redirect(`/register?errors=${JSON.stringify(err_validation)}`)
            } else {
                res.send(err)
            }
        })
    }

    static get_login(req, res) {
        const err_validation = req.query.errors
        if (err_validation) {
            res.render('login', { name:null, isAdmin:null, err:JSON.parse(err_validation)}) 
        } else {
            res.render('login', { name:null, isAdmin:null, err:null}) 
        }
    }

    static post_login(req, res) {
        const { username, password } = req.body

        User.findOne({ where: { username } })
        .then((usr) => {
            if (bcrypt.compareSync(password, usr.password)) { 
                req.session.username = username
                req.session.isAdmin = usr.isAdmin
                req.session.user_id = usr.id
                res.redirect('/') 
            }
            else {
                err = {password:`Invalid password`} 
                res.redirect(`/login?errors=${JSON.stringify(err)}`) }
        }).catch((err) => {
            err = {username:`Username not found`} 
            res.redirect(`/login?errors=${JSON.stringify(err)}`)
        })
    }

    static get_logout(req, res){
        req.session.destroy((err) => {
            if (err) {res.send(err)}
            else {res.redirect('/')}
        })
    }
}

module.exports = Controller