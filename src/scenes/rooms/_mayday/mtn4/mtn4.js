import RoomScene from '../../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class mtn4 extends RoomScene {

    constructor() {
        super("mtn4")

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("mtn4-pack", "assets/media/rooms/_mayday/mtn4/mtn4-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "mtn4-splosions", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
