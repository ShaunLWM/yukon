import RoomScene from '../../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Mtn1 extends RoomScene {

    constructor() {
        super("Mtn1")

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("mtn1-pack", "assets/media/rooms/_mayday/mtn1/mtn1-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "mtn1", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
