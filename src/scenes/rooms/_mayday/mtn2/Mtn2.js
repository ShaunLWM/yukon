import RoomScene from '../../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Mtn2 extends RoomScene {

    constructor() {
        super("Mtn2")

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("mtn2-pack", "assets/media/rooms/_mayday/mtn2/mtn2-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "mtn2", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
