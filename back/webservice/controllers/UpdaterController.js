const fs = require('fs')
const Config = require('../../Config')
const Updater = require('../../Updater')

class UpdaterController {
    async read (req, res) {
        res.json(Config.get('updater').value())
    }

    async update (req, res) {
        if (!fs.existsSync(req.body.steam)) {
            return res.json({
                status: 'error',
                message: 'Wrong steamcmd executable path.'
            })
        }

        Config.get('updater')
            .set('enabled', req.body.enabled === 'true')
            .set('interval', req.body.interval)
            .set('steam', req.body.steam)
            .write()

        if (req.body.enable) {
            Updater.enable()
        } else {
            Updater.disable()
        }

        return res.json({
            status: 'ok',
            payload: Config.get('updater').value()
        })
    }

    async logs (req, res) {
        return res.end(Updater.logs)
    }
}

module.exports = new UpdaterController