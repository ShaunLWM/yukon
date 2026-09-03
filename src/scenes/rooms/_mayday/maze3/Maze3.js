import RoomScene from '../../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Maze3 extends RoomScene {

    constructor() {
        super("Maze3")

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("maze3-pack", "assets/media/rooms/_mayday/maze3/maze3-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "maze3", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
