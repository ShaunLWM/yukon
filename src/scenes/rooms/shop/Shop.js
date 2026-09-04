import RoomScene from '../RoomScene'

import { Animation, Button, HoverAnimation, MoveTo, Zone } from '@components/components'


/* START OF COMPILED CODE */

export default class Shop extends RoomScene {

    constructor() {
        super("Shop");

        /* START-USER-CTR-CODE */

        this.phone;
        this.register;
        this.interfaceIcons;
        this.sort;
        this.roomTriggers={'town':()=>this.triggerRoom(100,1024,588),'shopoffice':()=>this.triggerRoom(131,400,600),'catalog':()=>this.openCatalog()};
        this.music=2372837823;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('shop-pack','assets/media/rooms/shop/shop-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(0,0,'shop','bg').setOrigin(0,0);
        let box=this.add.image(22,933,'shop','box');
        box.setOrigin(0.4098360655737705,0.7272727272727273);
        let door=this.add.image(1028,132,'shop','door');
        door.setOrigin(0,0);
        let speaker=this.add.sprite(-2,175,'shop','speaker0003');
        speaker.setOrigin(0,0);
        let container=this.add.container(1324.9695028627973,663.5011002882876);
        let counter=this.add.image(0.030536885885567244,1.4989092534428892,'shop','counter');
        counter.setOrigin(0.4,0.8102766798418972);
        container.add(counter);
        let phone=this.add.sprite(63.03053688588557,-177.5010907465571,'shop','phone0001');
        phone.setOrigin(0,0);
        container.add(phone);
        let register=this.add.sprite(-102.96946311411443,-289.5010907465571,'shop','register0001');
        register.setOrigin(0,0);
        container.add(register);
        let rect=this.add.rectangle(1292,467,110,100);
        rect.alpha=0.01;
        rect.isFilled=true;
        rect.fillColor=65280;
        let rect_2=this.add.rectangle(1428,541,75,60);
        rect_2.alpha=0.01;
        rect_2.isFilled=true;
        rect_2.fillColor=65280;
        let catalog=this.add.image(1340,1046,'shop','catalog');
        catalog.setOrigin(0,2);
        let officedoor=this.add.image(235,885,'shop','officedoor');
        let sort=[container,box];
        let button=new Button(door);
        button.spriteName='door';
        button.pixelPerfect=true;
        let moveTo=new MoveTo(door);
        moveTo.x=1080;
        moveTo.y=466;
        new Animation(speaker);
        let animation=new Animation(phone);
        animation.key='phone';
        animation.end=55;
        animation.repeat=0;
        animation.autoPlay=false;
        animation.onHover=true;
        animation.stopOnOut=false;
        let hoverAnimation=new HoverAnimation(register);
        hoverAnimation.checkpoints='22';
        hoverAnimation.end=35;
        hoverAnimation.createZone=false;
        hoverAnimation.skipEvents=true;
        new Zone(rect).hoverCallback=()=>this.register.__HoverAnimation.play();
        new Zone(rect_2).hoverCallback=()=>this.phone.__Animation.play();
        let button_2=new Button(catalog);
        button_2.spriteName='catalog';
        button_2.callback=()=>this.openCatalog();
        button_2.pixelPerfect=true;
        new Button(officedoor).spriteName='officedoor';
        new MoveTo(officedoor);
        this.phone=phone;
        this.register=register;
        this.interfaceIcons=catalog;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    openCatalog() {
        this.network.send('open_sprite',{'sprite':'1_5'});
        this.interface.loadWidget('ClothingCatalog');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
