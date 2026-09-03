import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class IcePond extends RoomScene {

    constructor() {
        super("IcePond")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'lodge': () => this.triggerRoom(220, 760, 580),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("icepond-pack", "assets/media/rooms/icepond/icepond-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "icepond", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
