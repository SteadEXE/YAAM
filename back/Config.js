const fs = require('fs')
const path = require('path')
const low = require('lowdb')

if (!fs.existsSync(path.resolve(process.cwd(), 'config'))) {
    fs.mkdirSync(path.resolve(process.cwd(), 'config'))
}

const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./config/config.json')
const db = low(adapter)

db.defaults({
    updater: {
        interval: 5,
        enabled: false,
        steam: ''
    },
    configuration: {
        atlas: '',
        username: 'admin',
        password: 'admin',
        bindAddress: '0.0.0.0',
        bindPort: '3000'
    },
    servers: []
})
.write()

module.exports = db