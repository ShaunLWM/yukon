import Plugin from '../Plugin'


export default class Stamp extends Plugin {

    constructor(network) {
        super(network)

        this.events = {
            'stamp_earned': this.stampEarned
        }
    }

    stampEarned(args) {
        const client = this.world.client
        if (!client.stamps.includes(args.stamp)) {
            client.stamps.push(args.stamp)
        }

        const stamp = client.getStamp(args.stamp)
        if (stamp) {
            this.interface.main.showStampEarned(stamp.name, stamp.type, stamp.rank)
        }
    }

}
