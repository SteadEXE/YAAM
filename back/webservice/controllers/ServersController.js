const uuid = require('uuid/v4')
const Config = require('../../Config')
const Server = require('../../classes/Server')
const Servers = require('../../stores/Servers')

class ServersController {
    async all (req, res) {
        let payload = []

        for (let server in Servers) {
            payload.push(Servers[server].export())
        }

        res.json({
            status: 'ok',
            payload: payload
        })
    }

    async create (req, res) {
        let id = uuid()

        Config.get('servers')
            .push({
                id: id,
                ip: req.body.ip,
                port: req.body.port,
                queryPort: req.body.queryPort,
                rconPassword: req.body.rconPassword,
                rconPort: req.body.rconPort,
                parameters: req.body.parameters,
                extraParameters: req.body.extraParameters,
                managed: req.body.managed
            })
            .write()

        // Start monitoring on this server.
        Servers[id] = new Server(id)
        Servers[id].ping()

        res.json({ status: 'ok' })
    }

    async delete (req, res) {
        let id = req.params.uuid

        Config.get('servers')
            .remove({ id: id })
            .write()

        // Kill the server.
        await Servers[id].kill()
        delete Servers[id]

        res.json({
            status: 'ok'
        })
    }

    async readConfiguration (req, res) {
        const configuration = Config.get('servers')
            .find({ id: req.params.uuid })
            .value()

        res.json({
            status: 'ok',
            payload: configuration
        })
    }

    async updateConfiguration (req, res) {
        Config.get('servers')
            .find({ id: req.params.uuid })
            .set('ip', req.body.ip)
            .set('port', req.body.port)
            .set('queryPort', req.body.queryPort)
            .set('rconPort', req.body.rconPort)
            .set('rconPassword', req.body.rconPassword)
            .set('parameters', req.body.parameters)
            .set('extraParameters', req.body.extraParameters)
            .set('managed', req.body.managed)
            .write()

        const configuration = Config.get('servers')
            .find({ id: req.params.uuid })
            .value()

        Servers[req.params.uuid].load()

        res.json({
            status: 'ok',
            payload: configuration
        })
    }
}

module.exports = new ServersController()