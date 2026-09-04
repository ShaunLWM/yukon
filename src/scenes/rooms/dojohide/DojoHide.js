import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton, Zone } from '@components/components'


/* START OF COMPILED CODE */

export default class DojoHide extends RoomScene {

    constructor() {
        super("DojoHide");

        /* START-USER-CTR-CODE */

        this.bridgeWater;
        this.fireTile;
        this.waterTile;
        this.snowTile;
        this.firePathBack;
        this.firePathStairs;
        this.firePathDoor;
        this.firePathFront;
        this.firePathNote;
        this.tabletButton;
        this.tabletGlow;
        this.tablet;
        this.fireBeam;
        this.waddle203;
        this.waddle202;
        this.waddle201;
        this.waddle200;
        this.catalog;
        this.cards;
        this.gong1Zone;
        this.gong2Zone;
        this.gong3Zone;
        this.gong4Zone;
        this.sort;
        this.gongs;
        this.fireParticles;
        this.roomTriggers={'dojoext':()=>this.triggerRoom(321,260,720),'dojofire':()=>this.triggerDojoFire(),'ninja':()=>this.onCatalogClick(),'waddle200':()=>this.triggerMat(204),'waddle201':()=>this.triggerMat(205),'waddle202':()=>this.triggerMat(206),'waddle203':()=>this.triggerMat(207)};
        this.music=21;
        this.waddles={};

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('dojohide-pack','assets/media/rooms/dojohide/dojohide-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-17,529,'dojohide','bg/water').setOrigin(0,0);
        let bg_bridgeref=this.add.sprite(57,743,'dojohide','bg/bridgeref0001');
        bg_bridgeref.setOrigin(0,0);
        this.add.image(-22,-22,'dojohide','bg/bg').setOrigin(0,0);
        this.add.image(461.5,588,'dojohide','bg/path/floor').setOrigin(0,0);
        let bg_path_fire_off=this.add.sprite(506,660,'dojohide','bg/path/fire-off');
        bg_path_fire_off.setOrigin(0,0);
        let bg_path_water_off=this.add.sprite(666,610,'dojohide','bg/path/water-off');
        bg_path_water_off.setOrigin(0,0);
        let bg_path_snow_off=this.add.sprite(692,701,'dojohide','bg/path/snow-off');
        bg_path_snow_off.setOrigin(0,0);
        let door=this.add.image(313,253,'dojohide','door');
        door.setOrigin(0,0);
        let back_lantern=this.add.image(599,410,'dojohide','back_lantern');
        back_lantern.setOrigin(0.5,0.8759461456914207);
        let wood1=this.add.image(39,537,'dojohide','wood1');
        wood1.setOrigin(0.5106382978723404,0.8504672897196262);
        let wood2=this.add.image(160,461,'dojohide','wood2');
        wood2.setOrigin(0.509090909090909,0.8307692307692308);
        let wood3=this.add.image(279,393,'dojohide','wood3');
        wood3.setOrigin(0.5121951219512195,0.8522727272727273);
        let wood4=this.add.image(471,389,'dojohide','wood4');
        wood4.setOrigin(0.5106382978723404,0.8909090909090909);
        let wood5=this.add.image(1048,390,'dojohide','wood5');
        wood5.setOrigin(0.5106382978723404,0.8867924528301887);
        let wood6=this.add.image(1240,395,'dojohide','wood6');
        wood6.setOrigin(0.5121951219512195,0.8402366863905325);
        let wood7=this.add.image(1360,464,'dojohide','wood7');
        wood7.setOrigin(0.509090909090909,0.8342245989304813);
        let wood8=this.add.image(1482,544,'dojohide','wood8');
        wood8.setOrigin(0.5106382978723404,0.8701923076923077);
        let screen=this.add.image(960,409,'dojohide','screen');
        screen.setOrigin(0.5048543689320388,0.9047619047619048);
        let foliage2=this.add.image(335,463,'dojohide','foliage2');
        foliage2.setOrigin(0.5023255813953489,0.5);
        let lantern1=this.add.image(313,484,'dojohide','lantern1');
        lantern1.setOrigin(0.5,0.6964285714285714);
        let foliage3=this.add.image(480,479,'dojohide','foliage3');
        foliage3.setOrigin(0.5028571428571429,0.8580645161290322);
        let container=this.add.container(213,488);
        let pathFire_back=this.add.sprite(-232,-232,'dojohide','pathFire/back0001');
        pathFire_back.setOrigin(0,0);
        container.add(pathFire_back);
        let pathFire_stairs=this.add.image(-93,-48,'dojohide','pathFire/stairs');
        pathFire_stairs.setInteractive(new Phaser.Geom.Polygon('3.701179911498187 49.02808586190798 227.61577391636774 1.5944647019978788 230.0362246492652 149.24690417582644 94.38602987564835 314.00804002271263 3.6247176389649667 314.00804002271263'),Phaser.Geom.Polygon.Contains);
        pathFire_stairs.setOrigin(0,0);
        pathFire_stairs.visible=false;
        container.add(pathFire_stairs);
        let pathFire_door_open=this.add.sprite(44,-8,'dojohide','pathFire/door_open0001');
        pathFire_door_open.setOrigin(0,0);
        container.add(pathFire_door_open);
        let pathFire_front=this.add.sprite(-232,-307,'dojohide','pathFire/front0001');
        pathFire_front.setOrigin(0,0);
        container.add(pathFire_front);
        let pathFire_note=this.add.image(60,7,'dojohide','pathFire/note');
        pathFire_note.setInteractive(new Phaser.Geom.Polygon('1.635780211375561 36.95258684911926 40.14860965760295 2.799700359068538 42.32858113569131 139.4112463192714 0.9091230520127738 190.27724747466607'),Phaser.Geom.Polygon.Contains);
        pathFire_note.setOrigin(0,0);
        pathFire_note.visible=false;
        container.add(pathFire_note);
        let foliage1=this.add.image(55,753,'dojohide','foliage1');
        foliage1.setOrigin(0.5,0.367816091954023);
        let foliage5=this.add.image(1195,463,'dojohide','foliage5');
        foliage5.setOrigin(0.5019455252918288,0.5026737967914439);
        let foliage4=this.add.image(1034,475,'dojohide','foliage4');
        foliage4.setOrigin(0.5029239766081871,0.8513513513513513);
        let rock=this.add.image(1062,497,'dojohide','rock');
        let lantern2=this.add.image(1205,483,'dojohide','lantern2');
        lantern2.setOrigin(0.5,0.6637931034482759);
        let foliage6=this.add.image(1271,501,'dojohide','foliage6');
        foliage6.setOrigin(0.5,0.2636363636363636);
        let foliage7=this.add.image(1475,756,'dojohide','foliage7');
        foliage7.setOrigin(0.5,0.39574468085106385);
        let foliage8=this.add.image(1491,782,'dojohide','foliage8');
        foliage8.setOrigin(0.5048543689320388,0.33714285714285713);
        let gong1_gong=this.add.sprite(62,162,'dojohide','gong1/gong0001');
        gong1_gong.setOrigin(0,0);
        let gong2_gong=this.add.sprite(319,99,'dojohide','gong2/gong0001');
        gong2_gong.setOrigin(0,0);
        let gong3_gong=this.add.sprite(1036,60,'dojohide','gong3/gong0001');
        gong3_gong.setOrigin(0,0);
        let gong4_gong=this.add.sprite(1279,-21,'dojohide','gong4/gong0001');
        gong4_gong.setOrigin(0,0);
        let store=this.add.image(768,425,'dojohide','store');
        store.setOrigin(0.5008912655971479,0.9314775160599572);
        let container_2=this.add.container(423,547);
        let tabletFire_extra1=this.add.image(-54,3,'dojohide','tabletFire/extra1');
        tabletFire_extra1.setOrigin(0,0);
        container_2.add(tabletFire_extra1);
        let container_3=this.add.container(1,-33);
        container_2.add(container_3);
        let tabletFire_button=this.add.image(-51,-79,'dojohide','tabletFire/button');
        tabletFire_button.setOrigin(0,0);
        container_3.add(tabletFire_button);
        let tabletFire_glow=this.add.sprite(-25,-59,'dojohide','tabletFire/glow0001');
        tabletFire_glow.setOrigin(0,0);
        container_3.add(tabletFire_glow);
        let tabletFire_particle=this.add.sprite(27,-146,'dojohide','tabletFire/particle0001');
        tabletFire_particle.setOrigin(0,0);
        container_2.add(tabletFire_particle);
        let tabletFire_particle_2=this.add.sprite(-2,-146,'dojohide','tabletFire/particle0001');
        tabletFire_particle_2.setOrigin(0,0);
        container_2.add(tabletFire_particle_2);
        let tabletFire_particle_3=this.add.sprite(-42,-146,'dojohide','tabletFire/particle0001');
        tabletFire_particle_3.setOrigin(0,0);
        container_2.add(tabletFire_particle_3);
        let tabletFire_particle_4=this.add.sprite(-22,-146,'dojohide','tabletFire/particle0001');
        tabletFire_particle_4.setOrigin(0,0);
        container_2.add(tabletFire_particle_4);
        let tabletFire_particle_5=this.add.sprite(-12,-146,'dojohide','tabletFire/particle0001');
        tabletFire_particle_5.setOrigin(0,0);
        container_2.add(tabletFire_particle_5);
        let tabletFire_particle_6=this.add.sprite(-31,-146,'dojohide','tabletFire/particle0001');
        tabletFire_particle_6.setOrigin(0,0);
        container_2.add(tabletFire_particle_6);
        let tabletFire_particle_7=this.add.sprite(18,-146,'dojohide','tabletFire/particle0001');
        tabletFire_particle_7.setOrigin(0,0);
        container_2.add(tabletFire_particle_7);
        let tabletFire_particle_8=this.add.sprite(37,-146,'dojohide','tabletFire/particle0001');
        tabletFire_particle_8.setOrigin(0,0);
        container_2.add(tabletFire_particle_8);
        let tabletFire_particle_9=this.add.sprite(8,-146,'dojohide','tabletFire/particle0001');
        tabletFire_particle_9.setOrigin(0,0);
        container_2.add(tabletFire_particle_9);
        let tabletFire_beam=this.add.sprite(-47,-198,'dojohide','tabletFire/beam0003');
        tabletFire_beam.setOrigin(0,0);
        tabletFire_beam.visible=false;
        container_2.add(tabletFire_beam);
        let tabletFire_extra2=this.add.image(33,3,'dojohide','tabletFire/extra2');
        tabletFire_extra2.setOrigin(0,0);
        container_2.add(tabletFire_extra2);
        let tabletFire_extra3=this.add.image(-59,18,'dojohide','tabletFire/extra3');
        tabletFire_extra3.setOrigin(0,0);
        container_2.add(tabletFire_extra3);
        this.add.image(605,493,'dojohide','bg/decksteps0001').setOrigin(0,0);
        let catalog=this.add.image(1330,688,'dojohide','catalog');
        catalog.setOrigin(0,0);
        let cards=this.add.image(1342,819,'dojohide','cards');
        cards.setOrigin(0,0);
        let rect=this.add.rectangle(86,180,104,116);
        rect.setOrigin(0,0);
        rect.alpha=0.01;
        rect.isFilled=true;
        rect.fillColor=65280;
        let rect_2=this.add.rectangle(320,106,136,132);
        rect_2.setOrigin(0,0);
        rect_2.alpha=0.01;
        rect_2.isFilled=true;
        rect_2.fillColor=65280;
        let rect_3=this.add.rectangle(1050,74,170,170);
        rect_3.setOrigin(0,0);
        rect_3.alpha=0.01;
        rect_3.isFilled=true;
        rect_3.fillColor=65280;
        let rect_4=this.add.rectangle(1286,46,194,260);
        rect_4.setOrigin(0,0);
        rect_4.alpha=0.01;
        rect_4.isFilled=true;
        rect_4.fillColor=65280;
        let sort=[back_lantern,rock,container_2,container,wood2,wood1,wood3,wood4,wood5,wood6,wood8,wood7,lantern2,lantern1,foliage1,foliage2,foliage3,foliage4,foliage5,foliage6,foliage7,foliage8,store,screen];
        let gongs=[gong1_gong,gong2_gong,gong3_gong,gong4_gong];
        let fireParticles=[tabletFire_particle_3,tabletFire_particle_2,tabletFire_particle,tabletFire_particle_4,tabletFire_particle_5,tabletFire_particle_6,tabletFire_particle_7,tabletFire_particle_8,tabletFire_particle_9];
        let animation=new Animation(bg_bridgeref);
        animation.key='bg/bridgeref';
        animation.end=140;
        let animation_2=new Animation(pathFire_back);
        animation_2.key='pathFire/back';
        animation_2.end=140;
        let animation_3=new Animation(pathFire_door_open);
        animation_3.key='pathFire/door_open';
        animation_3.end=140;
        let animation_4=new Animation(pathFire_front);
        animation_4.key='pathFire/front';
        animation_4.end=140;
        let animation_5=new Animation(tabletFire_glow);
        animation_5.key='tabletFire/glow';
        animation_5.end=80;
        let animation_6=new Animation(tabletFire_beam);
        animation_6.key='tabletFire/beam';
        animation_6.end=10;
        animation_6.autoPlay=false;
        for (let p of fireParticles) {
            let a=new Animation(p);
            a.key='tabletFire/particle';
            a.end=50;
        }
        let animation_7=new Animation(gong1_gong);
        animation_7.key='gong1/gong';
        animation_7.end=40;
        animation_7.repeat=0;
        animation_7.autoPlay=false;
        let animation_8=new Animation(gong2_gong);
        animation_8.key='gong2/gong';
        animation_8.end=40;
        animation_8.repeat=0;
        animation_8.autoPlay=false;
        let animation_9=new Animation(gong3_gong);
        animation_9.key='gong3/gong';
        animation_9.end=40;
        animation_9.repeat=0;
        animation_9.autoPlay=false;
        let animation_10=new Animation(gong4_gong);
        animation_10.key='gong4/gong';
        animation_10.end=40;
        animation_10.repeat=0;
        animation_10.autoPlay=false;
        let zone=new Zone(rect);
        zone.hoverCallback=()=>this.gongs[0].__Animation.play();
        let zone_2=new Zone(rect_2);
        zone_2.hoverCallback=()=>this.gongs[1].__Animation.play();
        let zone_3=new Zone(rect_3);
        zone_3.hoverCallback=()=>this.gongs[2].__Animation.play();
        let zone_4=new Zone(rect_4);
        zone_4.hoverCallback=()=>this.gongs[3].__Animation.play();
        let button=new Button(catalog);
        button.spriteName='catalog';
        button.callback=()=>this.onCatalogClick();
        button.pixelPerfect=true;
        let button_2=new Button(cards);
        button_2.spriteName='cards';
        button_2.callback=()=>this.onCardsClick();
        button_2.pixelPerfect=true;
        let button_3=new Button(door);
        button_3.spriteName='door';
        let moveTo=new MoveTo(door);
        moveTo.x=420;
        moveTo.y=440;
        this.bridgeWater=bg_bridgeref;
        this.fireTile=bg_path_fire_off;
        this.waterTile=bg_path_water_off;
        this.snowTile=bg_path_snow_off;
        this.firePathBack=pathFire_back;
        this.firePathStairs=pathFire_stairs;
        this.firePathDoor=pathFire_door_open;
        this.firePathFront=pathFire_front;
        this.firePathNote=pathFire_note;
        this.tabletButton=tabletFire_button;
        this.tabletGlow=tabletFire_glow;
        this.tablet=container_3;
        this.fireBeam=tabletFire_beam;
        this.catalog=catalog;
        this.cards=cards;
        this.gong1Zone=rect;
        this.gong2Zone=rect_2;
        this.gong3Zone=rect_3;
        this.gong4Zone=rect_4;
        this.sort=sort;
        this.gongs=gongs;
        this.fireParticles=fireParticles;
        this.events.emit('scene-awake');
    }

    userHasDeck() {
        return this.world.client.inventory.award.includes(821);
    }

    userHasAmulet() {
        return this.world.client.inventory.neck.includes(3032);
    }

    fireDoorFrame() {
        return parseInt(this.firePathDoor.frame.name.slice(-4));
    }

    userFireRank() {
        return this.world.client.stamps.includes(264);
    }

    create() {
        super.create();
        this.firePathSprites=[this.firePathBack,this.firePathFront,this.firePathDoor,this.bridgeWater];
        this.firePathDoor.on('animationupdate',this.checkFireDoor,this);
        this.tablet.y=110;
        this.tweens.chain({'targets':this.tablet,'tweens':[{'y':-36,'ease':'Linear','delay':417,'duration':291,'onStart':()=>this.soundManager.playSfx('dojohide/tabletRise',{'volume':1})},{'y':-33,'ease':'Quad.easeOut','duration':83}]});
        this.catalog.depth=1000;
        this.cards.depth=1000;
    }

    resetTabletGlowPosition() {
        this.tabletGlow.x=this.tabletGlowX;
        this.tabletGlow.y=this.tabletGlowY;
    }

    onFireTabletOver() {
        this.fireStoneHover=true;
        this.tabletGlow.y=this.tabletGlowY-5;
        this.fireBeam.play('dojohide/fireBeam_over');
        this.setParticleTimers();
    }

    onFireTabletDown() {
        this.tabletGlow.x=this.tabletGlowX-1;
        this.tabletGlow.y=this.tabletGlowY;
    }

    onFireTabletOut() {
        this.particleTimers=[];
    }

    onFireTabletClick() {
        this.resetTabletGlowPosition();
    }

    onFireNoteClick() {
        this.interface.loadWidget('FirePathNote');
    }

    onCatalogClick() {
        this.interface.loadWidget('NinjaCatalog');
    }

    onCardsClick() {
        this.interface.loadWidget('NinjaProgress');
    }

    triggerDojoFire() {
        this.firePathStairs.visible&&this.triggerRoom(812,1480,400);
    }

    triggerMat(arg1) {
        if(!this.userHasDeck())return void this.interface.prompt.showWindow(this.getString('starter_deck_prompt'));
    }

    checkFireRank() {
        this.world.client.hasStamp(264)?this.fireTile.play('fireTileGlow'):this.fireTile.setFrame('bg/path/fire-off');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
