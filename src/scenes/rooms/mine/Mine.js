import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Mine extends RoomScene {

    constructor() {
        super("Mine")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'cave': () => this.triggerRoom(806, 780, 700),
            'cavemine': () => this.triggerRoom(813, 840, 480),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("mine-pack", "assets/media/rooms/mine/mine-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "mine", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
