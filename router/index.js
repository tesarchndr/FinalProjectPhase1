const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const routerAdmin = require('./adminRouter')

router.get('/', Controller.home)
router.use('/admin', routerAdmin)

module.exports = router