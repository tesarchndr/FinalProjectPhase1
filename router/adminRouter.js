const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.admin)
router.get('/add', Controller.addMasseusGet)
router.post('/add', Controller.addMasseusPost)
router.get('/:id/edit', Controller.editMasseusGet)
router.post('/:id/edit', Controller.editMasseusPost)
router.get('/:id/delete', Controller.deleteMasseus)

module.exports = router