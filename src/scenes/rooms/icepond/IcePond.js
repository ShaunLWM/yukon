import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, ShowHint, SimpleButton, Zone } from '@components/components'


/* START OF COMPILED CODE */

export default class IcePond extends RoomScene {

    constructor() {
        super("IcePond");

        /* START-USER-CTR-CODE */

        this.fluffyjump0001;
        this.fluffyjump0006;
        this.equipment;
        this.fishinfishbox;
        this.interfaceIcons;
        this.sort;
        this.roomTriggers={'lodge':()=>this.triggerRoom(220,945,460),'fishing':()=>this.triggerGame(904),'fluffy':()=>this.triggerGame(942)};
        this.music='1250';

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('icepond-pack','assets/media/rooms/icepond/icepond-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(788,740,'icepond','hole');
        this.add.image(0,0,'icepond','bg').setOrigin(0,0);
        let fluffyjump=this.add.sprite(768,687.6121340735475,'icepond','fluffyjump0014');
        fluffyjump.setOrigin(0.5,0.40652605485852394);
        fluffyjump.visible=false;
        let fluffydip=this.add.sprite(760,686,'icepond','fluffydip0001');
        fluffydip.setOrigin(0.11010329757480819,0.42448198733514964);
        fluffydip.visible=false;
        let door=this.add.image(137,568,'icepond','door');
        let fishingrod=this.add.image(270.612548828125,665.5835325115999,'icepond','fishingrod');
        fishingrod.setOrigin(0.6583965642335293,0.9086618781078621);
        let bigtreeside=this.add.image(1147.0917875589907,325.1105005086057,'icepond','bigtreeside');
        bigtreeside.setOrigin(0.47419486517271636,0.80267578762628);
        let bigtreemain=this.add.image(1213.6187744140625,440.637451171875,'icepond','bigtreemain');
        bigtreemain.setOrigin(0.5315951604949455,0.964478227792195);
        let fishbox=this.add.image(607.2113683878787,674.3308251140149,'icepond','fishbox');
        fishbox.setOrigin(0.4547759809503713,0.7320354732672985);
        let equipment=this.add.sprite(517,710.7672675570568,'icepond','equipment');
        equipment.setOrigin(0.5,0.8926426460122885);
        let treefront=this.add.image(76.81526569226222,983.5190189169656,'icepond','treefront');
        treefront.setOrigin(0.6344542305217434,0.9094472910939578);
        let holeside=this.add.image(642.7177043117371,697.3535740539824,'icepond','holeside');
        holeside.setOrigin(-0.007789495428456567,-0.23774189172267768);
        let rect=this.add.rectangle(788,740,220,90);
        let fishinfishbox=this.add.sprite(607.7741864690926,677.5271514231778,'icepond','fishinfishbox0018');
        fishinfishbox.setOrigin(0.44211197245909895,1.7744554634798235);
        fishinfishbox.visible=false;
        let rect_2=this.add.rectangle(575,646,200,150);
        let catalog=this.add.sprite(250,413,'icepond','catalog0001');
        let catalogbtn=this.add.image(1438.7424970510153,879.3619857544014,'icepond','catalogbtn');
        let sort=[bigtreemain,equipment,treefront,bigtreeside,fishingrod,fishbox,holeside,fluffyjump,fluffydip,fishinfishbox,catalog];
        new Button(door).spriteName='door';
        let moveTo=new MoveTo(door);
        moveTo.x=147;
        moveTo.y=748;
        let zone=new Zone(rect);
        zone.hoverCallback=()=>{this.onFluffyHover();};
        zone.hoverOutCallback=()=>{this.onFluffyHoverOut();};
        zone.callback=()=>{this.onFluffyHoverOut();};
        let moveTo_2=new MoveTo(rect);
        moveTo_2.x=785;
        moveTo_2.y=750;
        new ShowHint(rect).text='fluffy_hint';
        let zone_2=new Zone(rect_2);
        zone_2.hoverCallback=()=>{this.onFishHover();};
        zone_2.hoverOutCallback=()=>{this.onFishHoverOut();};
        new ShowHint(rect_2).text='fish_hint';
        let moveTo_3=new MoveTo(rect_2);
        moveTo_3.x=582;
        moveTo_3.y=646;
        let animation=new Animation(catalog);
        animation.key='catalog';
        animation.end=7;
        animation.repeat=0;
        animation.autoPlay=false;
        animation.onHover=true;
        new SimpleButton(catalog).callback=()=>{this.onCatalog();};
        let button=new Button(catalogbtn);
        button.spriteName='catalogbtn';
        button.callback=()=>{this.onCatalog();};
        this.fluffyjump0001=fluffyjump;
        this.fluffyjump0006=fluffydip;
        this.equipment=equipment;
        this.fishinfishbox=fishinfishbox;
        this.interfaceIcons=catalogbtn;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.fluffyjump0001.on('animationcomplete',()=>{this.fluffyjump0001.play('icepondfluffyloop');});
        this.fluffyjump0006.on('animationcomplete',()=>{this.fluffyjump0006.visible=false;});
    }

    onFluffyHover() {
        this.fluffyjump0001.visible=true;
        this.fluffyjump0001.play('icepondfluffyjump');
    }

    onFluffyHoverOut() {
        this.fluffyjump0006.visible=this.fluffyjump0001.visible;
        this.fluffyjump0001.visible=false;
        this.fluffyjump0006.play('icepondfluffydip');
    }

    onFishHover() {
        this.equipment.setTexture('icepond','equipment-hover');
        this.fishinfishbox.visible=true;
        this.fishinfishbox.play('fishinfishbox');
    }

    onFishHoverOut() {
        this.equipment.setTexture('icepond','equipment');
        this.fishinfishbox.visible=false;
    }

    onCatalog() {
        this.interface.loadWidget('LodgeCatalog');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
