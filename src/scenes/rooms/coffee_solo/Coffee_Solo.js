import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Coffee_Solo extends RoomScene {

    constructor() {
        super("Coffee_Solo")

        /* START-USER-CTR-CODE */

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("coffee_solo-pack", "assets/media/rooms/coffee_solo/coffee_solo-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "coffee_solo", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
