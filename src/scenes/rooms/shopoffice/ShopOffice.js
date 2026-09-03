import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class ShopOffice extends RoomScene {

    constructor() {
        super("ShopOffice")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'shop': () => this.triggerRoom(130, 1075, 415),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("shopoffice-pack", "assets/media/rooms/shopoffice/shopoffice-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "shopoffice", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
