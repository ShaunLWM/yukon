import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton, Zone } from '@components/components'


/* START OF COMPILED CODE */

export default class DojoExt extends RoomScene {

    constructor() {
        super("DojoExt");

        /* START-USER-CTR-CODE */

        this.secretDoor;
        this.secretNote;
        this.stone;
        this.cards;
        this.secretZone;
        this.sort;
        this.roomTriggers={'map':()=>this.interface.loadWidget('Map'),'dojo':()=>this.triggerRoom(320,400,660),'dojohide':()=>this.triggerDojoHide()};
        this.music=404;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('dojoext-pack','assets/media/rooms/dojoext/dojoext-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-12,-10,'dojoext','bg/sky').setOrigin(0,0);
        let bg_smoke=this.add.sprite(76,178,'dojoext','bg/smoke0001');
        bg_smoke.setOrigin(0,0);
        this.add.image(-12,339,'dojoext','bg/volcano').setOrigin(0,0);
        this.add.image(956,61,'dojoext','bg/mountains2').setOrigin(0,0);
        this.add.image(156,228,'dojoext','bg/cliff').setOrigin(0,0);
        this.add.image(279,254,'dojoext','bg/waterfall/center').setOrigin(0,0);
        let bg_waterfall_side=this.add.sprite(258,254,'dojoext','bg/waterfall/side0001');
        bg_waterfall_side.setOrigin(0,0);
        let bg_waterfall_particles=this.add.sprite(273,258,'dojoext','bg/waterfall/particles0001');
        bg_waterfall_particles.setOrigin(0,0);
        let bg_waterfall_top=this.add.sprite(267,258,'dojoext','bg/waterfall/top0001');
        bg_waterfall_top.setOrigin(0,0);
        let bg_waterfall_middle=this.add.sprite(268,336,'dojoext','bg/waterfall/middle0001');
        bg_waterfall_middle.setOrigin(0,0);
        let bg_waterfall_gradient=this.add.sprite(182,390,'dojoext','bg/waterfall/gradient0001');
        bg_waterfall_gradient.setOrigin(0,0);
        this.add.image(-12,107,'dojoext','bg/mountains1').setOrigin(0,0);
        this.add.image(-8,32,'dojoext','bg/gradient').setOrigin(0,0);
        this.add.image(-15,416,'dojoext','bg/hideout').setOrigin(0,0);
        let secret_door=this.add.image(242,567,'dojoext','secret/door');
        secret_door.setOrigin(0,0);
        let secret_note=this.add.image(254,591,'dojoext','secret/note');
        secret_note.setOrigin(0,0);
        let secret_stone=this.add.sprite(224,559,'dojoext','secret/stone0001');
        secret_stone.setOrigin(0,0);
        this.add.image(296,-10,'dojoext','bg/dojo').setOrigin(0,0);
        let door=this.add.image(683,418,'dojoext','door');
        door.setOrigin(0,0);
        this.add.image(690,426,'dojoext','door_top').setOrigin(0,0);
        let fg_right=this.add.image(1358,908,'dojoext','fg_right');
        fg_right.setOrigin(0.5014492753623189,0.8541666666666666);
        let fg_left=this.add.image(192,907,'dojoext','fg_left');
        fg_left.setOrigin(0.5012406947890818,0.7310924369747899);
        let stairs=this.add.image(788,814,'dojoext','stairs');
        stairs.setOrigin(0.500578034682081,0.44755244755244755);
        let cards=this.add.sprite(1344,823,'dojoext','cards');
        cards.setOrigin(0,0);
        let rect=this.add.rectangle(222,560,117,128);
        rect.setOrigin(0,0);
        rect.alpha=0.01;
        rect.isFilled=true;
        rect.fillColor=65280;
        let sort=[fg_right,fg_left,stairs];
        let animation=new Animation(bg_smoke);
        animation.key='bg/smoke';
        animation.end=28;
        let animation_2=new Animation(bg_waterfall_side);
        animation_2.key='bg/waterfall/side';
        animation_2.end=12;
        let animation_3=new Animation(bg_waterfall_particles);
        animation_3.key='bg/waterfall/particles';
        animation_3.end=30;
        let animation_4=new Animation(bg_waterfall_top);
        animation_4.key='bg/waterfall/top';
        animation_4.end=12;
        let animation_5=new Animation(bg_waterfall_middle);
        animation_5.key='bg/waterfall/middle';
        animation_5.end=12;
        let animation_6=new Animation(bg_waterfall_gradient);
        animation_6.key='bg/waterfall/gradient';
        animation_6.end=10;
        let button=new Button(secret_door);
        button.spriteName='secret/door';
        button.callback=()=>this.triggerDojoHide();
        let button_2=new Button(secret_note);
        button_2.spriteName='secret/note';
        button_2.callback=()=>this.onNoteClick();
        button_2.pixelPerfect=true;
        let button_3=new Button(door);
        button_3.spriteName='door';
        let moveTo=new MoveTo(door);
        moveTo.x=760;
        moveTo.y=570;
        let button_4=new Button(cards);
        button_4.spriteName='cards';
        button_4.callback=()=>this.onCardsClick();
        button_4.pixelPerfect=true;
        let zone=new Zone(rect);
        zone.hoverCallback=()=>this.onSecretZoneOver();
        this.secretDoor=secret_door;
        this.secretNote=secret_note;
        this.stone=secret_stone;
        this.cards=cards;
        this.secretZone=rect;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    userIsNinja() {
        return this.world.client.inventory.face.includes(104);
    }

    userHasDeck() {
        return this.world.client.inventory.award.includes(821);
    }

    stoneFrame() {
        return parseInt(this.stone.frame.name.slice(-4));
    }

    create() {
        super.create();
        const isNinja = this.userIsNinja();
        if (this.secretDoor.__Button) this.secretDoor.__Button.lockFrame = !isNinja;
        this.secretNote.visible = !isNinja;
        this.cards.visible = this.userHasDeck();
        this.cards.depth = 1000;
        this.stone.on('animationupdate', this.checkStone, this);
        this.stone.on('animationcomplete-dojoext/stone-intro', () => this.stone.play('dojoext/stone'));
    }

    onSecretZoneOver() {
        this.secretZone.zone.visible=false;
        this.stone.play('dojoext/stone-intro');
    }

    onSecretDoorOver() {
        this.stoneFrame>11&&(this.stone.stop(),this.stone.setFrame('secret/stone0012'));
    }

    onSecretDoorOut() {
        this.stoneFrame>11&&this.stone.play('dojoext/stone');
    }

    checkStone() {
        103===this.stoneFrame&&(this.secretZone.zone.visible=true);
    }

    onNoteClick() {
        this.interface.loadWidget('SenseiNote');
    }

    onCardsClick() {
        this.interface.loadWidget('NinjaProgress');
    }

    triggerDojoHide() {
        this.userIsNinja()&&this.triggerRoom(322,380,420);
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
