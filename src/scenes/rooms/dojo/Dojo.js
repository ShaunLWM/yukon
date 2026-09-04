import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton, Zone } from '@components/components'
import Waddle200 from './waddle/Waddle200'
import Waddle201 from './waddle/Waddle201'
import Waddle202 from './waddle/Waddle202'
import Waddle203 from './waddle/Waddle203'


/* START OF COMPILED CODE */

export default class Dojo extends RoomScene {

    constructor() {
        super("Dojo");

        /* START-USER-CTR-CODE */

        this.sensei;
        this.waddle203;
        this.waddle202;
        this.waddle201;
        this.waddle200;
        this.cards;
        this.cauldronSmoke;
        this.roomTriggers={'door':()=>this.triggerRoom(321,780,640),'sensei':()=>this.triggerGame(951),'table200':()=>this.triggerMat(200),'table201':()=>this.triggerMat(201),'table202':()=>this.triggerMat(202),'table203':()=>this.triggerMat(203)};
        this.music=21;
        this.waddles={};

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('dojo-pack','assets/media/rooms/dojo/dojo-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-4,-2,'dojo','bg').setOrigin(0,0);
        let door=this.add.image(358,421,'dojo','door');
        door.setOrigin(0,0);
        let sensei_sensei=this.add.sprite(973,372,'dojo','sensei/sensei0001');
        sensei_sensei.setOrigin(0,0);
        this.add.image(1198,451,'dojo','tree').setOrigin(0,0);
        let instructions_poster=this.add.image(631,375,'dojo','instructions_poster');
        instructions_poster.setOrigin(0,0);
        this.add.image(647,381,'dojo','instructions').setOrigin(0,0);
        let legend_poster=this.add.image(512,375,'dojo','legend_poster');
        legend_poster.setOrigin(0,0);
        this.add.image(534,382,'dojo','legend').setOrigin(0,0);
        let rect=this.add.rectangle(1096,490,246,217);
        rect.alpha=0.01;
        rect.isFilled=true;
        rect.fillColor=65280;
        let cards=this.add.image(1342,819,'dojo','cards');
        cards.setOrigin(0,0);
        this.add.image(918,540,'dojo','cauldron/back').setOrigin(0,0);
        let cauldron_smoke_smoke=this.add.sprite(954,511,'dojo','cauldron/smoke/smoke0001');
        this.add.image(926,550,'dojo','cauldron/front').setOrigin(0,0);
        let animation=new Animation(cauldron_smoke_smoke);
        animation.key='cauldron/smoke/smoke';
        animation.end=1200;
        let zone=new Zone(rect);
        zone.hoverCallback=()=>this.onSenseiOver();
        zone.hoverOutCallback=()=>this.onSenseiOut();
        zone.callback=()=>this.onSenseiClick();
        let moveTo=new MoveTo(rect);
        moveTo.x=1100;
        moveTo.y=620;
        let button=new Button(door);
        button.spriteName='door';
        let moveTo_2=new MoveTo(door);
        moveTo_2.x=540;
        moveTo_2.y=580;
        let button_2=new Button(legend_poster);
        button_2.spriteName='legend_poster';
        button_2.callback=()=>this.interface.loadWidget('NinjaInstructions');
        button_2.pixelPerfect=true;
        let button_3=new Button(instructions_poster);
        button_3.spriteName='instructions_poster';
        button_3.callback=()=>this.interface.loadWidget('NinjaInstructions');
        button_3.pixelPerfect=true;
        let button_4=new Button(cards);
        button_4.spriteName='cards';
        button_4.callback=()=>this.interface.loadWidget('NinjaProgress');
        button_4.pixelPerfect=true;
        let waddle200=this.add.existing(new Waddle200(this,616,706));
        waddle200.moveToX=620;
        waddle200.moveToY=650;
        let waddle201=this.add.existing(new Waddle201(this,930,706));
        waddle201.moveToX=920;
        waddle201.moveToY=650;
        let waddle202=this.add.existing(new Waddle202(this,358,813));
        waddle202.moveToX=380;
        waddle202.moveToY=750;
        let waddle203=this.add.existing(new Waddle203(this,1188,813));
        waddle203.moveToX=1160;
        waddle203.moveToY=750;
        this.waddle200=waddle200;
        this.waddle201=waddle201;
        this.waddle202=waddle202;
        this.waddle203=waddle203;
        this.sensei=sensei_sensei;
        this.cards=cards;
        this.cauldronSmoke=cauldron_smoke_smoke;
        this.events.emit('scene-awake');
    }

    userHasDeck() {
        return this.world.client.inventory.award.includes(821);
    }

    create() {
        super.create();
        this.cards.depth=1000;
        this.cards.visible=this.userHasDeck();
    }

    onSenseiClick() {
        this.sensei.anims.stop();
        this.sensei.setFrame('sensei/sensei0001');
    }

    onSenseiOver() {
        this.sensei.play('sensei_over');
    }

    onSenseiOut() {
        this.sensei.play('sensei_out');
    }

    triggerMat(id) {
        if(!this.userHasDeck())return void this.interface.prompt.showWindow(this.getString('starter_deck_prompt'));
        this.triggerWaddle(id);
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
