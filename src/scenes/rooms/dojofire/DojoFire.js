import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class DojoFire extends RoomScene {

    constructor() {
        super("DojoFire")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'dojohide': () => this.triggerRoom(322, 836, 689),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("dojofire-pack", "assets/media/rooms/dojofire/dojofire-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "dojofire", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
