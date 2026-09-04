import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, ShowHint, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Coffee extends RoomScene {

    constructor() {
        super("Coffee");

        /* START-USER-CTR-CODE */

        this.board;
        this.shop_coffee;
        this.penguin_coffee;
        this.coffee_arrow;
        this.counter_arrow;
        this.cooldown_timer;
        this.coin_sprite;
        this.coin_text;
        this.coin;
        this.sort;
        this.roomTriggers={'town':()=>this.triggerRoom(100,580,520),'beans':()=>this.triggerGame(901),'book':()=>this.triggerRoom(111,1200,580),'smoothie':()=>this.triggerGame(959)};
        this.music='1';
        this.boardToggle=true;
        this.coffeeAnimKeys={'job_coffee_0001':'shop_coffee_01','job_coffee_0006':'shop_coffee_02','job_coffee_0011':'shop_coffee_03','job_coffee_0016':'shop_coffee_04'};
        this.ctStg=0;
        this.hasApron=false;
        this.isCustomer=false;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('coffee-pack','assets/media/rooms/coffee/coffee-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(1,-6,'coffee','bg').setOrigin(0,0);
        this.add.image(497,805,'coffee-decor','shadows');
        this.add.image(176,-11,'coffee','lamp').setOrigin(0,0);
        let table=this.add.image(418,499,'coffee','table');
        table.setOrigin(0.5217391304347826,0.5368421052631579);
        let container=this.add.container(157.9919490592393,658.5672741886791);
        let smoothie=this.add.image(-44.58566983918888,-64.34841680810257,'coffee','smoothie');
        smoothie.setOrigin(0.5946647978225035,0.6296633645007567);
        container.add(smoothie);
        let blender=this.add.sprite(-6,-89,'coffee','blender0001');
        container.add(blender);
        let fruitbox_1=this.add.image(57,792.6431540807403,'coffee','fruitbox_1');
        fruitbox_1.setOrigin(0.5,0.7852698057242741);
        let fruitbox_2=this.add.image(90,832.5976789280489,'coffee','fruitbox_2');
        fruitbox_2.setOrigin(0.5,0.7619262147885945);
        let counter_back=this.add.image(854,458,'coffee','counter_back');
        counter_back.setOrigin(0.27906976744186046,0.8363636363636363);
        let counter_front=this.add.image(812,621,'coffee','counter_front');
        counter_front.setOrigin(0.2864583333333333,0.8710801393728222);
        let smoke=this.add.sprite(907,180,'coffee','smoke0001');
        smoke.setOrigin(0,0);
        let sign_back=this.add.image(907,632,'coffee','sign_back');
        sign_back.setOrigin(0.5,0.4789915966386555);
        let sign_front=this.add.image(884,695,'coffee','sign_front');
        sign_front.setOrigin(0.5190839694656488,0.8827586206896552);
        let board=this.add.sprite(951,146,'coffee','board0001');
        board.setOrigin(0,0);
        this.add.image(956,468,'coffee','machine_1').setOrigin(0,0);
        this.add.image(964,314,'coffee','machine_2').setOrigin(0,0);
        this.add.image(1021,406,'coffee','machine_3').setOrigin(0,0);
        let bag=this.add.image(1077,646,'coffee','bag');
        bag.setOrigin(0.4430379746835443,0.506024096385542);
        let beans=this.add.image(1016,651,'coffee','beans');
        beans.setOrigin(0.3411764705882352,0.6145708044679954);
        this.add.image(992,151,'coffee','lamp_2').setOrigin(0,0);
        let stairs=this.add.image(1202,328,'coffee','stairs');
        stairs.setOrigin(0,0);
        let door=this.add.image(728,135,'coffee','door');
        door.setOrigin(0,0);
        let beanbag_right=this.add.image(599.4662745093437,744.3156506244716,'coffee-decor','beanbag_right');
        beanbag_right.setOrigin(0.523362915586786,0.2314087791811758);
        let beanbag_mid=this.add.image(457.37590017842047,712.8795008921022,'coffee-decor','beanbag_mid');
        beanbag_mid.setOrigin(0.48623644219000395,0.18817913033541045);
        let planttable=this.add.image(500.9800793881737,802.3933926422218,'coffee-decor','planttable');
        planttable.setOrigin(0.5448252600814553,0.7356463106096228);
        let beanbag_left=this.add.image(394.11055571721585,803.508967953742,'coffee-decor','beanbag_left');
        beanbag_left.setOrigin(0.4482540762186674,0.2595034191391491);
        let job_coffee=this.add.sprite(834,665,'coffee_jobs','job_coffee_0001');
        job_coffee.setOrigin(0.48104857995152495,3.9520740519068775);
        job_coffee.visible=false;
        let job_coffee_2=this.add.sprite(-153,344,'coffee_jobs','job_coffee_0001');
        let coffee_arrow=this.add.sprite(-173,99,'arrow');
        coffee_arrow.scaleX=0.2;
        coffee_arrow.scaleY=0.2;
        coffee_arrow.angle=-180;
        let counter_arrow=this.add.sprite(840,1112,'arrow');
        counter_arrow.scaleX=0.2;
        counter_arrow.scaleY=0.2;
        counter_arrow.angle=-180;
        counter_arrow.setOrigin(0.49999999999999406,-10.688557995255064);
        counter_arrow.visible=false;
        let cooldown_timer=this.add.sprite(-109,289,'coffee_jobs','cooldown_timer_0001');
        cooldown_timer.visible=false;
        let container_2=this.add.container(-163,257);
        let coin=this.add.sprite(31.03714265764836,-50.12658541187517,'coffee_jobs','coin0002');
        container_2.add(coin);
        let coin_text=this.add.text(-29,-33,'',{});
        coin_text.text='10';
        coin_text.setStyle({'align':'center','baselineX':0,'baselineY':0,'fixedWidth':50,'fixedHeight':50,'fontFamily':'CCComiccrazy','fontStyle':'bold','stroke':'#000000ff','strokeThickness':2});
        coin_text.setPadding({'top':15});
        container_2.add(coin_text);
        let sort=[beans,bag,sign_front,sign_back,counter_front,counter_back,table,container,fruitbox_2,fruitbox_1,job_coffee,job_coffee_2,counter_arrow,beanbag_left,planttable,beanbag_mid,beanbag_right];
        let button=new Button(smoothie);
        button.spriteName='smoothie';
        button.hoverCallback=()=>blender.__Animation.play();
        button.hoverOutCallback=()=>blender.__Animation.stop();
        button.pixelPerfect=true;
        let moveTo=new MoveTo(smoothie);
        moveTo.x=176;
        moveTo.y=690;
        new ShowHint(smoothie).text='smoothie_hint';
        let animation=new Animation(blender);
        animation.key='blender';
        animation.end=14;
        animation.autoPlay=false;
        let animation_2=new Animation(smoke);
        animation_2.key='smoke';
        animation_2.end=5;
        let simpleButton=new SimpleButton(board);
        simpleButton.callback=()=>this.onBoardClick();
        simpleButton.pixelPerfect=true;
        let button_2=new Button(beans);
        button_2.spriteName='beans';
        button_2.pixelPerfect=true;
        new MoveTo(beans);
        new ShowHint(beans).text='beans_hint';
        new Button(stairs).spriteName='stairs';
        let moveTo_2=new MoveTo(stairs);
        moveTo_2.x=1255;
        moveTo_2.y=820;
        let button_3=new Button(door);
        button_3.spriteName='door';
        button_3.pixelPerfect=true;
        let moveTo_3=new MoveTo(door);
        moveTo_3.x=750;
        moveTo_3.y=392;
        let animation_3=new Animation(cooldown_timer);
        animation_3.key='cooldown_timer_';
        animation_3.end=121;
        animation_3.repeat=0;
        animation_3.autoPlay=false;
        this.board=board;
        this.shop_coffee=job_coffee;
        this.penguin_coffee=job_coffee_2;
        this.coffee_arrow=coffee_arrow;
        this.counter_arrow=counter_arrow;
        this.cooldown_timer=cooldown_timer;
        this.coin_sprite=coin;
        this.coin_text=coin_text;
        this.coin=container_2;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.ctStg=0;
        this.mainBlock=this.addBody('block');
        this.bookBlock=this.addBody('coffeeBlock',1118481);
        this.block=[this.mainBlock];
        this.cooldown_timer.setDepth(1005);
        this.arrowTween=this.tweens.add({'targets':this.counter_arrow,'y':1030,'duration':400,'yoyo':true,'repeat':-1,'ease':'Sine.easeInOut'});
    }

    stop() {
        this.ctStg=0;
        this.work?.removeListeners();
        super.stop();
    }

    update() {
        super.update();
        this.work?.update();
        this.world.client.penguin&&(this.cooldown_timer.x=this.world.client.penguin.x,this.cooldown_timer.y=this.world.client.penguin.y-90);
    }

    onBoardClick() {
        this.boardToggle=!this.boardToggle;
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
