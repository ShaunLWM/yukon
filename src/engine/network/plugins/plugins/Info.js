import Plugin from '../Plugin'


export default class Info extends Plugin {

    constructor(network) {
        super(network)
        this.events = {
            'info': this.info,
            'broadcast': this.broadcast,
            'toggle_streamer': this.toggleStreamer
        }
    }

    info(args) {
        this.interface.prompt.showInfo(args.message)
    }

    broadcast(args) {
        this.interface.prompt.showBroadcast(args.message, args.mode)
    }

    toggleStreamer(args) {
        this.world.client.streamer = args.streamer

        if (args.streamer) {
            this.interface.main.chatInput.regex = /[^a-zA-Z!?,'. ]/g
        } else {
            this.interface.main.chatInput.regex = /[^ -~]/gi
        }
    }

}
