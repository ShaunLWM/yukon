import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class DojoHide extends RoomScene {

    constructor() {
        super("DojoHide")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'dojoext': () => this.triggerRoom(321, 836, 689),
            'dojofire': () => this.triggerRoom(812, 1280, 620),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("dojohide-pack", "assets/media/rooms/dojohide/dojohide-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "dojohide", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
