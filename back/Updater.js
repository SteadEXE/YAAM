const child_process = require('child_process')
const fs = require('fs')
const Config = require('./Config')
const Console = require('./Console')
const Servers = require('./stores/Servers')
const path = require('path')

class Updater {
    constructor() {
        this.timer = null
        this.logs = ''
    }

    update () {
        return new Promise((resolve) => {
            if (!fs.existsSync(Config.get('configuration.atlas').value())) {
                return
            }

            Console.Log('UPDATER', 'Starting SteamCmd...')

            const atlas = path.resolve(path.dirname(Config.get('configuration.atlas').value()), '../../../')
            let output = ''

            const steamcmd = child_process.spawn(Config.get('updater.steam').value(), [
                '+login', 'anonymous',
                '+force_install_dir', atlas,
                '+app_update', '1006030',
                '+quit'
            ])

            steamcmd.stdout.on('data', data => {
                output += data
                this.logs = output
            })

            steamcmd.on('close', () => {
                if (output.indexOf("Success! App '1006030' already up to date.") > -1) {
                    Console.Log('UPDATER', 'Server is already up to date.')

                    resolve(false)
                } else if (output.indexOf("Success! App '1006030' fully installed.") > -1) {
                    Console.Log('UPDATER', 'Server successfully updated.')

                    resolve(true)
                }
            })
        })
    }

    restartServers () {
        return new Promise((resolve) => {
            for (let uuid in Servers) {
                if (Servers[uuid].managed) {
                    Servers[uuid].command('ServerChat Le serveur va redémarrer dans 5 minutes pour effectuer une mise à jour. Merci de votre compréhension.')
                        .then(message => {
                            Console.Log('RCON', message)
                        })
                        .catch(message => {
                            Console.Log('RCON', message)
                        })
                }
            }

            // Start servers after five minutes.
            setTimeout(() => {
                for (let uuid in Servers) {
                    if (Servers[uuid].managed) {
                        Servers[uuid].command('DoExit')
                            .then(message => {
                                Console.Log('RCON', message)
                            })
                            .catch(message => {
                                Console.Log('RCON', message)
                            })
                    }
                }

                resolve()
            }, 5 * 60 * 1000)
        })
    }

    async check () {
        let updated = await this.update()

        if (updated) {
            await this.restartServers()
        }

        this.timer = setTimeout(this.check.bind(this), Config.get('updater.interval').value() * 60 * 1000)
    }

    enable () {
        this.disable()

        this.timer = setTimeout(this.check.bind(this), Config.get('updater.interval').value() * 60 * 1000)
    }

    disable () {
        if (this.timer !== null) {
            clearTimeout(this.timer)
        }
    }
}

module.exports = new Updater