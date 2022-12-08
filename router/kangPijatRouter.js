const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller_kangPijat')

router.get('/', Controller.kangPijet)
router.get('/:id', Controller.kangPijetId)

module.exports = router