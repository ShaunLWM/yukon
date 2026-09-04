import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Sportshop extends RoomScene {

    constructor() {
        super("Sportshop");

        /* START-USER-CTR-CODE */

        this.register0001;
        this.interfaceIcons;
        this.sort;
        this.roomTriggers={'village':()=>this.triggerRoom(200,1132,551),'psa':()=>this.onPsa(),'shop':()=>this.openCatalog()};
        this.isOut=false;
        this.music=2372837823;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('sportshop-pack','assets/media/rooms/sportshop/sportshop-pack.json');
    }

    /** @returns {void} */
    _create() {

        let bg=this.add.image(761,479,'sportshop','bg');
        bg.scaleX=1.016851083269729;
        bg.scaleY=1.016851083269729;
        let rrr=this.add.image(621,320,'sportshop','rrr');
        rrr.scaleX=1.016851083269729;
        rrr.scaleY=1.016851083269729;
        let lll=this.add.image(511,266,'sportshop','lll');
        lll.scaleX=1.016851083269729;
        lll.scaleY=1.016851083269729;
        let desk=this.add.image(1321.7705388556453,655.9613896226555,'sportshop','desk');
        desk.scaleX=1.016851083269729;
        desk.scaleY=1.016851083269729;
        desk.setOrigin(0.41006122795440964,0.7574136636698175);
        let phone=this.add.sprite(1434.64271252848,699.4777081179842,'sportshop','phone0001');
        phone.scaleX=1.016851083269729;
        phone.scaleY=1.016851083269729;
        phone.setOrigin(0.6292149306624271,1.54564551260158);
        let ball=this.add.sprite(1428.1506194542792,739.6002416249459,'sportshop','ball0001');
        ball.scaleX=1.016851083269729;
        ball.scaleY=1.016851083269729;
        ball.setOrigin(0.45284892142413236,1.1212402790030584);
        let rowing=this.add.image(1318.8802304239,815.200083715275,'sportshop','rowing');
        rowing.scaleX=1.016851083269729;
        rowing.scaleY=1.016851083269729;
        rowing.setOrigin(0.35376165440447105,0.6311240585416843);
        let register=this.add.sprite(1239.1960852695063,781.7556321083152,'sportshop','register0001');
        register.scaleX=1.016851083269729;
        register.scaleY=1.016851083269729;
        register.setOrigin(0.17365155846415586,2.3225190457968012);
        let changing=this.add.image(230,492,'sportshop','changing');
        changing.scaleX=1.016851083269729;
        changing.scaleY=1.016851083269729;
        let door=this.add.sprite(1095,309,'sportshop','door');
        door.scaleX=1.016851083269729;
        door.scaleY=1.016851083269729;
        let sled=this.add.image(99,654,'sportshop','sled');
        sled.scaleX=1.016851083269729;
        sled.scaleY=1.016851083269729;
        let box=this.add.image(41,768,'sportshop','box');
        let backring=this.add.image(133.3184593834646,727.9330631912853,'sportshop','backring');
        backring.scaleX=1.016851083269729;
        backring.scaleY=1.016851083269729;
        backring.setOrigin(0.30019693852818713,0.28717196711542364);
        let frontring=this.add.image(172.70022751403064,792.8788928815964,'sportshop','frontring');
        frontring.scaleX=1.016851083269729;
        frontring.scaleY=1.016851083269729;
        frontring.setOrigin(0.48033250436867153,0.4988091084700204);
        let goggles=this.add.image(166,511,'sportshop','goggles');
        goggles.scaleX=1.016851083269729;
        goggles.scaleY=1.016851083269729;
        let speaker=this.add.sprite(39,317,'sportshop','speaker0001');
        speaker.scaleX=1.016851083269729;
        speaker.scaleY=1.016851083269729;
        let psa=this.add.sprite(404,420,'sportshop','psa');
        psa.scaleX=1.016851083269729;
        psa.scaleY=1.016851083269729;
        let light=this.add.image(1416,109,'sportshop','light');
        light.scaleX=1.016851083269729;
        light.scaleY=1.016851083269729;
        let _3lights=this.add.image(239,166,'sportshop','3lights');
        _3lights.scaleX=1.016851083269729;
        _3lights.scaleY=1.016851083269729;
        let book=this.add.sprite(1404.0000184003459,864.9999661025114,'sportshop','book');
        let sort=[rowing,ball,desk,frontring,backring,box,register,phone];
        let animation=new Animation(phone);
        animation.key='phone';
        animation.end=55;
        animation.repeat=0;
        animation.autoPlay=false;
        animation.onHover=true;
        animation.stopOnOut=false;
        new SimpleButton(phone).pixelPerfect=true;
        let animation_2=new Animation(ball);
        animation_2.key='ball';
        animation_2.end=37;
        animation_2.repeat=0;
        animation_2.autoPlay=false;
        animation_2.onHover=true;
        animation_2.stopOnOut=false;
        new SimpleButton(ball).pixelPerfect=true;
        let simpleButton=new SimpleButton(register);
        simpleButton.hoverCallback=()=>this.onRegOver();
        simpleButton.hoverOutCallback=()=>{};
        simpleButton.pixelPerfect=true;
        new Button(door).spriteName='door';
        let moveTo=new MoveTo(door);
        moveTo.x=1086;
        moveTo.y=486;
        let animation_3=new Animation(speaker);
        animation_3.key='speaker';
        animation_3.end=30;
        new Button(psa).spriteName='psa';
        let moveTo_2=new MoveTo(psa);
        moveTo_2.x=401;
        moveTo_2.y=486;
        let button=new Button(book);
        button.spriteName='book';
        button.callback=()=>this.openCatalog();
        this.register0001=register;
        this.interfaceIcons=book;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
    }

    openCatalog() {
        this.network.send('open_sprite',{'sprite':'1_6'});
        this.interface.loadWidget('SportCatalog');
    }

    onPsa() {
        this.world.client.hasItem(800)?this.triggerRoom(803,257,600):this.openCatalog();
    }

    onRegOver() {
        if(this.isOut){this.register0001.play('down'),this.isOut=!this.isOut;return;}this.register0001.play('up');
        this.isOut=!this.isOut;
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
