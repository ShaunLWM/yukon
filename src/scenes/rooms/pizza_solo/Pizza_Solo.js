import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Pizza_Solo extends RoomScene {

    constructor() {
        super("Pizza_Solo")

        /* START-USER-CTR-CODE */

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("pizza_solo-pack", "assets/media/rooms/pizza_solo/pizza_solo-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "pizza_tutorial", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
