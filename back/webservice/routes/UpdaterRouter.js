const express = require('express')
const Router = express.Router()
const UpdaterController = require('../controllers/UpdaterController')

Router.get('/api/updater', UpdaterController.read)
Router.post('/api/updater', UpdaterController.update)
Router.get('/api/updater/logs', UpdaterController.logs)

module.exports = Router