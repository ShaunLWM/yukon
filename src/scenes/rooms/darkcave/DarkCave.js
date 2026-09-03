import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class DarkCave extends RoomScene {

    constructor() {
        super("DarkCave")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'cove': () => this.triggerRoom(810, 840, 480),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("darkcave-pack", "assets/media/rooms/darkcave/darkcave-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "darkcave", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
