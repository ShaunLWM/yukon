import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Tourhq extends RoomScene {

    constructor() {
        super("Tourhq")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'welcome': () => this.triggerRoom(1, 760, 755),
            'lookout': () => this.triggerRoom(3, 300, 580),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("tourhq-pack", "assets/media/rooms/tourhq/tourhq-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "tourhq-stairs", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
