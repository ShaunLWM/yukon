import Plugin from '../Plugin'


export default class Actions extends Plugin {

    constructor(network) {
        super(network)
        this.events = {
            'send_position': this.sendPosition,
            'send_frame': this.sendFrame,
            'snowball': this.snowball,
            'open_sprite': this.openSprite,
            'close_sprite': this.closeSprite
        }
    }

    get room() {
        return this.world.room
    }

    get penguinLoader() {
        return this.world.penguinFactory.penguinLoader
    }

    sendPosition(args) {
        if (!this.room.isReady) {
            return this.room.updateWaiting(args.id, { x: args.x, y: args.y, frame: 1, openSprite: null })
        }

        let penguin = this.room.penguins[args.id]

        if (!penguin) {
            return
        }

        // Walking away means the sprite was put away
        this.penguinLoader.closeSprite(penguin)

        penguin.move(args.x, args.y)
    }

    sendFrame(args) {
        if (!this.room.isReady) {
            return this.room.updateWaiting(args.id, { frame: (args.set) ? args.frame : 1 })
        }

        let penguin = this.room.penguins[args.id]
        let callback = () => penguin.playFrame(args.frame, args.set)

        if (penguin.isTweening) {
            return penguin.afterMove = callback
        }

        callback()
    }

    snowball(args) {
        if (!this.room.isReady) {
            return
        }

        let penguin = this.room.penguins[args.id]
        let callback = () => this.interface.main.snowballFactory.throwBall(args.id, args.x, args.y)

        if (penguin.isTweening) {
            return penguin.afterMove = callback
        }

        callback()
    }

    openSprite(args) {
        if (!this.room.isReady) {
            return this.room.updateWaiting(args.id, { openSprite: args.sprite })
        }

        let penguin = this.room.penguins[args.id]

        if (!penguin) {
            return
        }

        // Set now, shown once any walk ends: closing or walking again before
        // then clears it, and the callback then does nothing
        penguin.openSprite = args.sprite

        let callback = () => {
            if (penguin.openSprite === args.sprite) {
                this.penguinLoader.openSprite(penguin, args.sprite)
            }
        }

        if (penguin.isTweening) {
            return penguin.afterMove = callback
        }

        callback()
    }

    closeSprite(args) {
        if (!this.room.isReady) {
            return this.room.updateWaiting(args.id, { openSprite: null })
        }

        let penguin = this.room.penguins[args.id]

        if (penguin) {
            this.penguinLoader.closeSprite(penguin)
        }
    }

}
