import RoomScene from '../RoomScene'

import { Button, MoveTo, ShowHint, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Boiler extends RoomScene {

    constructor() {
        super("Boiler");

        /* START-USER-CTR-CODE */

        this.drawer1_pngbutworse;
        this.snowballed_2;
        this.shelf_hitbox_4;
        this.snowballed_3;
        this.shelf_hitbox_3;
        this.snowballed_1;
        this.shelf_hitbox_2;
        this.snowballed;
        this.shelf_hitbox_1;
        this.smoke;
        this.drawer1_png;
        this.shelf;
        this.finalClick;
        this.shelf_hitbox_5;
        this.sort;
        this.roomTriggers={'dance':()=>this.triggerRoom(120,934,507),'cave':()=>this.triggerRoom(806,230,620)};
        this.music=6;
        this.maxBalls=30;
        this.physicsKey='boiler-physics';

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('boiler-pack','assets/media/rooms/boiler/boiler-pack.json');
    }

    /** @returns {void} */
    _create() {

        let bg=this.add.image(760,485,'boiler','bg.png');
        bg.scaleX=1.02;
        bg.scaleY=1.02;
        let v=this.add.image(1278,301,'boiler-board');
        v.scaleX=1.05;
        v.scaleY=1.05;
        let boiler_door=this.add.image(582,363,'boiler','boiler-door.png');
        boiler_door.scaleX=1.02;
        boiler_door.scaleY=1.02;
        let drawer1=this.add.sprite(826,550,'boiler','drawer1.png0001');
        let snowballed=this.add.image(826,550,'boiler-secret-two','snowballed');
        snowballed.visible=false;
        let rect=this.add.rectangle(820,544,87,54);
        rect.alpha=1e-26;
        rect.isFilled=true;
        this.add.image(828,473,'boiler','drawer1.png0001');
        let snowballed_2=this.add.image(828,473,'boiler-secret-two','snowballed');
        snowballed_2.visible=false;
        let rect_2=this.add.rectangle(823,466,89,52);
        rect_2.alpha=1e-26;
        rect_2.isFilled=true;
        this.add.image(947,472,'boiler','drawer1.png0001');
        let snowballed_3=this.add.image(947,472,'boiler-secret-two','snowballed');
        snowballed_3.visible=false;
        let rect_3=this.add.rectangle(942,465,89,52);
        rect_3.alpha=1e-26;
        rect_3.isFilled=true;
        this.add.image(949,399,'boiler','drawer1.png0001');
        let snowballed_4=this.add.image(949,399,'boiler-secret-two','snowballed');
        snowballed_4.visible=false;
        let rect_4=this.add.rectangle(945,391,87,57);
        rect_4.alpha=1e-26;
        rect_4.isFilled=true;
        let smoke0001=this.add.sprite(250,199,'boiler','smoke0001.png');
        let main=this.add.image(277.2600538928435,775.0236309168115,'newboiler','main');
        main.scaleX=1.0197888558975952;
        main.scaleY=1.0197888558975952;
        main.setOrigin(0.6937553751717792,0.8476552498963502);
        this.add.image(192,249,'newboiler','top');
        this.add.image(237,269,'newboiler','copper');
        this.add.image(95,755,'newboiler','tubes');
        let archivesbtn=this.add.image(1422.401640359713,933.0820179856432,'boiler-archivesbtn','archivesbtn');
        archivesbtn.setOrigin(0.5146004204136764,1.148907573941141);
        let drawer1_2=this.add.sprite(832,397,'boiler','drawer1.png0001');
        let shelf=this.add.sprite(943,548,'boiler-secret-two','shelf0001');
        let rect_5=this.add.rectangle(1029.5987321837747,561.6863332700739,130,560);
        rect_5.setOrigin(0.5584518519915211,1.0065827172598427);
        rect_5.fillColor=65535;
        rect_5.fillAlpha=0.5;
        let rect_6=this.add.rectangle(936,540,104,67);
        rect_6.visible=false;
        rect_6.alpha=0.0001;
        rect_6.isFilled=true;
        let rect_7=this.add.rectangle(823,387,103,62);
        rect_7.alpha=1e-26;
        rect_7.isFilled=true;
        let sort=[archivesbtn];
        let button=new Button(boiler_door);
        button.spriteName='boiler-door.png';
        button.pixelPerfect=true;
        let moveTo=new MoveTo(boiler_door);
        moveTo.x=582;
        moveTo.y=580;
        let button_2=new Button(main);
        button_2.spriteName='main';
        button_2.callback=()=>{this.triggerRoom(821,0,0);};
        new MoveTo(main);
        let button_3=new Button(archivesbtn);
        button_3.spriteName='archivesbtn';
        button_3.callback=()=>this.onArchives();
        let simpleButton=new SimpleButton(drawer1_2);
        simpleButton.hoverCallback=()=>this.onDrawerOver();
        simpleButton.hoverOutCallback=()=>this.onDrawerOut();
        simpleButton.callback=()=>this.onArchives();
        new ShowHint(drawer1_2).text='archives_hint';
        new SimpleButton(rect_5);
        new MoveTo(rect_5);
        new SimpleButton(rect_6).callback=()=>{this.onClick();};
        this.drawer1_pngbutworse=drawer1;
        this.snowballed_2=snowballed;
        this.shelf_hitbox_4=rect;
        this.snowballed_3=snowballed_2;
        this.shelf_hitbox_3=rect_2;
        this.snowballed_1=snowballed_3;
        this.shelf_hitbox_2=rect_3;
        this.snowballed=snowballed_4;
        this.shelf_hitbox_1=rect_4;
        this.smoke=smoke0001;
        this.drawer1_png=drawer1_2;
        this.shelf=shelf;
        this.finalClick=rect_6;
        this.shelf_hitbox_5=rect_7;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.smoke.play('boiler-steam');
        this.bounds={};
        this.bounds.shelf_hitbox_1=this.shelf_hitbox_1.getBounds();
        this.bounds.shelf_hitbox_2=this.shelf_hitbox_2.getBounds();
        this.bounds.shelf_hitbox_3=this.shelf_hitbox_3.getBounds();
        this.bounds.shelf_hitbox_4=this.shelf_hitbox_4.getBounds();
        this.bounds.shelf_hitbox_5=this.shelf_hitbox_5.getBounds();
        this.clickAmt=0;
        this.loopVar=0;
        this.trueShelf=[0,0,0,0];
        this.snowballer=1;
    }

    onDrawerOver() {
        this.drawer1_png.play('drawerhover');
    }

    onDrawerOut() {
        this.drawer1_png.play('drawerout');
    }

    onArchives() {
        this.interface.loadWidget('Archives')
    }

    flush() {
        for(this.snowballer=1,this.snowballed.visible=false,this.snowballed_1.visible=false,this.snowballed_2.visible=false,this.snowballed_3.visible=false;this.loopVar<4;)this.trueShelf[this.loopVar]=0;
        this.loopVar++;
        this.loopVar=0;
        1==this.clickAmt&&(this.shelf.play('secretOut'),this.finalClick.visible=false,this.clickAmt=0);
    }

    check() {
        42==this.snowballer?this.finalClick.visible=true:(this.finalClick.visible=false,1==this.clickAmt&&(this.shelf.play('secretOut'),this.clickAmt=0));
    }

    onClick() {
        if(0==this.clickAmt){this.shelf.play('secret'),this.clickAmt=1;return;}if(1==this.clickAmt){this.interface.prompt.showItem(6209),this.shelf.play('secretOut'),this.flush(),this.clickAmt=0;return;};
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
