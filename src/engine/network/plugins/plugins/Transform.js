import Plugin from '../Plugin'


export default class Transform extends Plugin {

    constructor(network) {
        super(network)
        this.events = {
            'transform_player': this.transformPlayer
        }
    }

    transformPlayer(args) {
        if (!this.world.room.isReady) {
            return this.world.room.updateWaiting(args.id, { transform: args.transform })
        }

        const penguin = this.world.room.penguins[args.id]

        if (penguin && penguin.transform !== args.transform) {
            penguin.transformation(args.transform)
        }
    }

}
