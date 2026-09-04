import RoomScene from '../RoomScene'

import { Animation, SimpleButton } from '@components/components'
import FourTable1 from '@scenes/shared_prefabs/tables/four/FourTable1'
import FourTable2 from '@scenes/shared_prefabs/tables/four/FourTable2'
import FourTable3 from '@scenes/shared_prefabs/tables/four/FourTable3'
import FourTable4 from '@scenes/shared_prefabs/tables/four/FourTable4'


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
        this.tables={};
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
        let table200=this.add.existing(new FourTable3(this,601,633));
        let table201=this.add.existing(new FourTable4(this,861,593));
        let table202=this.add.existing(new FourTable1(this,481,774));
        let table203=this.add.existing(new FourTable4(this,800,772));
        let table204=this.add.existing(new FourTable2(this,1140,814));
        let sort=[box,arm,horse_horse,table202,table200,table201,table203,table204];
        new SimpleButton(horse_horse);
        let animation=new Animation(horse_horse);
        animation.key='horse/horse';
        animation.end=67;
        animation.repeat=0;
        animation.onHover=true;
        animation.stopOnOut=false;
        this.table200=table200;
        this.table201=table201;
        this.table202=table202;
        this.table203=table203;
        this.table204=table204;
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
