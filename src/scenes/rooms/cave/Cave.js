import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, Zone } from '@components/components'


/* START OF COMPILED CODE */

export default class Cave extends RoomScene {

    constructor() {
        super("Cave");

        /* START-USER-CTR-CODE */

        this.bubble10001;
        this.bubble20001;
        this.bubble30001;
        this.crab10001;
        this.crab20001;
        this.fish10001;
        this.fish20001;
        this.sort;
        this.roomTriggers={'boiler':()=>this.triggerRoom(804,628,611),'plaza':()=>this.triggerRoom(300,582,588),'mine':()=>this.triggerRoom(808,0,0)};

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('cave-pack','assets/media/rooms/cave/cave-pack.json');
    }

    /** @returns {void} */
    _create() {

        let window=this.add.image(515,265,'cave','window');
        window.setOrigin(0,0);
        window.visible=false;
        this.add.image(828,356,'cave-bg','animbg');
        let bubble=this.add.sprite(586,359,'cave-bg','bubble10001');
        bubble.visible=false;
        let bubble_2=this.add.sprite(830,359,'cave-bg','bubble20001');
        bubble_2.visible=false;
        let bubble_3=this.add.sprite(1065,359,'cave-bg','bubble30001');
        bubble_3.visible=false;
        let crab=this.add.sprite(829,415,'cave-bg','crab10132');
        crab.visible=false;
        let crab_2=this.add.sprite(804,271,'cave-bg','crab10107');
        crab_2.flipX=true;
        crab_2.flipY=true;
        crab_2.visible=false;
        let fish=this.add.sprite(795,379,'cave-bg','fish10001');
        fish.visible=false;
        let fish_2=this.add.sprite(854,311,'cave-bg','fish10001');
        fish_2.flipX=true;
        fish_2.visible=false;
        this.add.image(0,-14,'cave','bg').setOrigin(0,0);
        let ceiling=this.add.image(1360,743,'cave','ceiling');
        ceiling.setOrigin(0.8945998698763825,0.9345911949685535);
        let fg_1=this.add.image(-15,880,'cave','fg_1');
        fg_1.setOrigin(0,1);
        let fg_2=this.add.image(1381,830,'cave','fg_2');
        fg_2.setOrigin(0.06493506493506493,0.46387832699619774);
        let fg_3=this.add.image(0,960,'cave','fg_3');
        fg_3.setOrigin(0,1);
        this.add.image(357,399,'cave','chair_back').setOrigin(0,0);
        let chair_front=this.add.image(391,490,'cave','chair_front');
        chair_front.setOrigin(0.5909090909090909,0.7115384615384616);
        let door=this.add.image(104,291,'cave','door');
        door.setOrigin(0,0);
        this.add.image(376,288,'cave','ring').setOrigin(0,0);
        this.add.image(669,455,'cave','board_1').setOrigin(0,0);
        let board_1=this.add.image(930,440,'cave','board_1');
        board_1.angle=10;
        board_1.setOrigin(0,0);
        this.add.image(693,457,'cave','board_2').setOrigin(0,0);
        let ladder_back=this.add.image(349,756,'cave','ladder_back');
        ladder_back.setOrigin(0.5068493150684932,0.5);
        let ladder_front=this.add.image(317,778,'cave','ladder_front');
        let water_water_1=this.add.image(813,639,'cave','water/water_1');
        water_water_1.setOrigin(0.5,2.8333333333333335);
        let water_water_2=this.add.image(811,656,'cave','water/water_2');
        water_water_2.setOrigin(0.5,1.8571428571428572);
        let water_water_3=this.add.image(809,677,'cave','water/water_3');
        water_water_3.setOrigin(0.5,1.8571428571428572);
        let water_water_4=this.add.image(807,698,'cave','water/water_4');
        water_water_4.setOrigin(0.5006675567423231,1.8571428571428572);
        let water_water_5=this.add.image(805,719,'cave','water/water_5');
        water_water_5.setOrigin(0.5006385696040868,1.8571428571428572);
        let water_water_6=this.add.image(803,740,'cave','water/water_6');
        water_water_6.setOrigin(0.5,1.8571428571428572);
        let water_water_7=this.add.image(801,761,'cave','water/water_7');
        water_water_7.setOrigin(0.5,1.8571428571428572);
        let water_water_8=this.add.image(799,782,'cave','water/water_8');
        water_water_8.setOrigin(0.5,1.8571428571428572);
        let water_water_9=this.add.image(798,803,'cave','water/water_9');
        water_water_9.setOrigin(0.5,1.8571428571428572);
        let water_water_10=this.add.image(797,824,'cave','water/water_10');
        water_water_10.setOrigin(0.5005313496280552,1.8571428571428572);
        let water_water_11=this.add.image(796,845,'cave','water/water_11');
        water_water_11.setOrigin(0.5,1.8571428571428572);
        let line=this.add.image(807,724,'cave','line');
        line.setOrigin(0.5006337135614702,2.0555555555555554);
        let rect=this.add.rectangle(1319,295,115,400);
        rect.alpha=0.01;
        rect.isFilled=true;
        rect.fillColor=65280;
        let sort=[line,water_water_11,water_water_10,water_water_9,water_water_8,water_water_7,water_water_6,water_water_5,water_water_4,water_water_3,water_water_2,water_water_1,ladder_front,ladder_back,chair_front,fg_2,ceiling,fg_3,fg_1];
        let animation=new Animation(bubble);
        animation.key='bubble1';
        animation.end=56;
        animation.repeat=0;
        animation.autoPlay=false;
        let animation_2=new Animation(bubble_2);
        animation_2.key='bubble2';
        animation_2.end=56;
        animation_2.repeat=0;
        animation_2.autoPlay=false;
        let animation_3=new Animation(bubble_3);
        animation_3.key='bubble3';
        animation_3.end=56;
        animation_3.repeat=0;
        animation_3.autoPlay=false;
        let animation_4=new Animation(crab);
        animation_4.key='crab1';
        animation_4.end=234;
        animation_4.repeat=0;
        animation_4.autoPlay=false;
        let animation_5=new Animation(crab_2);
        animation_5.key='crab1';
        animation_5.end=234;
        animation_5.repeat=0;
        animation_5.autoPlay=false;
        let animation_6=new Animation(fish);
        animation_6.key='fish1';
        animation_6.end=140;
        animation_6.repeat=0;
        animation_6.autoPlay=false;
        let animation_7=new Animation(fish_2);
        animation_7.key='fish1';
        animation_7.end=140;
        animation_7.repeat=0;
        animation_7.autoPlay=false;
        new Button(door).spriteName='door';
        let moveTo=new MoveTo(door);
        moveTo.x=190;
        moveTo.y=600;
        new Zone(rect).callback=()=>this.onZoneClick();
        this.bubble10001=bubble;
        this.bubble20001=bubble_2;
        this.bubble30001=bubble_3;
        this.crab10001=crab;
        this.crab20001=crab_2;
        this.fish10001=fish;
        this.fish20001=fish_2;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.fish10001.on('animationcomplete',()=>this.randomFishY());
        this.fish20001.on('animationcomplete',()=>this.randomFishY2());
    }

    randomFishY() {
        this.fish10001.y=Math.floor(80*Math.random()+316);
        this.fish10001.visible=false;
    }

    randomFishY2() {
        this.fish20001.y=Math.floor(80*Math.random()+316);
        this.fish20001.visible=false;
    }

    playAnim() {
        this.time.addEvent({'delay':4500+10000*Math.random(),'callback':()=>this.playAnim(),'loop':false});
    }

    onZoneClick() {
        this.world.client.sendMove(1266,572);
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
