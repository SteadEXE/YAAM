const fs = require('fs')
const Config = require('../../Config')

class ConfigurationController {
    read (req, res) {
        res.json({
            status: 'ok',
            payload: Config.get('configuration').value()
        })
    }

    update (req, res) {
        if (req.body.atlas !== '' && !fs.existsSync(req.body.atlas)) {
            return res.json({
                status: 'error',
                message: `Cannot find executable: ${req.body.atlas}`
            })
        }

        Config.set('configuration.atlas', req.body.atlas)
            .set('configuration.username', req.body.username)
            .set('configuration.password', req.body.password)
            .write()

        res.json({
            status: 'ok',
            payload: Config.get('configuration').value()
        })
    }
}

module.exports = new ConfigurationController()