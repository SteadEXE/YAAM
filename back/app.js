const Updater = require('./Updater')
const Server = require('./classes/Server')
const Servers = require('./stores/Servers')
const Config = require('./Config')
const Webservice = require('./webservice/Webservice')

async function main() {
    Webservice.init()

    // Load servers.
    for (let serverData of Config.get('servers')) {
        Servers[serverData.id] = new Server(serverData.id)
    }

    if (Config.get('updater.enabled').value()) {
        // Update game.
        await Updater.update()

        Updater.enable()
    }

    // Turn on monitoring
    for (let uuid in Servers) {
        Servers[uuid].ping()
    }
}

main()