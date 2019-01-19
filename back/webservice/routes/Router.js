const express = require('express')
const Router = express.Router()
const ServersRouter = require('./ServersRouter')
const ConfigurationRouter = require('./ConfigurationRouter')
const UpdaterRouter = require('./UpdaterRouter')

Router.use(ServersRouter)
Router.use(ConfigurationRouter)
Router.use(UpdaterRouter)

module.exports = Router