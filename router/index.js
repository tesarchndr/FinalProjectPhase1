const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const routerAdmin = require('./adminRouter')
const routerKangPijat = require('./kangPijatRouter')

router.get('/', Controller.home)
router.use('/admin', routerAdmin)
router.use('/kang-pijet', routerKangPijat)


module.exports = router