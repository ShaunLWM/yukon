import RoomScene from '../../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Maze2 extends RoomScene {

    constructor() {
        super("Maze2")

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("maze2-pack", "assets/media/rooms/_mayday/maze2/maze2-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "maze2", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
