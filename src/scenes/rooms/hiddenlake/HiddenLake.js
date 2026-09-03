import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


export default class HiddenLake extends RoomScene {

    constructor() {
        super("HiddenLake")

        /* START-USER-CTR-CODE */

        this.roomTriggers = {
            'cave': () => this.triggerRoom(806, 780, 700),
            'forest': () => this.triggerRoom(809, 315, 540),
            'underwater': () => this.triggerRoom(815, 760, 660),
        }

        /* END-USER-CTR-CODE */
    }

    _preload() {
        this.load.pack("hiddenlake-pack", "assets/media/rooms/hiddenlake/hiddenlake-pack.json")
    }

    _create() {
        const bg = this.add.image(0, 0, "hiddenlake-water", "bg")
        bg.setOrigin(0, 0)

        this.events.emit("scene-awake")
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}
