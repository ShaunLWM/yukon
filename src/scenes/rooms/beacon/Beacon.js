import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Beacon extends RoomScene {

    constructor() {
        super("Beacon")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'lighthouse': () => this.triggerRoom(410, 568, 508),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("beacon-pack", "assets/media/rooms/beacon/beacon-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "lttop", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
