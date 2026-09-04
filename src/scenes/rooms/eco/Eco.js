import RoomScene from '../RoomScene'

import { Animation, Button, HoverAnimation, MoveTo, SimpleButton, Zone } from '@components/components'


/* START OF COMPILED CODE */

export default class Eco extends RoomScene {

    constructor() {
        super("Eco");

        /* START-USER-CTR-CODE */

        this.l3_redlight_mc0001;
        this.l5_walllights_mc0001;
        this.belt2;
        this.l7_L2_variant1;
        this.l7_L2_variant2;
        this.l7_L2_variant3;
        this.l7_L2_variant4;
        this.l7_L2_variant5;
        this.belt2container;
        this.l8;
        this.belt1;
        this.l10_L3_variant1;
        this.l10_L3_variant2;
        this.l10_L3_variant3;
        this.l10_L3_variant4;
        this.l10_L3_variant5;
        this.l11_L2_gears_mc0001;
        this.l11_L4_lightsgauge0001;
        this.l11_L5_machinelights0001;
        this.l11_L6_whistlegauge0001;
        this.l11_L6_L20001;
        this.l11_L80001;
        this.l12_L20001;
        this.l12_L3_smalllight0001;
        this.l12_L4_pressbutton;
        this.l13_L2_garbagepile0001;
        this.l10_L30001;
        this.l10_l3_rect;
        this.l18_L10001;
        this.rectangle_invalid;
        this.flap_flap0001;
        this.flap_flap;
        this.computer;
        this.sort;
        this.roomTriggers={'mine':()=>this.triggerRoom(807,116,506)};
        this.music=284;
        this.maxBalls=30;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('eco-pack','assets/media/rooms/eco/eco-pack.json');
    }

    /** @returns {void} */
    _create() {

        let rect=this.add.rectangle(0,0,1520,960);
        rect.setOrigin(0,0);
        rect.isFilled=true;
        rect.fillColor=13028300;
        let rect_2=this.add.rectangle(0,934,1520,30);
        rect_2.setOrigin(0,0);
        rect_2.isFilled=true;
        rect_2.fillColor=12501701;
        this.add.image(760,433,'eco-L1','L1');
        let L2=this.add.image(57,422,'eco-L1','L2');
        let L3_redlight_mc=this.add.sprite(46,241,'eco-L1','L3-redlight_mc0001');
        this.add.image(1191,359,'eco-L1','L4');
        let L5_walllights_mc=this.add.sprite(1102,143,'eco-L1','L5-walllights_mc0001');
        this.add.image(1007,353,'eco-L1','L6');
        let L=this.add.sprite(996,324,'eco-L1-belt2','L10001');
        this.add.image(1154,16,'eco-L1-belt2','normal');
        let variant=this.add.sprite(1198,146,'eco-L1-L7-L2-variant1','variant10001');
        variant.visible=false;
        let variant_2=this.add.sprite(1178,157,'eco-L1-L7-L2-variant2','variant20001');
        variant_2.visible=false;
        let variant_3=this.add.sprite(1157,142,'eco-L1-L7-L2-variant3','variant30001');
        variant_3.visible=false;
        let variant_4=this.add.sprite(1190,147,'eco-L1-L7-L2-variant4','variant40001');
        variant_4.visible=false;
        let variant_5=this.add.sprite(1158,158,'eco-L1-L7-L2-variant5','variant50001');
        variant_5.visible=false;
        let container=this.add.container(0,0);
        let L8=this.add.image(1020,396,'eco-L1','L8');
        this.add.image(1450,335,'eco-L1','L9');
        this.add.image(495,344,'eco-L1-L10','L10/L1');
        let L10_L2_belt=this.add.sprite(509,324,'eco-L1-L10','L10/L2-belt10001');
        let L10_L3_variant=this.add.sprite(498,302,'eco-L1-L10','L10/L3/variant10001');
        let L10_L3_variant_2=this.add.sprite(498,302,'eco-L1-L10','L10/L3/variant20001');
        L10_L3_variant_2.visible=false;
        let L10_L3_variant_3=this.add.sprite(498,302,'eco-L1-L10','L10/L3/variant30001');
        L10_L3_variant_3.visible=false;
        let L10_L3_variant_4=this.add.sprite(498,302,'eco-L1-L10','L10/L3/variant40001');
        L10_L3_variant_4.visible=false;
        let L10_L3_variant_5=this.add.sprite(498,302,'eco-L1-L10','L10/L3/variant50001');
        L10_L3_variant_5.visible=false;
        this.add.image(487,398,'eco-L1-L10','L10/L4');
        this.add.image(752,270,'eco-L1-L11','L11/L1');
        let L11_L2_gears_mc=this.add.sprite(771,313,'eco-L1-L11','L11/L2-gears_mc0001');
        this.add.image(659,300,'eco-L1-L11','L11/L3');
        let L11_L4_lightsgauge=this.add.sprite(695,282,'eco-L1-L11','L11/L4-lightsgauge0001');
        let L11_L5_machinelights=this.add.sprite(660,299,'eco-L1-L11','L11/L5-machinelights0001');
        let L11_L6_whistlegauge=this.add.sprite(860,255,'eco-L1-L11','L11/L6-whistlegauge0001');
        this.add.image(594,231,'eco-L1-L11','L11/L6/L1').angle=-4;
        let L11_L6_L=this.add.sprite(588,161,'eco-L1-L11','L11/L6/L20001');
        L11_L6_L.angle=-4;
        let L11_L=this.add.sprite(1003,211,'eco-L1-L11','L11/L80001');
        this.add.image(831,437,'eco-L1-L11','L12/L1');
        let L12_L=this.add.sprite(810,415,'eco-L1-L11','L12/L20001');
        let L12_L3_smalllight=this.add.sprite(842,398,'eco-L1-L11','L12/L3-smalllight0001');
        let L12_L4_pressbutton=this.add.sprite(845,425,'eco-L1-L11','L12/L4-pressbutton0001');
        this.add.image(299,210,'eco-L1-L11','L13/L1');
        let L13_L2_garbagepile=this.add.sprite(159,161,'eco-L1-L11','L13/L2-garbagepile0001');
        this.add.image(299,283,'eco-L1-L11','L13/L3');
        let L13_L=this.add.sprite(218,376,'eco-L1-L11','L13/L40001');
        this.add.image(300,213,'eco-L1-L11','L13/L5');
        let L2_2=this.add.image(32.18144226074219,945.1181640625,'eco-L2toL10','L2');
        L2_2.setOrigin(0.02117200249663538,0.9844981160935453);
        let L3=this.add.image(10.162567138671875,828.2487182617188,'eco-L2toL10','L3');
        L3.setOrigin(0.006685895525253278,0.8627591017378918);
        let L5=this.add.image(345.527099609375,787.5985107421875,'eco-L2toL10','L5');
        L5.setOrigin(0.22732044785861147,0.8204150967446211);
        let L6=this.add.image(885.836669921875,853.6551513671875,'eco-L2toL10','L6');
        L6.setOrigin(0.5827872266179107,0.8892241048586861);
        this.add.image(0,0,'eco-L2toL10','L7').setOrigin(0,0);
        this.add.image(0,0,'eco-L2toL10','L8').setOrigin(0,0);
        this.add.image(0,0,'eco-L2toL10','L9').setOrigin(0,0);
        let L10_L=this.add.sprite(1346.5067138671875,858.518310546875,'eco-L2toL10','L10/L10001');
        L10_L.setOrigin(0.4639404365230151,0.7849111923696416);
        let L10_L_2=this.add.sprite(1377.50439453125,878.19921875,'eco-L2toL10','L10/L30001');
        L10_L_2.setOrigin(0.4220579847721529,2.3209449919267247);
        let rect_3=this.add.rectangle(1386,688,100,100);
        this.add.image(1398.2672119140625,868.9702758789062,'eco-L11toL30','L11').setOrigin(0.9199126288351396,0.9051773931334761);
        let L12=this.add.image(1418.053955078125,984.393310546875,'eco-L11toL30','L12');
        L12.setOrigin(0.9329302603752594,1.025409684441528);
        this.add.image(0,0,'eco-L11toL30','L13').setOrigin(0,0);
        this.add.image(0,0,'eco-L11toL30','L14').setOrigin(0,0);
        this.add.image(0,0,'eco-L11toL30','L15').setOrigin(0,0);
        this.add.image(1249.8662109375,346.26898193359375,'eco-L11toL30','L16').setOrigin(0.8222803922842403,0.36069687392415556);
        this.add.image(1246.568359375,179.7301025390625,'eco-L11toL30','L17').setOrigin(0.8201107870275537,0.18721885360825216);
        let L18_L=this.add.sprite(1470,111,'eco-L11toL30','L18/L10001');
        this.add.image(1232.9111328125,490.00311279296875,'eco-L11toL30','L19').setOrigin(0.8111257083331886,0.5104199168891539);
        let L20=this.add.image(1278.0726318359375,465.16424560546875,'eco-L11toL30','L20');
        L20.setOrigin(0.8408372727409977,0.48454609621735345);
        let L21=this.add.image(1311.94384765625,444.841552734375,'eco-L11toL30','L21');
        L21.setOrigin(0.8631209460468546,0.46337660657678953);
        let L22=this.add.image(1345.8150634765625,413.2284240722656,'eco-L11toL30','L22');
        L22.setOrigin(0.8854046193527113,0.43044628935813445);
        let L23=this.add.image(1393.234619140625,386.1315002441406,'eco-L11toL30','L23');
        L23.setOrigin(0.9166017619809109,0.4022203031707158);
        let L24=this.add.image(1185.491455078125,514.8419799804688,'eco-L11toL30','L24');
        L24.setOrigin(0.779928565704989,0.5362937375609544);
        let L25=this.add.image(1316.4600830078125,573.5520629882812,'eco-L11toL30','L25');
        L25.setOrigin(0.8660921024876355,0.597450040967028);
        let L26=this.add.image(1287.10498046875,598.390869140625,'eco-L11toL30','L26');
        L26.setOrigin(0.8467795856225595,0.6233238616388286);
        let L27=this.add.image(1370.6539306640625,548.7131958007812,'eco-L11toL30','L27');
        L27.setOrigin(0.9017459797770064,0.5715762202952277);
        let L28=this.add.image(1426.3731689453125,534.3234252929688,'eco-L11toL30','L28');
        L28.setOrigin(0.9387913467703016,0.5582368122951054);
        let L29=this.add.image(1463.235107421875,496.77734375,'eco-L11toL30','L29');
        L29.setOrigin(0.962654686813015,0.5174764134360086);
        let L30=this.add.image(1232.9111328125,627.7459106445312,'eco-L11toL30','L30');
        L30.setOrigin(0.8111257083331886,0.6539020133418654);
        let rect_4=this.add.rectangle(-184,-95,128,128);
        rect_4.isFilled=true;
        let rect_5=this.add.rectangle(807,411,50,100);
        let rect_6=this.add.rectangle(1468,178,100,150);
        let flap_flap=this.add.sprite(833,144,'eco-flap','flap/flap0001');
        let flap_flap_2=this.add.sprite(670,144,'eco-flap','flap/flap0001');
        flap_flap_2.flipX=true;
        let rect_7=this.add.rectangle(347,793,70,50);
        let rect_8=this.add.rectangle(1400,865,100,80);
        let static_2=this.add.sprite(421,669,'eco-computer','static');
        let rect_9=this.add.rectangle(432,714,75,75);
        let sort=[L2_2,L3,L5,L6,L10_L_2,L10_L,L20,L21,L22,L23,L24,L25,L26,L27,L29,L30,L12,static_2,L28];
        new Button(L2).spriteName='L2';
        let moveTo=new MoveTo(L2);
        moveTo.x=136;
        moveTo.y=550;
        let animation=new Animation(L3_redlight_mc);
        animation.key='L3-redlight_mc';
        animation.end=35;
        animation.autoPlay=false;
        let animation_2=new Animation(L);
        animation_2.key='L1';
        animation_2.end=130;
        animation_2.autoPlay=false;
        let animation_3=new Animation(variant);
        animation_3.key='variant1';
        animation_3.end=250;
        animation_3.repeat=0;
        animation_3.autoPlay=false;
        let animation_4=new Animation(variant_2);
        animation_4.key='variant2';
        animation_4.end=250;
        animation_4.repeat=0;
        animation_4.autoPlay=false;
        let animation_5=new Animation(variant_3);
        animation_5.key='variant3';
        animation_5.end=250;
        animation_5.repeat=0;
        animation_5.autoPlay=false;
        let animation_6=new Animation(variant_4);
        animation_6.key='variant4';
        animation_6.end=250;
        animation_6.repeat=0;
        animation_6.autoPlay=false;
        let animation_7=new Animation(variant_5);
        animation_7.key='variant5';
        animation_7.end=250;
        animation_7.repeat=0;
        animation_7.autoPlay=false;
        let animation_8=new Animation(L10_L2_belt);
        animation_8.key='L10/L2-belt1';
        animation_8.end=130;
        let animation_9=new Animation(L10_L3_variant);
        animation_9.key='L10/L3/variant1';
        animation_9.end=180;
        animation_9.repeat=0;
        let animation_10=new Animation(L10_L3_variant_2);
        animation_10.key='L10/L3/variant2';
        animation_10.end=180;
        animation_10.repeat=0;
        animation_10.autoPlay=false;
        let animation_11=new Animation(L10_L3_variant_3);
        animation_11.key='L10/L3/variant3';
        animation_11.end=180;
        animation_11.repeat=0;
        animation_11.autoPlay=false;
        let animation_12=new Animation(L10_L3_variant_4);
        animation_12.key='L10/L3/variant4';
        animation_12.end=180;
        animation_12.repeat=0;
        animation_12.autoPlay=false;
        let animation_13=new Animation(L10_L3_variant_5);
        animation_13.key='L10/L3/variant5';
        animation_13.end=180;
        animation_13.repeat=0;
        animation_13.autoPlay=false;
        let animation_14=new Animation(L11_L2_gears_mc);
        animation_14.key='L11/L2-gears_mc';
        animation_14.end=4;
        animation_14.autoPlay=false;
        let animation_15=new Animation(L11_L4_lightsgauge);
        animation_15.key='L11/L4-lightsgauge';
        animation_15.end=9;
        animation_15.autoPlay=false;
        let animation_16=new Animation(L11_L5_machinelights);
        animation_16.key='L11/L5-machinelights';
        animation_16.end=44;
        animation_16.autoPlay=false;
        let animation_17=new Animation(L11_L6_whistlegauge);
        animation_17.key='L11/L6-whistlegauge';
        animation_17.end=10;
        animation_17.autoPlay=false;
        let animation_18=new Animation(L11_L6_L);
        animation_18.key='L11/L6/L2';
        animation_18.end=3;
        animation_18.autoPlay=false;
        let animation_19=new Animation(L11_L);
        animation_19.key='L11/L8';
        animation_19.end=29;
        animation_19.repeat=0;
        animation_19.autoPlay=false;
        let hoverAnimation=new HoverAnimation(L12_L);
        hoverAnimation.key='L12/L2';
        hoverAnimation.checkpoints='10';
        hoverAnimation.end=20;
        hoverAnimation.hoverZone=rect_4;
        hoverAnimation.completeCallback=()=>this.onLeverComplete();
        hoverAnimation.clickable=true;
        let animation_20=new Animation(L12_L3_smalllight);
        animation_20.key='L12/L3-smalllight';
        animation_20.end=25;
        animation_20.autoPlay=false;
        let animation_21=new Animation(L12_L4_pressbutton);
        animation_21.key='L12/L4-pressbutton';
        animation_21.end=9;
        animation_21.repeat=0;
        animation_21.autoPlay=false;
        new SimpleButton(L12_L4_pressbutton).callback=()=>{this.l12_L4_pressbutton.__Animation.play(),this.onButton();};
        let animation_22=new Animation(L13_L2_garbagepile);
        animation_22.key='L13/L2-garbagepile';
        animation_22.end=600;
        animation_22.repeat=0;
        let animation_23=new Animation(L13_L);
        animation_23.key='L13/L4';
        animation_23.end=30;
        let animation_24=new Animation(L10_L);
        animation_24.key='L10/L1';
        animation_24.end=20;
        let hoverAnimation_2=new HoverAnimation(L10_L_2);
        hoverAnimation_2.key='L10/L3';
        hoverAnimation_2.checkpoints='8';
        hoverAnimation_2.end=16;
        hoverAnimation_2.hoverZone=rect_4;
        hoverAnimation_2.clickable=true;
        new Zone(rect_3).callback=()=>{this.l10_L30001.__HoverAnimation.play();};
        let hoverAnimation_3=new HoverAnimation(L18_L);
        hoverAnimation_3.key='L18/L1';
        hoverAnimation_3.checkpoints='8';
        hoverAnimation_3.end=16;
        hoverAnimation_3.hoverZone=rect_4;
        hoverAnimation_3.completeCallback=()=>this.onLightswitchComplete();
        hoverAnimation_3.clickable=true;
        new Zone(rect_5).callback=()=>{this.onLever();};
        new Zone(rect_6).callback=()=>{this.onLightswitch();};
        let animation_25=new Animation(flap_flap);
        animation_25.key='flap/flap';
        animation_25.end=20;
        animation_25.autoPlay=false;
        let animation_26=new Animation(flap_flap_2);
        animation_26.key='flap/flap';
        animation_26.end=20;
        animation_26.autoPlay=false;
        new Zone(rect_7);
        let moveTo_2=new MoveTo(rect_7);
        moveTo_2.x=344;
        moveTo_2.y=798;
        new Zone(rect_8);
        let moveTo_3=new MoveTo(rect_8);
        moveTo_3.x=1404;
        moveTo_3.y=864;
        new Zone(rect_9).callback=()=>{this.onComputer();};
        this.l3_redlight_mc0001=L3_redlight_mc;
        this.l5_walllights_mc0001=L5_walllights_mc;
        this.belt2=L;
        this.l7_L2_variant1=variant;
        this.l7_L2_variant2=variant_2;
        this.l7_L2_variant3=variant_3;
        this.l7_L2_variant4=variant_4;
        this.l7_L2_variant5=variant_5;
        this.belt2container=container;
        this.l8=L8;
        this.belt1=L10_L2_belt;
        this.l10_L3_variant1=L10_L3_variant;
        this.l10_L3_variant2=L10_L3_variant_2;
        this.l10_L3_variant3=L10_L3_variant_3;
        this.l10_L3_variant4=L10_L3_variant_4;
        this.l10_L3_variant5=L10_L3_variant_5;
        this.l11_L2_gears_mc0001=L11_L2_gears_mc;
        this.l11_L4_lightsgauge0001=L11_L4_lightsgauge;
        this.l11_L5_machinelights0001=L11_L5_machinelights;
        this.l11_L6_whistlegauge0001=L11_L6_whistlegauge;
        this.l11_L6_L20001=L11_L6_L;
        this.l11_L80001=L11_L;
        this.l12_L20001=L12_L;
        this.l12_L3_smalllight0001=L12_L3_smalllight;
        this.l12_L4_pressbutton=L12_L4_pressbutton;
        this.l13_L2_garbagepile0001=L13_L2_garbagepile;
        this.l10_L30001=L10_L_2;
        this.l10_l3_rect=rect_3;
        this.l18_L10001=L18_L;
        this.rectangle_invalid=rect_4;
        this.flap_flap0001=flap_flap;
        this.flap_flap=flap_flap_2;
        this.computer=static_2;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.fixedPlayCount=0;
        this.computerOn=false;
        this.computer.on('animationcomplete',()=>this.onComputerComplete());
        this.ballOptions=['barrel','can','java','mug','newspaper','pizza','puffleo','sauce'];
        this.belt1Playing=true;
        this.belt2Playing=false;
        this.junkPlaying=true;
        this.polishedCounter=0;
        this.thrownItems=0;
    }

    playJunkpile() {
        this.junkPlaying=true;
        this.playBelt1();
    }

    playFixedItem() {
        this.polishedCounter++;
        this.playBelt2();
    }

    playJunkpileIfPossible() {
        this.junkPlaying||this.playJunkpile();
    }

    onJunkpileComplete() {
        this.l11_L2_gears_mc0001.__Animation.play();
        this.flap_flap.__Animation.play();
        this.flap_flap0001.__Animation.play();
        this.time.addEvent({'delay':3300,'callback':()=>{this.playFixedItem(),600>this.getJunkFrame()?this.playJunkpileIfPossible():this.stopBelt1(),this.l11_L2_gears_mc0001.__Animation.stop(),this.flap_flap.__Animation.stop(),this.flap_flap0001.__Animation.stop();},'loop':false});
    }

    playBelt1() {
        this.belt1Playing||(this.belt1Playing=true,this.belt1.__Animation.play());
    }

    stopBelt1() {
        this.belt1.__Animation.stop();
        this.belt1Playing=false;
    }

    earnStamp() {
        this.thrownItems+=1;
        10==this.thrownItems&&this.stampEarned(362);
    }

    getJunkFrame() {
        return this.getFrame(this.l13_L2_garbagepile0001);
    }

    rewindGarbage() {
        this.l13_L2_garbagepile0001.stop();
    }

    onLever() {
        this.l12_L20001.__HoverAnimation.play();
        this.soundManager.playSfx(1==this.l12_L20001.__HoverAnimation.currentAnimation?'eco-lever2-end':'eco-lever2-begin');
    }

    onLightswitch() {
        this.l18_L10001.__HoverAnimation.play();
        this.soundManager.playSfx(1==this.l18_L10001.__HoverAnimation.currentAnimation?'eco-lever1-end':'eco-lever1-begin');
    }

    playAlarm() {
        this.soundManager.playSfx('eco-alarm');
    }

    onLightswitchComplete() {
        this.l3_redlight_mc0001.on('animationrepeat',()=>this.playAlarm());
        1==this.l18_L10001.__HoverAnimation.currentAnimation?(this.l3_redlight_mc0001.__Animation.play(),this.playAlarm()):this.l3_redlight_mc0001.__Animation.stop();
    }

    onButton() {
        this.l12_L4_pressbutton.__Animation.play();
    }

    onComputer() {
        this.computerOn=!this.computerOn;
        this.computerOn?(this.l5_walllights_mc0001.play('eco-walllights-operating'),this.computer.play('eco-computer-startup')):(this.l5_walllights_mc0001.play('eco-walllights-shutdown'),this.computer.play('eco-computer-shutdown'));
    }

    onComputerComplete() {
        this.computerOn&&this.computer.play('eco-computer-operating');
    }

    onPolishedComplete() {
        this.time.addEvent({'delay':500,'callback':()=>{this.polishedCounter--,this.polishedCounter<=0&&this.stopBelt2();},'loop':false});
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
