import RoomScene from '../RoomScene'

import { Animation, Button, HoverAnimation, MoveTo, ShowHint, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Mine extends RoomScene {

    constructor() {
        super("Mine");

        /* START-USER-CTR-CODE */

        this.telephone;
        this.cartAnim;
        this.sort;
        this.roomTriggers={'cave':()=>this.triggerRoom(806,1280,655),'cart':()=>this.triggerGame(905),'cavemine':()=>this.triggerRoom(813,158,512),'rescue':()=>this.triggerGame(927)};

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('mine-pack','assets/media/rooms/mine/mine-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(760,489,'mine','bg/bg');
        let container=this.add.container(764,235);
        let bg_entrance=this.add.sprite(0,0,'mine','bg/entrance0001');
        container.add(bg_entrance);
        let bg_wire=this.add.image(38,-83,'mine','bg/wire');
        container.add(bg_wire);
        let bg_light1=this.add.image(-24,-56,'mine','bg/light1');
        container.add(bg_light1);
        let bg_light2=this.add.image(25,-51,'mine','bg/light2');
        container.add(bg_light2);
        let bg_light2_2=this.add.image(93,-37,'mine','bg/light2');
        bg_light2_2.angle=20;
        container.add(bg_light2_2);
        let bg_lightanim=this.add.sprite(55,-50,'mine','bg/lightanim0001');
        container.add(bg_lightanim);
        let bg_wood=this.add.image(20,-57,'mine','bg/wood');
        container.add(bg_wood);
        this.add.image(542,84,'mine','bg/rescuesign0001');
        let bg_pufflerescue=this.add.image(557,187,'mine','bg/pufflerescue0001');
        let rect=this.add.rectangle(561,201.54595510102953,188,120);
        rect.setOrigin(0.5,0.4212162454519332);
        rect.fillColor=65535;
        rect.fillAlpha=0.5;
        let chair=this.add.image(571,296,'mine','chair');
        this.add.image(398,213,'mine','bg/equipment');
        let rocks=this.add.image(795.5263061523438,339.7232979752952,'mine','rocks');
        rocks.setOrigin(0.44226971609026544,0.6386193252897521);
        let container_2=this.add.container(582.9551391601562,374.9795710724456);
        let table_table=this.add.image(-4.955153361774364,-6.979556740471878,'mine','table/table');
        container_2.add(table_table);
        let v=this.add.ellipse(55,-20,44,12);
        v.isFilled=true;
        v.fillColor=5976078;
        v.fillAlpha=0.56;
        container_2.add(v);
        let table_puffle=this.add.sprite(55.044846638225636,-33.97955674047188,'mine','table/puffle0001');
        container_2.add(table_puffle);
        let table_telephone=this.add.sprite(-52.955153361774364,-32.97955674047188,'mine','table/telephone0001');
        container_2.add(table_telephone);
        let wood=this.add.image(1116,365.54351975730776,'mine','wood');
        wood.setOrigin(0.5,0.92588231796126);
        let shovel=this.add.image(909.9843953442745,458.7876645150541,'mine','shovel');
        shovel.setOrigin(0.46083630317239616,0.8214435731927237);
        let cartanim=this.add.sprite(1209,367,'mine','cartanim0001');
        cartanim.setOrigin(0.1180745482373641,0.6701580748087208);
        cartanim.visible=false;
        let cart2=this.add.image(1138,425.28098321240867,'mine','cart2');
        cart2.setOrigin(0.5,0.601283568882331);
        let cart1=this.add.image(1009,469.6990919490997,'mine','cart1');
        cart1.setOrigin(0.5,0.6316615858764366);
        let container_3=this.add.container(406.280620426912,426.2159594428454);
        let cavewallback_wall=this.add.image(274.7193644312734,-185.21596428897845,'mine','cavewallback/wall');
        container_3.add(cavewallback_wall);
        let cavewallback_lantern=this.add.image(-95,-261,'mine','cavewallback/lantern');
        container_3.add(cavewallback_lantern);
        let cavewallback_candle=this.add.sprite(-94,-230,'mine','cavewallback/candle0001');
        container_3.add(cavewallback_candle);
        let cavewallfront=this.add.image(157,582,'mine','cavewallfront');
        cavewallfront.setOrigin(0.2569234806628597,0.8591608689361728);
        let minesign=this.add.image(1289.353962774777,518.7982605294275,'mine','minesign0001');
        minesign.setOrigin(0.6396505921545457,0.8622487579799021);
        let foreground=this.add.image(-3.5,969,'mine','foreground');
        foreground.setOrigin(0,1);
        let rect_2=this.add.rectangle(530,344,60,50);
        rect_2.fillColor=65535;
        rect_2.fillAlpha=0.5;
        let rect_3=this.add.rectangle(637,342,50,50);
        rect_3.fillColor=65535;
        rect_3.fillAlpha=0.5;
        let v_2=this.add.polygon(1238.1728644060977,303.7248667640935,'84.94083813095381 75.3229853841828 83.76904361679817 -93.4154246542449 309.92538484885745 -92.24363014008915 314.75980346806455 85.4566034144583 159.115936452067 126.79950559058267');
        v_2.setOrigin(0.5462245784535273,0.0350787621909927);
        v_2.fillColor=65535;
        v_2.fillAlpha=0.5;
        let sort=[foreground,minesign,cart1,shovel,cart2,wood,cavewallfront,container_3,rocks,chair,container_2];
        let animation=new Animation(bg_entrance);
        animation.key='bg/entrance';
        animation.end=81;
        let animation_2=new Animation(bg_lightanim);
        animation_2.key='bg/lightanim';
        animation_2.end=160;
        let button=new Button(bg_pufflerescue);
        button.spriteName='bg/pufflerescue';
        button.lazyName=true;
        button.alias=rect;
        new ShowHint(rect).text='rescue_hint';
        let moveTo=new MoveTo(rect);
        moveTo.x=600;
        moveTo.y=400;
        let hoverAnimation=new HoverAnimation(table_puffle);
        hoverAnimation.key='table/puffle';
        hoverAnimation.end=60;
        hoverAnimation.hoverZone=rect_3;
        let hoverAnimation_2=new HoverAnimation(table_telephone);
        hoverAnimation_2.key='table/telephone';
        hoverAnimation_2.end=28;
        hoverAnimation_2.hoverZone=rect_2;
        let animation_3=new Animation(cartanim);
        animation_3.key='cartanim';
        animation_3.end=7;
        animation_3.repeat=0;
        animation_3.autoPlay=false;
        animation_3.showOnStart=true;
        let animation_4=new Animation(cavewallback_candle);
        animation_4.key='cavewallback/candle';
        animation_4.end=14;
        new ShowHint(v_2).text='cart_hint';
        let moveTo_2=new MoveTo(v_2);
        moveTo_2.x=1260;
        moveTo_2.y=400;
        let simpleButton=new SimpleButton(v_2);
        simpleButton.hoverCallback=()=>this.onCartHover();
        simpleButton.hoverOutCallback=()=>this.onCartOut();
        this.telephone=table_telephone;
        this.cartAnim=cartanim;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.telephone.on('animationstart',()=>this.soundManager.playSfx('mine-telephone',{},true));
    }

    onCartHover() {
        this.cartAnim.__Animation.play();
    }

    onCartOut() {
        this.cartAnim.visible=false;
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
