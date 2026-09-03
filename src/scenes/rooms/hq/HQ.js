import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class HQ extends RoomScene {

    constructor() {
        super("HQ")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'sportshop': () => this.triggerRoom(210, 1069, 526),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("hq-pack", "assets/media/rooms/hq/hq-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "hq-room", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
