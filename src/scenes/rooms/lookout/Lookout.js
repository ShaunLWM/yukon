import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Lookout extends RoomScene {

    constructor() {
        super("Lookout")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'tourhq': () => this.triggerRoom(2, 775, 440),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("lookout-pack", "assets/media/rooms/lookout/lookout-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "lookout", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
