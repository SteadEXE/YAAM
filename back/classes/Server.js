const child_process = require('child_process')
const Gamedig = require('gamedig')
const Rcon = require('../rcon/Rcon')
const Config = require('../Config')
const Console = require('../Console')

class Server {
    constructor (id) {
        this._id = id
        this._ip = ''
        this._port = ''
        this._queryPort = ''
        this._rconPort = ''
        this._rconPassword = ''
        this._parameters = ''
        this._extraParameters = ''
        this._managed = false

        this._name = '-'
        this._players = '-'
        this._maxPlayers = '-'

        this._status = 'offline'

        this._process = null

        this.load()
    }

    load () {
        const serverData = Config.get('servers').find({ id: this.id }).value()

        this.ip = serverData.ip
        this.port = serverData.port
        this.queryPort = serverData.queryPort
        this.parameters = serverData.parameters
        this.rconPort = serverData.rconPort
        this.rconPassword = serverData.rconPassword
        this.extraParameters = serverData.extraParameters
        this.managed = serverData.managed
    }

    ping () {
        Gamedig.query({
            type: 'protocol-valve',
            host: this.ip,
            port: this.queryPort
        })
        .then((state) => {
            this.name = state.name
            this.players = state.players.length
            this.maxPlayers = state.maxplayers

            this.status = 'online'

            setTimeout(() => {
                this.ping()
            }, 10 * 1000)
        })
        .catch(async (error) => {
            if (this.status !== 'starting') {
                // To-do kill & restart process
                this.status = 'offline'

                if (this.managed) {
                    Console.Log('MONITORING', `Server ${this.ip}:${this.port} is offline, trying to cycle it.`)

                    await this.kill()
                    this.start()
                }
            }

            setTimeout(() => {
                this.ping()
            }, 10 * 1000)
        })
    }

    kill () {
        return new Promise((resolve, reject) => {
            // Send a soft kill command to tell the process to stop.
            if (this.process !== null) {
                this.process.kill('SIGINT')

                // Do not wait the 10 seconds if process closed before force-kill.
                this.process.on('close', () => {
                    clearTimeout(this._killTimer)

                    resolve()
                })
            }

            if (this.process !== null) {
                this._killTimer = setTimeout(() => {
                    // If process is still alive, it probably crashed so kill it.
                    this.process.kill('SIGKILL')

                    resolve()
                }, 10 * 1000)
            }

            if (this.process === null) {
                resolve()
            }
        })
    }

    start () {
        if (this.process !== null) {
            return
        }

        this.status = 'starting'

        let parameters = [ ]

        parameters = this.extraParameters.split(' ')
        parameters.unshift(this.parameters)

        this.process = child_process.spawn(Config.get('configuration.atlas').value(), parameters, {
            detached: true,
            stdio: [ 'inherit', 'inherit', 'inherit' ]
        })

        this.process.on('close', () => {
            this.process = null
        })

        Console.Log('MONITORING', `Server ${this.ip}:${this.port} started.`)
    }

    async command (command) {
        return new Promise((resolve, reject) => {
            const rcon = new Rcon({
                host: this.ip,
                port: this.rconPort
            })

            rcon.authenticate(this.rconPassword)
                .then(() => {
                    rcon.execute(command).then(() => {
                        resolve(`[${this.ip}:${this.port} OK] ${command}`)
                    }).catch(() => {
                        reject(`[${this.ip}:${this.port} ERR] ${command}`)
                    })
                })
                .catch((err) => {
                    reject(`[${this.ip}:${this.port} AUTH] ${err}`)
                })
        })
    }

    export () {
        return {
            id: this.id,
            name: this.name,
            ip: this.ip,
            port: this.port,
            queryPort: this.queryPort,
            players: this.players,
            maxPlayers: this.maxPlayers,
            status: this.status
        }
    }

    get managed() {
        return this._managed;
    }

    set managed(value) {
        this._managed = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get ip() {
        return this._ip;
    }

    set ip(value) {
        this._ip = value;
    }

    get port() {
        return this._port;
    }

    set port(value) {
        this._port = value;
    }

    get homeServer() {
        return this._homeServer;
    }

    set homeServer(value) {
        this._homeServer = value;
    }

    get rconPort() {
        return this._rconPort
    }

    set rconPort(value) {
        this._rconPort = value
    }

    get rconPassword() {
        return this._rconPassword;
    }

    set rconPassword(value) {
        this._rconPassword = value;
    }

    get maxPlayers() {
        return this._maxPlayers;
    }

    set maxPlayers(value) {
        this._maxPlayers = value;
    }
    get players() {
        return this._players;
    }

    set players(value) {
        this._players = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get process() {
        return this._process;
    }

    set process(value) {
        this._process = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
    get parameters() {
        return this._parameters;
    }

    set parameters(value) {
        this._parameters = value;
    }

    get queryPort() {
        return this._queryPort;
    }

    set queryPort(value) {
        this._queryPort = value;
    }

    get extraParameters() {
        return this._extraParameters;
    }

    set extraParameters(value) {
        this._extraParameters = value;
    }
}

module.exports = Server