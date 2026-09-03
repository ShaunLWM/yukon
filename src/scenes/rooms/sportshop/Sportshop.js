import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Sportshop extends RoomScene {

    constructor() {
        super("Sportshop")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'village': () => this.triggerRoom(200, 800, 640),
            'shop': () => this.triggerRoom(130, 1075, 415),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("sportshop-pack", "assets/media/rooms/sportshop/sportshop-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "sportshop", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
