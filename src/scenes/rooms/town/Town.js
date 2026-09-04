import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Town extends RoomScene {

    constructor() {
        super("Town");

        /* START-USER-CTR-CODE */

        this.canopystarglow;
        this.discostarglow;
        this.disco;
        this.sort;
        this.roomTriggers={'dock':()=>this.triggerRoom(800,1200,400),'forts':()=>this.triggerRoom(801,360,520),'coffee':()=>this.checkCoffeeTutorial(),'dance':()=>this.triggerRoom(120,300,560),'gift':()=>this.triggerRoom(130,1036,520),'welcome':()=>this.triggerRoom(1,570,570)};
        this.music='950';

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('town-pack','assets/media/rooms/town/town-pack.json');
    }

    /** @returns {void} */
    _create() {

        let rect=this.add.rectangle(219,442,128,128);
        rect.scaleX=0.4350917778131066;
        rect.scaleY=0.3619050654191108;
        rect.isFilled=true;
        rect.fillColor=11908533;
        this.add.image(0,0,'town','town-background').setOrigin(0,0);
        let container=this.add.container(1392,375.5);
        let baseball=this.add.image(0,0,'town','baseball');
        container.add(baseball);
        let icerink=this.add.image(0,0,'town','icerink');
        icerink.visible=false;
        container.add(icerink);
        let stadium=this.add.image(0,0,'town','stadium');
        stadium.visible=false;
        container.add(stadium);
        this.add.image(1172,317.5,'town','giftshop');
        this.add.image(215.5,490.5,'town','docksign');
        this.add.image(1327.5,510.5,'town','fortsign');
        let coffeedoor=this.add.image(530.1674027925643,421.3347170224173,'town','coffeedoor0001');
        coffeedoor.setOrigin(0.6512103380676733,0.681171452368846);
        let giftdoor=this.add.image(1053.522536666485,438.5338070020616,'town','giftdoor0001');
        giftdoor.setOrigin(0.3654217602975836,0.6633603333479547);
        let container_2=this.add.container(660.1982622688851,463);
        let canopy=this.add.image(31.80173773111494,0,'town','canopy');
        canopy.setOrigin(0.49606299212598426,0.9403669724770642);
        container_2.add(canopy);
        let canopystarglow=this.add.sprite(-12.198262214660645,-115.52019604926795,'town','canopystarglow0001');
        canopystarglow.setOrigin(0,-0.000721386445617002);
        canopystarglow.visible=false;
        container_2.add(canopystarglow);
        let canopystars=this.add.image(-12.698262214660645,-115.01702767714494,'town','canopystars');
        canopystars.setOrigin(0,-0.000608212017527064);
        container_2.add(canopystars);
        let discostarglow=this.add.sprite(766,331,'town','discostarglow0007');
        discostarglow.setOrigin(0,0);
        discostarglow.visible=false;
        let disco=this.add.image(755.5,228.5,'town','disco0001');
        disco.setOrigin(0,0);
        let clublights=this.add.sprite(518,-74,'town','clublights0001');
        clublights.setOrigin(0,0);
        let box1=this.add.image(973,432,'town','box1');
        box1.setOrigin(0.49382716049382713,0.6268656716417911);
        let box2=this.add.image(956.5,481.5,'town','box2');
        box2.setOrigin(0.49504950495049505,0.6736842105263158);
        let box3=this.add.image(1148,582,'town','box3');
        box3.setOrigin(0.4943820224719101,0.5569620253164557);
        let chair2=this.add.image(438,464,'town','chair2');
        chair2.setOrigin(0.49382716049382713,0.27358490566037735);
        let table2=this.add.image(483,518,'town','table2');
        table2.setOrigin(0.5,0.7864077669902912);
        let chair1=this.add.image(401.5,510.5,'town','chair1');
        chair1.setOrigin(0.49411764705882355,0.2857142857142857);
        let table1=this.add.image(454,573,'town','table1');
        table1.setOrigin(0.49572649572649574,0.7830188679245284);
        let fg_right=this.add.image(1307.029287385085,756.224778245596,'town','fg_right');
        fg_right.setOrigin(0.8598877039311051,0.7877341532290171);
        this.add.image(1121.581662268657,871.3362913861341,'town','fg_mid').setOrigin(0.7378826725451691,0.9076419701938897);
        let fg_left=this.add.image(301.5004468464132,883.3963092599906,'town','fg_left');
        fg_left.setOrigin(0.19835555713579814,0.9202044888124903);
        let sort=[box2,box1,box3,chair2,chair1,table1,table2,container_2,fg_left,fg_right];
        let button=new Button(coffeedoor);
        button.spriteName='coffeedoor';
        button.pixelPerfect=true;
        button.lazyName=true;
        new MoveTo(coffeedoor);
        let button_2=new Button(giftdoor);
        button_2.spriteName='giftdoor';
        button_2.pixelPerfect=true;
        button_2.lazyName=true;
        new MoveTo(giftdoor);
        let simpleButton=new SimpleButton(canopy);
        simpleButton.hoverCallback=()=>this.onCanopyOver();
        simpleButton.hoverOutCallback=()=>this.onCanopyOut();
        let moveTo=new MoveTo(canopy);
        moveTo.x=684;
        moveTo.y=410;
        let animation=new Animation(canopystarglow);
        animation.key='canopystarglow';
        animation.end=57;
        animation.autoPlay=false;
        animation.showOnStart=true;
        animation.hideOnComplete=true;
        let animation_2=new Animation(discostarglow);
        animation_2.key='discostarglow';
        animation_2.end=57;
        animation_2.autoPlay=false;
        animation_2.showOnStart=true;
        animation_2.hideOnComplete=true;
        let animation_3=new Animation(clublights);
        animation_3.key='clublights';
        animation_3.end=69;
        animation_3.repeatDelay=1;
        this.canopystarglow=canopystarglow;
        this.discostarglow=discostarglow;
        this.disco=disco;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
    }

    onCanopyOver() {
        this.disco.setFrame('disco0002');
        this.canopystarglow.__Animation.play();
        this.discostarglow.__Animation.play();
    }

    onCanopyOut() {
        this.disco.setFrame('disco0001');
        this.canopystarglow.__Animation.stop();
        this.discostarglow.__Animation.stop();
    }

    checkCoffeeTutorial() {
        return this.triggerRoom(110,700,450);
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
