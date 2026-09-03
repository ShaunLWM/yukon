import RoomScene from '../../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Maze1 extends RoomScene {

    constructor() {
        super("Maze1")

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("maze1-pack", "assets/media/rooms/_mayday/maze1/maze1-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "maze1", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
