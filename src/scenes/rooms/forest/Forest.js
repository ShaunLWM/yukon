import RoomScene from '../RoomScene'

import { MoveTo, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Forest extends RoomScene {

    constructor() {
        super("Forest");

        /* START-USER-CTR-CODE */

        this.rock0001;
        this.sort;
        this.roomTriggers={'plaza':()=>this.triggerRoom(300,1240,660),'shack':()=>this.triggerRoom(807,500,800),'cove':()=>this.triggerRoom(810,520,416),'lake':()=>this.triggerRoom(814,460,285)};

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('forest-pack','assets/media/rooms/forest/forest-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-24,-13,'forest','bg').setOrigin(0,0);
        let rock=this.add.sprite(254,681,'forest','rock0001');
        rock.setOrigin(0.6005747126436781,0.7300884955752213);
        let rect=this.add.rectangle(287,652,190,128);
        rect.visible=false;
        rect.isFilled=true;
        let tree=this.add.image(-17,272,'forest','tree');
        tree.setOrigin(0,0);
        let fg=this.add.image(-1,969,'forest','fg');
        fg.setOrigin(0,1);
        let middle=this.add.image(781,548,'forest','middle');
        middle.setOrigin(0.5,0.608540925266904);
        this.add.image(1129,302,'forest','stairs').setOrigin(0,0);
        let rail=this.add.image(1441,831,'forest','rail');
        rail.setOrigin(0.5,0.5885714285714285);
        let sign=this.add.image(1317,681,'forest','sign');
        sign.setOrigin(0.4794520547945205,0.9397590361445783);
        let sort=[sign,rail,middle,fg,tree,rock];
        let simpleButton=new SimpleButton(rock);
        simpleButton.hoverCallback=()=>{this.onRockUp();};
        simpleButton.hoverOutCallback=()=>{this.onRockDown();};
        let moveTo=new MoveTo(rock);
        moveTo.x=312;
        moveTo.y=664;
        this.rock0001=rock;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
    }

    onRockUp() {
        this.rock0001.play('rockup');
    }

    onRockDown() {
        this.rock0001.play('rockdown');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
