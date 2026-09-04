import RoomScene from '../RoomScene'

import { HoverAnimation, MoveTo, ShowHint, SimpleButton, Zone } from '@components/components'


/* START OF COMPILED CODE */

export default class Beacon extends RoomScene {

    constructor() {
        super("Beacon");

        /* START-USER-CTR-CODE */

        this.inner0001;
        this.jetpack;
        this.light0001;
        this.handle0001;
        this.rectangle_invalid;
        this.sort;
        this.roomTriggers={'lighthouse':()=>this.triggerRoom(410,613,158),'jetpack':()=>this.triggerGame(926),'scope':()=>this.interface.loadWidget('Telescope')};
        this.music='583';

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('beacon-pack','assets/media/rooms/beacon/beacon-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(758,476,'lttop','bg');
        let inner=this.add.image(684,641,'beacon_inner_two','inner0001');
        this.add.image(767,624,'lttop','outer');
        let jetpack=this.add.sprite(1323,570,'lttop','jetpack');
        let front=this.add.image(679,929,'lttop','front');
        front.setOrigin(0.5,1);
        let box=this.add.image(398.80255126953125,407.4191535910128,'lttop','box');
        box.setOrigin(0.9986095164179902,0.19594844245758283);
        let light=this.add.image(337,519,'lttop','light0001');
        light.setOrigin(0,0.7786503750831101);
        let handle=this.add.sprite(480,572,'lttop','handle0001');
        handle.scaleX=0.886147659042706;
        handle.scaleY=0.886147659042706;
        handle.setOrigin(0.44998297772973683,1.0514148842405089);
        let scope=this.add.image(249,295,'lttop','scope');
        let Yep=this.add.image(191,531,'lttop','Yep');
        Yep.setOrigin(0.5889807985193379,0.1729083732016776);
        let rect=this.add.rectangle(-241,15,128,128);
        rect.isFilled=true;
        let rect_2=this.add.rectangle(462,508,90,128);
        let sort=[box,light,front,Yep,handle];
        new ShowHint(jetpack).text='Jetpack Adventure';
        new MoveTo(jetpack);
        let simpleButton=new SimpleButton(jetpack);
        simpleButton.hoverCallback=()=>this.onJetpackOver();
        simpleButton.hoverOutCallback=()=>this.onJetpackOverOut();
        let hoverAnimation=new HoverAnimation(handle);
        hoverAnimation.key='handle';
        hoverAnimation.checkpoints='19';
        hoverAnimation.start=4;
        hoverAnimation.end=29;
        hoverAnimation.hoverZone=rect;
        hoverAnimation.clickable=true;
        let moveTo=new MoveTo(scope);
        moveTo.x=334;
        moveTo.y=390;
        new SimpleButton(scope).pixelPerfect=true;
        new Zone(rect_2).callback=()=>{this.toggleLight();};
        this.inner0001=inner;
        this.jetpack=jetpack;
        this.light0001=light;
        this.handle0001=handle;
        this.rectangle_invalid=rect;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    onJetpackOver() {
        this.jetpack.play('beacon-jetpack');
    }

    onJetpackOverOut() {
        this.jetpack.stop();
        this.jetpack.setTexture('lttop','jetpack');
    }

    toggleLight() {
        this.handle0001.__HoverAnimation.play();
        this.light0001.setTexture('lttop',1==this.handle0001.__HoverAnimation.currentAnimation?'light0002':'light0001');
        this.inner0001.setTexture('beacon_inner_two',1==this.handle0001.__HoverAnimation.currentAnimation?'inner0002':'inter0001');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
