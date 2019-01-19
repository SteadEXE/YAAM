const express = require('express')
const Router = express.Router()
const ConfigurarionController = require('../controllers/ConfigurationController')

Router.get('/api/configuration', ConfigurarionController.read)
Router.post('/api/configuration', ConfigurarionController.update)

module.exports = Router