import RoomScene from '../RoomScene'

import { Animation, MoveTo, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class BoxDimension extends RoomScene {

    constructor() {
        super("BoxDimension");

        /* START-USER-CTR-CODE */

        this.clouds;
        this.plok;
        this.sort;
        this.roomTriggers={'map':()=>this.interface.loadWidget('Map')};
        this.music=264;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('boxdimension-pack','assets/media/rooms/boxdimension/boxdimension-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(775,499,'boxdimension','purplesky');
        let container=this.add.container(-609,174);
        let cloud1=this.add.image(397,14,'boxdimension','cloud1');
        container.add(cloud1);
        let cloud2=this.add.image(800,1,'boxdimension','cloud2');
        container.add(cloud2);
        let cloud2_2=this.add.image(0,0,'boxdimension','cloud2');
        container.add(cloud2_2);
        let cloud1_2=this.add.image(1200,14,'boxdimension','cloud1');
        container.add(cloud1_2);
        this.add.image(1389,497,'boxdimension','purplesky').scaleX=0.17594878427795768;
        this.add.image(760,468,'boxdimension','purpleskyAbove');
        let container_2=this.add.container(-15,18);
        let bgboxes_t=this.add.sprite(390,150,'boxdimension','bgboxes/t0001');
        container_2.add(bgboxes_t);
        let bgboxes_s=this.add.sprite(80,178,'boxdimension','bgboxes/s0001');
        container_2.add(bgboxes_s);
        let bgboxes_r=this.add.sprite(106,137,'boxdimension','bgboxes/r0001');
        container_2.add(bgboxes_r);
        let bgboxes_q=this.add.sprite(54,467,'boxdimension','bgboxes/q0001');
        container_2.add(bgboxes_q);
        let bgboxes_p=this.add.sprite(90,554,'boxdimension','bgboxes/p0001');
        container_2.add(bgboxes_p);
        let bgboxes_o=this.add.sprite(104,496,'boxdimension','bgboxes/o0001');
        container_2.add(bgboxes_o);
        let bgboxes_n=this.add.sprite(184,490,'boxdimension','bgboxes/n0001');
        container_2.add(bgboxes_n);
        let bgboxes_m=this.add.sprite(281,347,'boxdimension','bgboxes/m0001');
        container_2.add(bgboxes_m);
        let bgboxes_l=this.add.sprite(11,419,'boxdimension','bgboxes/l0001');
        container_2.add(bgboxes_l);
        let bgboxes_k=this.add.sprite(0,581,'boxdimension','bgboxes/k0001');
        container_2.add(bgboxes_k);
        let bgboxes_j=this.add.sprite(868,123,'boxdimension','bgboxes/j0001');
        container_2.add(bgboxes_j);
        let bgboxes_i=this.add.sprite(924,156,'boxdimension','bgboxes/i0001');
        container_2.add(bgboxes_i);
        let bgboxes_h=this.add.sprite(837,181,'boxdimension','bgboxes/h0001');
        container_2.add(bgboxes_h);
        let bgboxes_g=this.add.sprite(932,0,'boxdimension','bgboxes/g0001');
        container_2.add(bgboxes_g);
        let bgboxes_f=this.add.sprite(1027,26,'boxdimension','bgboxes/f0001');
        container_2.add(bgboxes_f);
        let bgboxes_e=this.add.sprite(633,161,'boxdimension','bgboxes/e0001');
        container_2.add(bgboxes_e);
        let bgboxes_d=this.add.sprite(713,80,'boxdimension','bgboxes/d0001');
        container_2.add(bgboxes_d);
        let bgboxes_c=this.add.sprite(941,70,'boxdimension','bgboxes/c0001');
        container_2.add(bgboxes_c);
        let bgboxes_b=this.add.sprite(569,53,'boxdimension','bgboxes/b0001');
        container_2.add(bgboxes_b);
        let bgboxes_a=this.add.sprite(152,387,'boxdimension','bgboxes/a0001');
        container_2.add(bgboxes_a);
        let plok=this.add.sprite(321,239,'boxdimension','plok0001');
        let portal=this.add.sprite(1205.9774294055085,240.47552748994968,'boxdimension','portal0001');
        portal.setOrigin(0.3694249365954612,0.8179021268250984);
        this.add.image(1189,238,'boxdimension','platform-back');
        let boxRight=this.add.sprite(1489,444,'boxdimension','boxRight0001');
        this.add.image(765,586,'boxdimension','platform');
        let container_3=this.add.container(741.8735846890304,985.8880788302723);
        let foreground_boxA=this.add.sprite(-631.8735846890304,-171.88807883027232,'boxdimension','foreground/boxA0001');
        container_3.add(foreground_boxA);
        let foreground_boxB=this.add.sprite(422.1264153109696,-143.88807883027232,'boxdimension','foreground/boxB0001');
        container_3.add(foreground_boxB);
        let foreground_boxC=this.add.sprite(699.1264153109696,-209.88807883027232,'boxdimension','foreground/boxC0001');
        container_3.add(foreground_boxC);
        let sort=[container_3];
        let animation=new Animation(bgboxes_t);
        animation.key='bgboxes/t';
        animation.end=110;
        let animation_2=new Animation(bgboxes_s);
        animation_2.key='bgboxes/s';
        animation_2.end=110;
        let animation_3=new Animation(bgboxes_r);
        animation_3.key='bgboxes/r';
        animation_3.end=110;
        let animation_4=new Animation(bgboxes_q);
        animation_4.key='bgboxes/q';
        animation_4.end=110;
        let animation_5=new Animation(bgboxes_p);
        animation_5.key='bgboxes/p';
        animation_5.end=110;
        let animation_6=new Animation(bgboxes_o);
        animation_6.key='bgboxes/o';
        animation_6.end=110;
        let animation_7=new Animation(bgboxes_n);
        animation_7.key='bgboxes/n';
        animation_7.end=110;
        let animation_8=new Animation(bgboxes_m);
        animation_8.key='bgboxes/m';
        animation_8.end=110;
        let animation_9=new Animation(bgboxes_l);
        animation_9.key='bgboxes/l';
        animation_9.end=110;
        let animation_10=new Animation(bgboxes_k);
        animation_10.key='bgboxes/k';
        animation_10.end=110;
        let animation_11=new Animation(bgboxes_j);
        animation_11.key='bgboxes/j';
        animation_11.end=110;
        let animation_12=new Animation(bgboxes_i);
        animation_12.key='bgboxes/i';
        animation_12.end=110;
        let animation_13=new Animation(bgboxes_h);
        animation_13.key='bgboxes/h';
        animation_13.end=110;
        let animation_14=new Animation(bgboxes_g);
        animation_14.key='bgboxes/g';
        animation_14.end=110;
        let animation_15=new Animation(bgboxes_f);
        animation_15.key='bgboxes/f';
        animation_15.end=110;
        let animation_16=new Animation(bgboxes_e);
        animation_16.key='bgboxes/e';
        animation_16.end=110;
        let animation_17=new Animation(bgboxes_d);
        animation_17.key='bgboxes/d';
        animation_17.end=110;
        let animation_18=new Animation(bgboxes_c);
        animation_18.key='bgboxes/c';
        animation_18.end=110;
        let animation_19=new Animation(bgboxes_b);
        animation_19.key='bgboxes/b';
        animation_19.end=110;
        let animation_20=new Animation(bgboxes_a);
        animation_20.key='bgboxes/a';
        animation_20.end=110;
        let animation_21=new Animation(plok);
        animation_21.key='plok';
        animation_21.end=100;
        animation_21.repeat=0;
        animation_21.autoPlay=false;
        let animation_22=new Animation(portal);
        animation_22.key='portal';
        animation_22.end=20;
        new SimpleButton(portal).pixelPerfect=true;
        new MoveTo(portal);
        let animation_23=new Animation(boxRight);
        animation_23.key='boxRight';
        animation_23.end=110;
        let animation_24=new Animation(foreground_boxA);
        animation_24.key='foreground/boxA';
        animation_24.end=110;
        let animation_25=new Animation(foreground_boxB);
        animation_25.key='foreground/boxB';
        animation_25.end=110;
        let animation_26=new Animation(foreground_boxC);
        animation_26.key='foreground/boxC';
        animation_26.end=110;
        this.clouds=container;
        this.plok=plok;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.tweens.add({'targets':this.clouds,'x':{'from':-609,'to':189},'duration':83000.33,'ease':Phaser.Math.Easing.Linear,'yoyo':false,'repeat':-1});
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
