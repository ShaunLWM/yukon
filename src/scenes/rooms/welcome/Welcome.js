import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Welcome extends RoomScene {

    constructor() {
        super("Welcome")

        /* START-USER-CTR-CODE */

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("welcome-pack", "assets/media/rooms/welcome/welcome-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "welcome", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
