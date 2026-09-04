import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, ShowHint, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class HQ extends RoomScene {

    constructor() {
        super("HQ");

        /* START-USER-CTR-CODE */

        this.door;
        this.cabinet;
        this.cabinetnormal;
        this.interfaceIcons;
        this.sort;
        this.roomTriggers={'sportshop':()=>this.triggerRoom(210,495,580),'epf':()=>this.onRoomTrigger()};
        this.music=7;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('hq-pack','assets/media/rooms/hq/hq-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(770,481,'hq-room','background');
        let chairone=this.add.image(1170.737783443294,588.4267006597639,'hq-room','chairone');
        chairone.setOrigin(0.46370885133306133,0.34673155660079574);
        let chairtwo=this.add.image(466.2980752081793,587.3509623959104,'hq-room','chairtwo');
        chairtwo.setOrigin(0.7848143117805468,0.3997619533782059);
        let truedoor=this.add.sprite(183,447,'hq-room','truedoor0001');
        let v=this.add.text(1270,325,'',{});
        v.angle=28;
        v.text='KEEP UP THE \nGOOD WORK \nAGENTS!';
        v.setStyle({'align':'center','color':'#000000ff','fontFamily':'CCComicrazy','fontSize':'11px','fontStyle':'bold italic','stroke':'#000000ff'});
        v.setPadding({'left':10,'top':10,'right':10,'bottom':10});
        let cabinet=this.add.sprite(1432,566,'hq-room','cabinet0001');
        cabinet.visible=false;
        let cabinet_2=this.add.sprite(1432,566,'hq-room','cabinet0001');
        let agent_danceclub=this.add.sprite(563,250,'hq-room','agent_danceclub0001');
        let rect=this.add.rectangle(454,160,80,70);
        rect.alpha=0.00001;
        rect.isFilled=true;
        let rect_2=this.add.rectangle(552,154,80,70);
        rect_2.alpha=0.00001;
        rect_2.isFilled=true;
        let rect_3=this.add.rectangle(654,149,80,70);
        rect_3.alpha=0.00001;
        rect_3.isFilled=true;
        let rect_4=this.add.rectangle(751,146,80,70);
        rect_4.alpha=0.00001;
        rect_4.isFilled=true;
        let rect_5=this.add.rectangle(843,143,80,70);
        rect_5.alpha=0.00001;
        rect_5.isFilled=true;
        let rect_6=this.add.rectangle(936,151,80,70);
        rect_6.alpha=0.00001;
        rect_6.isFilled=true;
        let rect_7=this.add.rectangle(1033,152,80,70);
        rect_7.alpha=0.00001;
        rect_7.isFilled=true;
        let rect_8=this.add.rectangle(465,257,80,70);
        rect_8.alpha=0.00001;
        rect_8.isFilled=true;
        let rect_9=this.add.rectangle(366,276,80,70);
        rect_9.alpha=0.00001;
        rect_9.isFilled=true;
        let rect_10=this.add.rectangle(563,249,80,70);
        rect_10.alpha=0.00001;
        rect_10.isFilled=true;
        let rect_11=this.add.rectangle(657,245,80,70);
        rect_11.alpha=0.00001;
        rect_11.isFilled=true;
        let rect_12=this.add.rectangle(750,242,80,70);
        rect_12.alpha=0.00001;
        rect_12.isFilled=true;
        let rect_13=this.add.rectangle(841,244,65,70);
        rect_13.alpha=0.00001;
        rect_13.isFilled=true;
        this.add.image(929,246,'hq-room','rink_screen').visible=false;
        this.add.image(928,246,'hq-room','baseball_screen');
        let rect_14=this.add.rectangle(929,243,70,70);
        rect_14.alpha=0.00001;
        rect_14.isFilled=true;
        let rect_15=this.add.rectangle(1015,247,80,70);
        rect_15.alpha=0.00001;
        rect_15.isFilled=true;
        let rect_16=this.add.rectangle(1109,251,80,70);
        rect_16.alpha=0.00001;
        rect_16.isFilled=true;
        let rect_17=this.add.rectangle(1204,274,80,70);
        rect_17.alpha=0.00001;
        rect_17.isFilled=true;
        let rect_18=this.add.rectangle(432,363,80,70);
        rect_18.alpha=0.00001;
        rect_18.isFilled=true;
        let rect_19=this.add.rectangle(530,345,80,70);
        rect_19.alpha=0.00001;
        rect_19.isFilled=true;
        let rect_20=this.add.rectangle(628,340,80,70);
        rect_20.alpha=0.00001;
        rect_20.isFilled=true;
        let rect_21=this.add.rectangle(732,344,80,70);
        rect_21.alpha=0.00001;
        rect_21.isFilled=true;
        let rect_22=this.add.rectangle(857,338,80,70);
        rect_22.alpha=0.00001;
        rect_22.isFilled=true;
        let rect_23=this.add.rectangle(955,340,80,70);
        rect_23.alpha=0.00001;
        rect_23.isFilled=true;
        let rect_24=this.add.rectangle(1049,347,80,70);
        rect_24.alpha=0.00001;
        rect_24.isFilled=true;
        let rect_25=this.add.rectangle(1145,359,80,70);
        rect_25.alpha=0.00001;
        rect_25.isFilled=true;
        let container=this.add.container(1423,751.0000610351562);
        let sign=this.add.image(2,0,'hq-room','sign');
        container.add(sign);
        let fish=this.add.image(0,117.99993896484375,'hq-room','fish');
        container.add(fish);
        let sort=[chairtwo,chairone];
        let simpleButton=new SimpleButton(truedoor);
        simpleButton.hoverCallback=()=>this.HQDoor();
        simpleButton.hoverOutCallback=()=>this.HQDone();
        let moveTo=new MoveTo(truedoor);
        moveTo.x=203;
        moveTo.y=583;
        let simpleButton_2=new SimpleButton(cabinet);
        simpleButton_2.hoverCallback=()=>this.cabinetHover();
        simpleButton_2.hoverOutCallback=()=>this.cabinetDone();
        let moveTo_2=new MoveTo(cabinet);
        moveTo_2.x=1410;
        moveTo_2.y=670;
        let simpleButton_3=new SimpleButton(cabinet_2);
        simpleButton_3.hoverCallback=()=>this.fakeCabinetHover();
        simpleButton_3.hoverOutCallback=()=>this.fakeCabinetDone();
        simpleButton_3.pixelPerfect=true;
        let moveTo_3=new MoveTo(cabinet_2);
        moveTo_3.x=1410;
        moveTo_3.y=670;
        let animation=new Animation(agent_danceclub);
        animation.key='agent_danceclub';
        animation.end=7;
        animation.frameRate=1;
        new ShowHint(rect).text='Dojo Courtyard';
        new SimpleButton(rect).callback=()=>this.teleportRoom(321);
        new ShowHint(rect_2).text='Ski Village';
        new SimpleButton(rect_2).callback=()=>this.teleportRoom(200);
        new ShowHint(rect_3).text='Ski Hill';
        new SimpleButton(rect_3).callback=()=>this.teleportRoom(230);
        new ShowHint(rect_4).text='The Dojo';
        new SimpleButton(rect_4).callback=()=>this.teleportRoom(320);
        new ShowHint(rect_5).text='Forest';
        new SimpleButton(rect_5).callback=()=>this.teleportRoom(809);
        new ShowHint(rect_6).text='Cove';
        new SimpleButton(rect_6).callback=()=>this.teleportRoom(810);
        new ShowHint(rect_7).text='Stage';
        new SimpleButton(rect_7).callback=()=>this.teleportRoom(340);
        new ShowHint(rect_8).text='Dance Lounge';
        new SimpleButton(rect_8).callback=()=>this.teleportRoom(121);
        new ShowHint(rect_9).text='Lodge Attic';
        new SimpleButton(rect_9).callback=()=>this.teleportRoom(221);
        new ShowHint(rect_10).text='Dance Club';
        new SimpleButton(rect_10).callback=()=>this.teleportRoom(120);
        new ShowHint(rect_11).text='Dock';
        new SimpleButton(rect_11).callback=()=>this.teleportRoom(800);
        new ShowHint(rect_12).text='Town';
        new SimpleButton(rect_12).callback=()=>this.teleportRoom(100);
        new ShowHint(rect_13).text='Gift Shop';
        new SimpleButton(rect_13).callback=()=>this.teleportRoom(130);
        new ShowHint(rect_14).text='Stadium';
        new SimpleButton(rect_14).callback=()=>this.teleportRoom(802);
        new ShowHint(rect_15).text='Pizza Parlor';
        new SimpleButton(rect_15).callback=()=>this.teleportRoom(330);
        new ShowHint(rect_16).text='Lighthouse';
        new SimpleButton(rect_16).callback=()=>this.teleportRoom(410);
        new ShowHint(rect_17).text='Beacon';
        new SimpleButton(rect_17).callback=()=>this.teleportRoom(411);
        new ShowHint(rect_18).text='Sports Shop';
        new SimpleButton(rect_18).callback=()=>this.teleportRoom(210);
        new ShowHint(rect_19).text='Ski Lodge';
        new SimpleButton(rect_19).callback=()=>this.teleportRoom(220);
        new ShowHint(rect_20).text='Book Room';
        new SimpleButton(rect_20).callback=()=>this.teleportRoom(111);
        new ShowHint(rect_21).text='Coffee Shop';
        new SimpleButton(rect_21).callback=()=>this.teleportRoom(110);
        new ShowHint(rect_22).text='Snow Forts';
        new SimpleButton(rect_22).callback=()=>this.teleportRoom(801);
        new ShowHint(rect_23).text='Pet Shop';
        new SimpleButton(rect_23).callback=()=>this.teleportRoom(310);
        new ShowHint(rect_24).text='Plaza';
        new SimpleButton(rect_24).callback=()=>this.teleportRoom(300);
        new ShowHint(rect_25).text='Beach';
        new SimpleButton(rect_25).callback=()=>this.teleportRoom(400);
        let button=new Button(sign);
        button.spriteName='sign';
        button.callback=()=>this.interface.loadWidget('MissionMenu');
        let button_2=new Button(fish);
        button_2.spriteName='fish';
        button_2.callback=()=>this.interface.loadWidget('FISH');
        this.door=truedoor;
        this.cabinet=cabinet;
        this.cabinetnormal=cabinet_2;
        this.interfaceIcons=container;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
    }

    HQDoor() {
        this.door.play('hq-door');
    }

    HQDone() {
        this.door.play('hq-done');
    }

    canEnter() {
        this.cabinet.visible=true;
        this.cabinetnormal.visible=false;
    }

    cabinetHover() {
        this.cabinet.play('cabinet-hover');
    }

    cabinetDone() {
        this.cabinet.play('cabinet-done');
    }

    fakeCabinetHover() {
        this.cabinetnormal.setFrame('cabinet0007');
    }

    fakeCabinetDone() {
        this.cabinetnormal.setFrame('cabinet0001');
    }

    onRoomTrigger() {
        this.world.client.hasItem(380782)?this.triggerRoom(323):this.world.interface.main.mainMissionPrompts.showError('Something feels off about this cabinet,\nperhaps finishing my missions could help me see more...');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
