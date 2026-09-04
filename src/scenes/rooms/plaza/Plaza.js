import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Plaza extends RoomScene {

    constructor() {
        super("Plaza");

        /* START-USER-CTR-CODE */

        this.pizza;
        this.stagemask;
        this.pufflespin;
        this.puffle;
        this.puffleHitbox;
        this.maskHitbox;
        this.pizzaHitbox;
        this.sort;
        this.roomTriggers={'forts':()=>this.triggerRoom(801,1284,720),'pet':()=>this.triggerRoom(310,818,520),'pufflepark':()=>this.triggerRoom(890,540,410),'cave':()=>this.enterCave(),'stage1':()=>this.triggerRoom(340,226,652),'stage2':()=>this.triggerRoom(340,226,652),'pizza':()=>this.checkPizzaTutorial(),'forest':()=>this.triggerRoom(809,270,430),'welcome':()=>this.triggerRoom(1,1064,588)};
        this.pizzaCounter=0;
        this.physicsKey='plaza-physics';
        this.music='1237';

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('plaza-pack','assets/media/rooms/plaza/plaza-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(762.5,486,'plaza','background');
        let pet_door=this.add.image(336,488.5,'plaza','pet_door');
        pet_door.setOrigin(0.473118,0.678218);
        let cave_door=this.add.image(565.5,509.5,'plaza','cave_door');
        cave_door.setOrigin(0.473684,0.781513);
        let pizza_door=this.add.image(1194.5,411,'plaza','pizza_door');
        pizza_door.setOrigin(0.5311,0.442211);
        let stage_lights_back=this.add.sprite(851,174,'plaza','stage_lights_back0001');
        stage_lights_back.setOrigin(0.5011764705882353,0.5);
        this.add.image(847.5,221.5,'plaza','stage_screen');
        let stage_lights_front=this.add.sprite(853,166,'plaza','stage_lights_front0001');
        let lamp=this.add.image(130,828,'plaza','lamp');
        lamp.setOrigin(0.5099009900990099,0.9323076923076923);
        let underwater=this.add.image(846,241,'stageplay-signs','underwater');
        underwater.tintTopLeft=4469272;
        underwater.tintTopRight=4469272;
        underwater.tintBottomLeft=4469272;
        underwater.tintBottomRight=4469272;
        let stage_door_1=this.add.image(734.5,385.5,'plaza','stage_door_1');
        stage_door_1.setOrigin(0.5045871559633027,0.4567901234567901);
        let stage_door_2=this.add.image(960,386,'plaza','stage_door_2');
        stage_door_2.setOrigin(0.5045871559633027,0.4567901234567901);
        this.add.image(851,248,'plaza','text').setOrigin(0.5,0.49333333333333335);
        let tickets=this.add.image(846,458,'plaza','tickets');
        tickets.setOrigin(0.49612403100775193,0.9247311827956989);
        let wr_sign=this.add.image(222.6459197998047,849.5238068749469,'plaza','wr_sign');
        wr_sign.setOrigin(0.6712636034460402,0.9761905878998592);
        let chairs=this.add.image(1375.4249135076375,744.8490891500053,'plaza','chairs');
        chairs.setOrigin(0.7524704273699854,0.4639051230435242);
        let chair_and_table=this.add.image(1281.649005219353,770.036865234375,'plaza','chair_and_table');
        chair_and_table.setOrigin(0.5544344221210952,0.4750997154878143);
        let table=this.add.image(1254.6808827117275,811.3176298370764,'plaza','table');
        table.setOrigin(0.49722506705849967,0.6418299058988558);
        let pizza=this.add.sprite(1178.5,126,'plaza','pizza0001');
        let stagemask=this.add.sprite(673.5,125.5,'plaza','stagemask0001');
        let puffle=this.add.sprite(250,227,'plaza','puffle0012');
        puffle.visible=false;
        let puffle_2=this.add.sprite(251,226,'plaza','puffle0001');
        let rect=this.add.rectangle(255,230,150,120);
        rect.angle=-18;
        rect.visible=false;
        let rect_2=this.add.rectangle(651,103,150,80);
        rect_2.angle=-29.000000000000004;
        rect_2.visible=false;
        let rect_3=this.add.rectangle(1178,126,165,130);
        rect_3.visible=false;
        let sort=[lamp,tickets,wr_sign,chairs,table,chair_and_table];
        let button=new Button(pet_door);
        button.spriteName='pet_door';
        button.pixelPerfect=true;
        let moveTo=new MoveTo(pet_door);
        moveTo.x=340;
        moveTo.y=540;
        let button_2=new Button(cave_door);
        button_2.spriteName='cave_door';
        button_2.pixelPerfect=true;
        let moveTo_2=new MoveTo(cave_door);
        moveTo_2.x=560;
        moveTo_2.y=500;
        let button_3=new Button(pizza_door);
        button_3.spriteName='pizza_door';
        button_3.pixelPerfect=true;
        let moveTo_3=new MoveTo(pizza_door);
        moveTo_3.x=1152;
        moveTo_3.y=500;
        let animation=new Animation(stage_lights_back);
        animation.key='stage_lights_back';
        animation.end=16;
        let animation_2=new Animation(stage_lights_front);
        animation_2.key='stage_lights_front';
        animation_2.end=16;
        new Button(stage_door_1).spriteName='stage_door_1';
        let moveTo_4=new MoveTo(stage_door_1);
        moveTo_4.x=730;
        moveTo_4.y=460;
        new Button(stage_door_2).spriteName='stage_door_2';
        let moveTo_5=new MoveTo(stage_door_2);
        moveTo_5.x=960;
        moveTo_5.y=460;
        new SimpleButton(tickets);
        let moveTo_6=new MoveTo(tickets);
        moveTo_6.x=846;
        moveTo_6.y=426;
        this.pizza=pizza;
        this.stagemask=stagemask;
        this.pufflespin=puffle;
        this.puffle=puffle_2;
        this.puffleHitbox=rect;
        this.maskHitbox=rect_2;
        this.pizzaHitbox=rect_3;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.bounds={};
        this.bounds.puffleHitbox=this.puffleHitbox.getBounds();
        this.bounds.maskHitbox=this.maskHitbox.getBounds();
        this.bounds.pizzaHitbox=this.pizzaHitbox.getBounds();
    }

    enterCave() {
        this.triggerRoom(806,1180,614);
        this.stampEarned(10);
    }

    checkPizzaTutorial() {
        return this.triggerRoom(330,827,502);
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
