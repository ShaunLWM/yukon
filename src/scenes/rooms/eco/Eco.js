import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Eco extends RoomScene {

    constructor() {
        super("Eco")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'mine': () => this.triggerRoom(808, 760, 680),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("eco-pack", "assets/media/rooms/eco/eco-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "eco-snowball", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
