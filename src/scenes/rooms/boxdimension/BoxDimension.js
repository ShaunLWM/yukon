import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class BoxDimension extends RoomScene {

    constructor() {
        super("BoxDimension")

        /* START-USER-CTR-CODE */

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("boxdimension-pack", "assets/media/rooms/boxdimension/boxdimension-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "boxdimension", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
