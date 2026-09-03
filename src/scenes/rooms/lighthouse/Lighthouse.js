import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Lighthouse extends RoomScene {

    constructor() {
        super("Lighthouse")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'beacon': () => this.triggerRoom(411, 328, 701),
            'beach': () => this.triggerRoom(400, 840, 680),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("lighthouse-pack", "assets/media/rooms/lighthouse/lighthouse-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "lighthouse", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
