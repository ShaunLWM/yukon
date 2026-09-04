import RoomScene from '../RoomScene'

import { Animation, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Attic extends RoomScene {

    constructor() {
        super("Attic");

        /* START-USER-CTR-CODE */

        this.table204;
        this.table203;
        this.table202;
        this.table201;
        this.table200;
        this.sort;
        this.roomTriggers={'lodge':()=>this.triggerRoom(220,1146,562),'table200':()=>this.triggerTable('four',200),'table201':()=>this.triggerTable('four',201),'table202':()=>this.triggerTable('four',202),'table203':()=>this.triggerTable('four',203),'table204':()=>this.triggerTable('four',204)};
        this.music=1215;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('attic-pack','assets/media/rooms/attic/attic-pack.json');
        this.load.pack('four_tables-pack','assets/media/shared/tables/four/four_tables-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-11,-6,'attic','bg').setOrigin(0,0);
        let arm=this.add.image(223,606,'attic','arm');
        arm.setOrigin(0.497143,0.649402);
        let horse_horse=this.add.sprite(1365,633,'attic','horse/horse0001');
        horse_horse.setOrigin(0.544,0.503185);
        let box=this.add.image(-7,964,'attic','box');
        box.setOrigin(0,1);
        let sort=[box,arm,horse_horse];
        new SimpleButton(horse_horse);
        let animation=new Animation(horse_horse);
        animation.key='horse/horse';
        animation.end=67;
        animation.repeat=0;
        animation.onHover=true;
        animation.stopOnOut=false;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
