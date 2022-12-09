const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller_kangPijat')

router.get('/', Controller.kangPijet)
router.get('/:id', Controller.kangPijetId)
router.get('/:id/testimoni', Controller.testimoniGet)
router.post('/:id/testimoni', Controller.testimoniPost)
router.get('/:id/order', Controller.get_kangPijetIdOrder)
router.post('/:id/order', Controller.kangPijetIdOrder)

module.exports = router