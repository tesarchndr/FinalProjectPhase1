const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller_kangPijat')

router.get('/', Controller.kangPijet)
router.get('/:id', Controller.kangPijetId)
router.get('/:id/testimoni', Controller.testimoniGet)
router.post('/:id/testimoni', Controller.testimoniPost)
// router.post('/:id/order', Controller.kangPijetIdOrder)
// router.get('/:id/waktu', Controller.kangPijetId_order)

module.exports = router