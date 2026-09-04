import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, Zone } from '@components/components'


/* START OF COMPILED CODE */

export default class DojoFire extends RoomScene {

    constructor() {
        super("DojoFire");

        /* START-USER-CTR-CODE */

        this.sensei;
        this.waddle300;
        this.waddle301;
        this.waddle302;
        this.waddle303;
        this.cards;
        this.sort;
        this.roomTriggers={'dojohide':()=>this.triggerRoom(322,360,700),'sensei':()=>this.triggerGame(996),'waddle300':()=>this.triggerMat(300),'waddle301':()=>this.triggerMat(301),'waddle302':()=>this.triggerMat(302),'waddle303':()=>this.triggerMat(303)};
        this.music=22;
        this.waddles={};

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('dojofire-pack','assets/media/rooms/dojofire/dojofire-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-22,-20,'dojofire','bg/distant').setOrigin(0,0);
        let rect=this.add.rectangle(196,459,1129,422);
        rect.setOrigin(0,0);
        rect.isFilled=true;
        rect.fillColor=12139776;
        let bg_flame=this.add.sprite(31,66,'dojofire','bg/flame_10001');
        bg_flame.setOrigin(0,0);
        let bg_flame_2=this.add.sprite(1291,61,'dojofire','bg/flame_20001');
        bg_flame_2.setOrigin(0,0);
        this.add.image(-20,36,'dojofire','bg/volcano').setOrigin(0,0);
        let sensei_sensei=this.add.sprite(636,57,'dojofire','sensei/sensei0001');
        sensei_sensei.setOrigin(0,0);
        this.add.image(868,175,'dojofire','flowers').setOrigin(0,0);
        this.add.image(581,224,'dojofire','cauldron/back').setOrigin(0,0);
        let cauldron_opening=this.add.sprite(596,230,'dojofire','cauldron/opening0001');
        cauldron_opening.setOrigin(0,0);
        let cauldron_glow=this.add.sprite(599,121,'dojofire','cauldron/glow0001');
        cauldron_glow.setOrigin(0,0);
        let cauldron_particles=this.add.sprite(599,206,'dojofire','cauldron/particles0001');
        cauldron_particles.setOrigin(0,0);
        this.add.image(588,235,'dojofire','cauldron/front').setOrigin(0,0);
        let rect_2=this.add.rectangle(638,57,240,240);
        rect_2.setOrigin(0,0);
        rect_2.alpha=0.01;
        rect_2.isFilled=true;
        rect_2.fillColor=65280;
        let bg_poster_1=this.add.image(277,278,'dojofire','bg/poster_1');
        bg_poster_1.setOrigin(0,0);
        let bg_poster_2=this.add.image(1064,282,'dojofire','bg/poster_2');
        bg_poster_2.setOrigin(0,0);
        this.add.image(1008,236,'dojofire','bg/pipe').setOrigin(0,0);
        let stairs=this.add.image(741,335,'dojofire','stairs');
        stairs.setOrigin(0.5009174311926605,0.20512820512820512);
        let hot_sauce=this.add.image(226,544,'dojofire','hot_sauce');
        hot_sauce.setOrigin(0.5084745762711864,0.08695652173913043);
        let flame_flame=this.add.sprite(280,533,'dojofire','flame/flame_10001');
        flame_flame.setOrigin(0.5,0.776);
        let flame_flame_2=this.add.sprite(564,450,'dojofire','flame/flame_20001');
        flame_flame_2.setOrigin(0.5,0.776);
        let flame_flame_3=this.add.sprite(955,450,'dojofire','flame/flame_30001');
        flame_flame_3.setOrigin(0.5,0.776);
        let flame_flame_4=this.add.sprite(1239,534,'dojofire','flame/flame_40001');
        flame_flame_4.setOrigin(0.5,0.776);
        let flame_flame_5=this.add.sprite(254,755,'dojofire','flame/flame_20001');
        flame_flame_5.setOrigin(0.5,0.776);
        let flame_flame_6=this.add.sprite(540,847,'dojofire','flame/flame_30001');
        flame_flame_6.setOrigin(0.5,0.776);
        flame_flame_6.flipX=true;
        let flame_flame_7=this.add.sprite(963,852,'dojofire','flame/flame_40001');
        flame_flame_7.setOrigin(0.5,0.776);
        let flame_flame_8=this.add.sprite(1271,750,'dojofire','flame/flame_10001');
        flame_flame_8.setOrigin(0.5,0.776);
        flame_flame_8.flipX=true;
        let container=this.add.container(0,960);
        let fg_back=this.add.image(-20,-476,'dojofire','fg/back');
        fg_back.setOrigin(0,0);
        container.add(fg_back);
        let fg_lava_left=this.add.sprite(-20,-190,'dojofire','fg/lava_left0001');
        fg_lava_left.setOrigin(0,0);
        container.add(fg_lava_left);
        let fg_lava_right=this.add.sprite(1222,-190,'dojofire','fg/lava_right0001');
        fg_lava_right.setOrigin(0,0);
        container.add(fg_lava_right);
        let fg_front=this.add.image(-20,-204,'dojofire','fg/front');
        fg_front.setOrigin(0,0);
        container.add(fg_front);
        let cards_button=this.add.image(1344,819,'dojofire','cards_button');
        cards_button.setOrigin(0,0);
        let sort=[container,stairs,hot_sauce,flame_flame_8,flame_flame_7,flame_flame_6,flame_flame_5,flame_flame_4,flame_flame_3,flame_flame_2,flame_flame];
        let animation=new Animation(bg_flame);
        animation.key='bg/flame_1';
        animation.end=10;
        let animation_2=new Animation(bg_flame_2);
        animation_2.key='bg/flame_2';
        animation_2.end=10;
        let animation_3=new Animation(cauldron_opening);
        animation_3.key='cauldron/opening';
        animation_3.end=30;
        let animation_4=new Animation(cauldron_glow);
        animation_4.key='cauldron/glow';
        animation_4.end=60;
        let animation_5=new Animation(cauldron_particles);
        animation_5.key='cauldron/particles';
        animation_5.end=30;
        let zone=new Zone(rect_2);
        zone.hoverCallback=()=>this.onSenseiOver();
        zone.hoverOutCallback=()=>this.onSenseiOut();
        zone.callback=()=>this.onSenseiClick();
        let moveTo=new MoveTo(rect_2);
        moveTo.x=760;
        moveTo.y=320;
        let button=new Button(bg_poster_1);
        button.spriteName='bg/poster_1';
        button.callback=()=>this.onLegendClick();
        button.pixelPerfect=true;
        let button_2=new Button(bg_poster_2);
        button_2.spriteName='bg/poster_2';
        button_2.callback=()=>this.onInstructionsClick();
        button_2.pixelPerfect=true;
        let animation_6=new Animation(flame_flame);
        animation_6.key='flame/flame_1';
        animation_6.end=11;
        let animation_7=new Animation(flame_flame_2);
        animation_7.key='flame/flame_2';
        animation_7.end=11;
        let animation_8=new Animation(flame_flame_3);
        animation_8.key='flame/flame_3';
        animation_8.end=11;
        let animation_9=new Animation(flame_flame_4);
        animation_9.key='flame/flame_4';
        animation_9.end=11;
        let animation_10=new Animation(flame_flame_5);
        animation_10.key='flame/flame_2';
        animation_10.end=11;
        let animation_11=new Animation(flame_flame_6);
        animation_11.key='flame/flame_3';
        animation_11.end=11;
        let animation_12=new Animation(flame_flame_7);
        animation_12.key='flame/flame_4';
        animation_12.end=11;
        let animation_13=new Animation(flame_flame_8);
        animation_13.key='flame/flame_1';
        animation_13.end=11;
        let animation_14=new Animation(fg_lava_left);
        animation_14.key='fg/lava_left';
        animation_14.end=50;
        let animation_15=new Animation(fg_lava_right);
        animation_15.key='fg/lava_right';
        animation_15.end=50;
        let button_3=new Button(cards_button);
        button_3.spriteName='cards_button';
        button_3.callback=()=>this.interface.loadWidget('NinjaProgress');
        button_3.pixelPerfect=true;
        this.sensei=sensei_sensei;
        this.cards=cards_button;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    userHasDeck() {
        return this.world.client.inventory.award.includes(8006);
    }

    userHasStarterDeck() {
        return this.world.client.inventory.award.includes(821);
    }

    create() {
        super.create();
        this.cards.depth=1000;
        this.setupSoundTimer('lava1',60,122);
        this.setupSoundTimer('lava1',60,128);
        this.setupSoundTimer('lava2',70,121);
        this.setupSoundTimer('lava2',70,124);
        this.setupSoundTimer('lava3',70,139);
        this.setupSoundTimer('lava4',70,140);
        this.setupSoundTimer('lava4',70,139);
        this.checkStarterDeck();
    }

    stop() {
        super.stop();
    }

    onSenseiOver() {
        this.sensei.play('dojofire/sensei_over');
        this.playSenseiSounds();
    }

    onSenseiOut() {
        this.sensei.play('dojofire/sensei_out');
        this.playSenseiSounds();
    }

    onSenseiClick() {
        this.sensei.anims.stop();
        this.sensei.setFrame('sensei/sensei0019');
    }

    playSenseiSounds() {
        this.playSound('sensei_poof');
        this.playSound('sensei_flare');
    }

    triggerMat(arg1) {
        if(!this.userHasDeck)return void this.interface.prompt.showWindow(this.getString('fire_deck_prompt'));
    }

    onLegendClick() {
        this.interface.loadWidget('FireItems');
    }

    onInstructionsClick() {
        this.interface.loadWidget('FireInstructions');
    }

    checkStarterDeck() {
        this.userHasStarterDeck||this.network.send('add_starter_deck');
    }

    setupSoundTimer(key, interval, volume) {
        this.time.addEvent({
            delay: interval * 1000,
            loop: true,
            callback: () => this.playSound(`dojofire/${key}`, { volume: (volume || 100) / 100 })
        });
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
