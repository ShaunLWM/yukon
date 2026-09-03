import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Pizza extends RoomScene {

    constructor() {
        super("Pizza")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'plaza': () => this.triggerRoom(300, 760, 680),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("pizza-pack", "assets/media/rooms/pizza/pizza-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "pizza-job", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
