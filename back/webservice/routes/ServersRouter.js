const express = require('express')
const Router = express.Router()
const ServersController = require('../controllers/ServersController')

Router.get('/api/servers', ServersController.all)
Router.post('/api/servers/create', ServersController.create)
Router.post('/api/servers/:uuid/delete', ServersController.delete)
Router.get('/api/servers/:uuid/update', ServersController.readConfiguration)
Router.post('/api/servers/:uuid/update', ServersController.updateConfiguration)

module.exports = Router