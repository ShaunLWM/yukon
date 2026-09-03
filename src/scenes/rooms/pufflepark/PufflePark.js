import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class PufflePark extends RoomScene {

    constructor() {
        super("PufflePark")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'pet': () => this.triggerRoom(310, 828, 520),
            'plaza': () => this.triggerRoom(300, 760, 680),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("pufflepark-pack", "assets/media/rooms/pufflepark/pufflepark-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "pufflepark", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
