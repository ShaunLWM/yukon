import DataHandler from './DataHandler'

import io from 'socket.io-client'


export default class Network {

    constructor(game) {
        this.game = game

        this.events = new Phaser.Events.EventEmitter()

        this.handler = new DataHandler(this)
        this.client = null

        this.saveUsername = false
        this.savePassword = false
        this.token = null

        // Used to switch back to correct login scene on an error
        this.lastLoginScene = null

        this.worldName
        this.lostConnection = false
    }

    connectLogin(saveUsername, savePassword, onConnect) {
        this.saveUsername = saveUsername
        this.savePassword = savePassword

        this.connect('Login', () => {
            onConnect()
        }, () => {
            this.disconnect()
        })
    }

    connectGame(world, username, key) {
        // Only create token if save password is checked and space is available
        let createToken = this.savePassword && Object.keys(this.savedPenguins).length <= 6
        let response = { username: username, key: key, createToken: createToken }

        // If a token exists for the user add the token selector to response,
        // so that the token can be deleted/refreshed by the server
        let token = this.getToken(username)

        if (token) {
            response.token = token.split(':')[0]
        }

        this.connect(world, () => {
            this.send('game_auth', response)
            this.worldName = world

        }, (reason) => {
            this.onConnectionLost(reason)
        }, true)
    }

    connect(world, onConnect, onDisconnect, reconnect = false) {
        this.disconnect()
        this.lostConnection = false

        let config = this.game.crumbs.worlds[world]

        let opts = { path: config.path }
        if (reconnect) {
            opts.reconnectionAttempts = 5
            opts.reconnectionDelayMax = 1000
        } else {
            opts.reconnection = false
        }

        this.client = io.connect(config.host, opts)

        this.client.once('connect', onConnect)
        this.client.on('disconnect', onDisconnect)
        this.client.on('connect_error', () => {
            if (!this.lostConnection) this.onConnectionLost()
        })
        this.client.on('message', (message) => this.onMessage(message))

        if (reconnect) {
            this.client.io.on('reconnect_failed', () => {
                this.onConnectionLost('reconnect_failed')
            })
        }
    }

    disconnect() {
        if (this.client) {
            this.client.disconnect()
        }
    }

    send(action, args = {}) {
        if (!this.client) {
            return
        }

        if (localStorage.logging == 'true') {
            console.log('Message sending:', action, args)
        }

        this.client.emit('message', { action: action, args: args })
    }

    // Handlers

    onMessage(message) {
        this.handler.handle(message)
    }

    onConnectionLost(reason) {
        this.lostConnection = true
        this.disconnect()

        const codes = {
            'io server disconnect': 'e101',
            'io client disconnect': 'e102',
            'ping timeout': 'e103',
            'transport close': 'e104',
            'transport error': 'e105'
        }
        const code = codes[reason] || 'e100'

        let prompt = this.game.scene.getScene('InterfaceController').prompt
        prompt.showError(`Connection was lost (${code}).\nPlease reload to reconnect`, 'Reload', () => location.reload())
    }

    // Saved penguins

    get isSavedPenguins() {
        if (localStorage.getItem('saved_penguins')) {
            return true
        } else {
            return false
        }
    }

    get savedPenguins() {
        let savedPenguins = localStorage.getItem('saved_penguins')

        if (!savedPenguins) {
            return {}
        }

        try {
            return JSON.parse(savedPenguins)
        } catch (error) {
            return {}
        }
    }

    getToken(username) {
        let save = this.savedPenguins[username.toLowerCase()]

        if (save && save.token) {
            return save.token
        } else {
            return null
        }
    }

}
