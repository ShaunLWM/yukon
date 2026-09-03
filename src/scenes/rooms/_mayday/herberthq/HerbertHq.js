import RoomScene from '../../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class HerbertHq extends RoomScene {

    constructor() {
        super("HerbertHq")

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("herberthq-pack", "assets/media/rooms/_mayday/herberthq/herberthq-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "herberthq", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
