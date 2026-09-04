import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, ShowHint, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Cove extends RoomScene {

    constructor() {
        super("Cove");

        /* START-USER-CTR-CODE */

        this.hut;
        this.interfaceIcons;
        this.catalogirl;
        this.sort;
        this.roomTriggers={'forest':()=>this.triggerRoom(809,1190,750),'waves':()=>this.triggerGame(912)};
        this.music=34234234;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('cove-pack','assets/media/rooms/cove/cove-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-2,-15,'cove','bg').setOrigin(0,0);
        this.add.image(-5,5,'cove','cliff_1').setOrigin(0,0);
        let water_water_15=this.add.image(1109,673,'cove','water/water_15');
        water_water_15.setOrigin(0.5011135857461024,2.909090909090909);
        let water_water_14=this.add.image(1034,695,'cove','water/water_14');
        water_water_14.setOrigin(0.5,1.9545454545454546);
        let water_water_13=this.add.image(1002,717,'cove','water/water_13');
        water_water_13.setOrigin(0.5006993006993007,1.9545454545454546);
        let water_water_12=this.add.image(995,739,'cove','water/water_12');
        water_water_12.setOrigin(0.5,1.9545454545454546);
        let water_water_11=this.add.image(1011,761,'cove','water/water_11');
        water_water_11.setOrigin(0.5005662514156285,1.9545454545454546);
        let water_water_10=this.add.image(1031,783,'cove','water/water_10');
        water_water_10.setOrigin(0.5005045408678103,1.9545454545454546);
        let water_water_9=this.add.image(1024,805,'cove','water/water_9');
        water_water_9.setOrigin(0.5,1.9545454545454546);
        let water_water_8=this.add.image(1014,827,'cove','water/water_8');
        water_water_8.setOrigin(0.5,1.65625);
        let water_water_7=this.add.image(1008,849,'cove','water/water_7');
        water_water_7.setOrigin(0.5004821600771456,1.9545454545454546);
        let water_water_6=this.add.image(1008,871,'cove','water/water_6');
        water_water_6.setOrigin(0.5004812319538018,1.9545454545454546);
        let water_water_5=this.add.image(1018,893,'cove','water/water_5');
        water_water_5.setOrigin(0.5,1.9545454545454546);
        let water_water_4=this.add.image(1026,915,'cove','water/water_4');
        water_water_4.setOrigin(0.5005015045135406,1.9545454545454546);
        let water_water_3=this.add.image(1005,937,'cove','water/water_3');
        water_water_3.setOrigin(0.5,1.9545454545454546);
        let water_water_2=this.add.image(1005,959,'cove','water/water_2');
        water_water_2.setOrigin(0.5,1.9545454545454546);
        let water_water_1=this.add.image(1005,981,'cove','water/water_1');
        water_water_1.setOrigin(0.5,1.9545454545454546);
        let hut=this.add.image(1326,423,'cove','hut');
        hut.setOrigin(0.5537459283387622,0.43842364532019706);
        let hut_wall=this.add.image(1440,545,'cove','hut_wall');
        hut_wall.setOrigin(0.5210526315789473,0.8577777777777778);
        let boards=this.add.image(1101,485,'cove','boards');
        boards.setOrigin(0.502262443438914,0.8586956521739131);
        let rock_1=this.add.image(461,884,'cove','rock_1');
        rock_1.setOrigin(0.456,0.6329113924050633);
        let fg=this.add.image(-12,963,'cove','fg');
        fg.setOrigin(0,1);
        this.add.image(108,285,'cove','log_1').setOrigin(0,0);
        let fire=this.add.sprite(435,600,'cove','fire0001');
        fire.setOrigin(0.5029239766081871,0.7318840579710145);
        let chair_arm=this.add.image(633,283,'cove','chair_arm');
        chair_arm.setOrigin(0.40298507462686567,0.7115384615384616);
        let binocularbtn=this.add.image(651,300,'binocularbtn','binocularbtn');
        binocularbtn.setOrigin(1.0597014925373134,1.1666666666666667);
        let silver_board=this.add.image(1463,557,'cove','silver_board');
        silver_board.setOrigin(0.5167785234899329,0.8613445378151261);
        let rock_4=this.add.image(1497,583,'cove','rock_4');
        rock_4.setOrigin(0.5094339622641509,0.5423728813559322);
        let rock_2=this.add.image(1292,697,'cove','rock_2');
        rock_2.setOrigin(0.4935064935064935,0.6458333333333334);
        let rock_3=this.add.image(1447,690,'cove','rock_3');
        rock_3.setOrigin(0.5588235294117647,0.5949367088607594);
        this.add.image(1310,493,'cove','hut_stool').setOrigin(0.5,0.5185185185185185);
        let rect=this.add.rectangle(1282,449,128,128);
        rect.scaleX=1.7037874761911826;
        rect.scaleY=1.2927799407196054;
        let catalogbtn=this.add.image(1434,891,'cove-catalogbtn','catalogbtn');
        let catalogirl=this.add.sprite(1062,572,'cove-catalogbtn','catalogirl0001');
        catalogirl.setOrigin(0.9210526315789473,4.035714285714286);
        let sort=[water_water_15,water_water_1,water_water_2,water_water_3,water_water_4,water_water_5,water_water_6,water_water_7,water_water_8,water_water_9,water_water_10,water_water_11,water_water_12,water_water_13,water_water_14,hut_wall,boards,rock_1,fire,chair_arm,binocularbtn,silver_board,rock_3,rock_2,rock_4,fg,catalogirl];
        let moveTo=new MoveTo(hut);
        moveTo.x=1250;
        moveTo.y=500;
        let animation=new Animation(fire);
        animation.key='fire';
        animation.end=10;
        let button=new Button(binocularbtn);
        button.spriteName='binocularbtn';
        button.callback=()=>this.interface.loadWidget('Binoculars');
        new ShowHint(rect).text='Catchin\' Waves';
        let moveTo_2=new MoveTo(rect);
        moveTo_2.x=1282;
        moveTo_2.y=449;
        let simpleButton=new SimpleButton(rect);
        simpleButton.hoverCallback=()=>{this.hutHover();};
        simpleButton.hoverOutCallback=()=>{this.hutHoverOut();};
        let button_2=new Button(catalogbtn);
        button_2.spriteName='catalogbtn';
        button_2.callback=()=>this.onCatalog();
        let animation_2=new Animation(catalogirl);
        animation_2.key='catalogirl';
        animation_2.start=2;
        animation_2.end=7;
        animation_2.repeat=0;
        animation_2.autoPlay=false;
        let simpleButton_2=new SimpleButton(catalogirl);
        simpleButton_2.hoverCallback=()=>this.onCatalogIrlHover();
        simpleButton_2.hoverOutCallback=()=>this.onCatalogIrlHoverOut();
        simpleButton_2.callback=()=>this.onCatalog();
        this.hut=hut;
        this.interfaceIcons=catalogbtn;
        this.catalogirl=catalogirl;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
    }

    onCatalog() {
        this.interface.loadWidget('CoveCatalog');
    }

    onCatalogIrlHover() {
        this.catalogirl.__Animation.play();
    }

    onCatalogIrlHoverOut() {
        this.catalogirl.__Animation.stop();
        this.catalogirl.setFrame('catalogirl0001');
    }

    hutHover() {
        this.hut.setFrame('hut-hover');
    }

    hutHoverOut() {
        this.hut.setFrame('hut');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
