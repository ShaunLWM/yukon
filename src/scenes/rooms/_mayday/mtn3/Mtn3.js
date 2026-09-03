import RoomScene from '../../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Mtn3 extends RoomScene {

    constructor() {
        super("Mtn3")

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("mtn3-pack", "assets/media/rooms/_mayday/mtn3/mtn3-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "mtn3", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
