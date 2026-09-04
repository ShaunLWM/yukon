import RoomScene from '../RoomScene'

import { SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class DarkCave extends RoomScene {

    constructor() {
        super("DarkCave");

        /* START-USER-CTR-CODE */

        this.voyager;
        this.voyagerContainer;
        this.sort;
        this.roomTriggers={'cove':()=>this.triggerRoom(810,1060,311),'voyager':()=>this.catalogDisclaimer()};
        this.music=981;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('darkcave-pack','assets/media/rooms/darkcave/darkcave-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(760,480,'darkcave','darkcave_bg');
        this.add.image(274,450,'darkcave','cliffrock');
        this.add.image(940,465.5429992675781,'darkcave','cliffrock2').setOrigin(0.5,0.75);
        let rock=this.add.image(780,595,'darkcave','rock');
        let pebble=this.add.image(912,571,'darkcave','pebble');
        let rock_2=this.add.image(1174,514,'darkcave','rock');
        rock_2.setOrigin(0.5,0.6);
        rock_2.tintTopLeft=16777215;
        rock_2.tintTopRight=16777215;
        rock_2.tintBottomLeft=16777215;
        rock_2.tintBottomRight=0;
        let container=this.add.container(209,718);
        let voyager=this.add.image(111,28,'darkcave','voyager');
        container.add(voyager);
        let crimson=this.add.sprite(-45,-8,'darkcave','crimson0001');
        crimson.scaleX=-1;
        container.add(crimson);
        let sort=[pebble,rock,rock_2,container];
        let simpleButton=new SimpleButton(crimson);
        simpleButton.pixelPerfect=true;
        simpleButton.showOutline=true;
        simpleButton.downCallback=()=>this.interface.loadWidget('CrimsonDialogue',false,0);
        this.voyager=voyager;
        this.voyagerContainer=container;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
    }

    catalogDisclaimer() {
        this.interface.loadWidget('CrimsonDialogue',false,11);
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
