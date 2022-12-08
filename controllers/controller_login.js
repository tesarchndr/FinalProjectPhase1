const bcrypt = require('bcryptjs')
const { User } = require('../models')

class Controller {
    static get_home(req, res) {
        res.render('home')
    }

    static get_register(req, res) {
        res.render('register')
    }

    static post_register(req, res) {
        const { username, password, email, phone, address, name } = req.body
        User.create({ username, password, email, phone, address, name })
        .then((user) => {
                // greetings berhasil buat akun
                res.redirect('/login')
            }
        ).catch((user) => {
            res.send(err)
        })
    }

    static get_login(req, res) {
        res.render('login')
    }

    static post_login(req, res) {
        const { username, password } = req.body

        User.findOne({ where: { username } })
        .then((usr) => {
            if (bcrypt.compareSync(password, usr.password)) { res.redirect('/') } 
            else { res.redirect(`/login?errors=${`Invalid password`}`) }
        }).catch((err) => { res.redirect(`/login?errors=${`Username not found`}`) })
    }
}

module.exports = Controller