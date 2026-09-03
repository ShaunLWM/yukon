import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class Boiler extends RoomScene {

    constructor() {
        super("Boiler")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'dance': () => this.triggerRoom(120, 360, 560),
            'cave': () => this.triggerRoom(806, 780, 700),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("boiler-pack", "assets/media/rooms/boiler/boiler-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "newboiler", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
