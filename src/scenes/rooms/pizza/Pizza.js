import RoomScene from '../RoomScene'
import Work from '@engine/world/room/Work'

import { Animation, Button, MoveTo, ShowHint, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Pizza extends RoomScene {

    constructor() {
        super("Pizza");

        /* START-USER-CTR-CODE */

        this.kitchen;
        this.menu;
        this.fishdish;
        this.cashregister;
        this.book;
        this.parlor_pizza;
        this.penguin_pizza;
        this.parlor_arrow;
        this.coin_sprite;
        this.coin_text;
        this.coin;
        this.counter_arrow;
        this.cooldown_timer;
        this.sort;
        this.locale;
        this.roomTriggers={'plaza':()=>this.triggerRoom(300,1130,550),'pizzatron':()=>this.triggerGame(910),'pizzaoven':()=>this.triggerGame(943)};
        this.music=20;
        this.pizzaAnimKeys={'parlor_pizza_0001':'parlor_pizza_01','parlor_pizza_0010':'parlor_pizza_02','parlor_pizza_0019':'parlor_pizza_03','parlor_pizza_0028':'parlor_pizza_04','parlor_pizza_0037':'parlor_pizza_05','parlor_pizza_0046':'parlor_pizza_06','parlor_pizza_0055':'parlor_pizza_07','parlor_pizza_0064':'parlor_pizza_08'};
        this.isOut=true;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('pizza-pack','assets/media/rooms/pizza/pizza-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(0,0,'pizza','pizza-background').setOrigin(0,0);
        let kitchen_en=this.add.image(393,34,'pizza','kitchen-en');
        let menu_en=this.add.image(231,168.5,'pizza','menu-en');
        let fishdish_en=this.add.image(1044.75,119,'pizza','fishdish-en');
        let kitchendoor=this.add.image(395.25,223.74422145438734,'pizza','kitchendoor');
        kitchendoor.setOrigin(0.5,0.4534218277999841);
        let doors=this.add.image(839.3499755859375,376.1338269332089,'pizza','doors');
        doors.setOrigin(0.5,0.8096680769520255);
        let container=this.add.container(534.9572548322778,459.5998638999141);
        let desk=this.add.image(-1.4572548322778403,-31.599863899914112,'pizza','desk');
        container.add(desk);
        let cashregister=this.add.sprite(-67.95725483227784,-148.5998638999141,'pizza','cashregister0001');
        container.add(cashregister);
        let book=this.add.sprite(72.04274516772216,-117.09986389991411,'pizza','book0001');
        container.add(book);
        let parlor_pizza=this.add.sprite(71,-106,'pizza-job','parlor_pizza_0001');
        parlor_pizza.setOrigin(0.4851873895835799,0.31028464351277163);
        parlor_pizza.visible=false;
        container.add(parlor_pizza);
        let piano=this.add.image(1234.8754747299586,438.99248387287633,'pizza','piano');
        piano.setOrigin(0.056629081526349004,0.601422050559712);
        let pizzapan=this.add.image(264.79977009280094,673.4013458130295,'pizza','pizzapan');
        pizzapan.setOrigin(0.901297247441003,0.9065407268412788);
        let container_2=this.add.container(221.94430488048008,726.2661809840706);
        let oven=this.add.image(-99.69430488048008,-270.0161809840706,'pizza','oven');
        container_2.add(oven);
        let smoke=this.add.sprite(-164.44430488048008,-572.2661809840706,'pizza','smoke0001');
        container_2.add(smoke);
        let ovenflame=this.add.sprite(-98.94430488048008,37.733819015929384,'pizza','ovenflame0001');
        container_2.add(ovenflame);
        let beans=this.add.image(28.503679512616547,947.1991961115651,'pizza','beans');
        beans.setOrigin(0.01875242073198457,0.9866658292828804);
        let chair_left=this.add.image(417.8235972948134,610.4205322265625,'pizza','chair_left');
        chair_left.setOrigin(0.5324032808888822,0.5356696219741846);
        let chair_right=this.add.image(569.0965395911865,612.1724340146892,'pizza','chair_right');
        chair_right.setOrigin(0.4584452507727666,0.5454024111927178);
        let container_3=this.add.container(493.5,712.7319038545164);
        let table=this.add.image(0,-51.23188346235827,'pizza','table');
        table.flipX=true;
        container_3.add(table);
        let candleflame=this.add.sprite(4.5,-135.73188346235827,'pizza','candleflame0001');
        container_3.add(candleflame);
        let chair_left_2=this.add.image(685.75,726.25,'pizza','chair_left');
        chair_left_2.setOrigin(0.5324032808888822,0.5356696219741846);
        let chair_right_2=this.add.image(837,728,'pizza','chair_right');
        chair_right_2.setOrigin(0.4584452507727666,0.5454024111927178);
        let container_4=this.add.container(763,828);
        let table_2=this.add.image(3,-57,'pizza','table');
        container_4.add(table_2);
        let candleflame_2=this.add.sprite(-1,-141,'pizza','candleflame0001');
        candleflame_2.flipX=true;
        container_4.add(candleflame_2);
        let chair_left_3=this.add.image(985.5,690,'pizza','chair_left');
        chair_left_3.setOrigin(0.5324032808888822,0.5356696219741846);
        let chair_right_3=this.add.image(1147,686,'pizza','chair_right');
        chair_right_3.setOrigin(0.4584452507727666,0.5454024111927178);
        let container_5=this.add.container(1063,795);
        let table_3=this.add.image(3.25,-65.75,'pizza','table');
        container_5.add(table_3);
        let candleflame_3=this.add.sprite(-1,-150,'pizza','candleflame0001');
        candleflame_3.flipX=true;
        container_5.add(candleflame_3);
        let rect=this.add.rectangle(463,331,110,100);
        rect.scaleY=1.00001;
        rect.fillColor=65535;
        rect.fillAlpha=0.5;
        let rect_2=this.add.rectangle(134.31545274506217,618.0889850196688,128,250);
        rect_2.setOrigin(0.5180894631513752,0.2043559171835518);
        let parlor_pizza_2=this.add.sprite(-138.26216462538235,456.77853602447146,'pizza-job','parlor_pizza_0001');
        parlor_pizza_2.scaleX=0.6;
        parlor_pizza_2.scaleY=0.6;
        parlor_pizza_2.setOrigin(0.48104857995152495,3.9520740519068775);
        let parlor_arrow=this.add.sprite(-153,144,'arrow');
        parlor_arrow.scaleX=0.2;
        parlor_arrow.scaleY=0.2;
        parlor_arrow.angle=-180;
        let container_6=this.add.container(-153,265);
        let coin=this.add.sprite(31.03714265764836,-50.12658541187517,'pizza-job','coin0002');
        container_6.add(coin);
        let coin_text=this.add.text(-29,-33,'',{});
        coin_text.text='10';
        coin_text.setStyle({'align':'center','baselineX':0,'baselineY':0,'fixedWidth':50,'fixedHeight':50,'fontFamily':'CCComiccrazy','fontStyle':'bold','stroke':'#000000ff','strokeThickness':2});
        coin_text.setPadding({'top':15});
        container_6.add(coin_text);
        let counter_arrow=this.add.sprite(593,1263.5964629225427,'arrow');
        counter_arrow.scaleX=0.2;
        counter_arrow.scaleY=0.2;
        counter_arrow.angle=-180;
        counter_arrow.setOrigin(0.4999999999999926,-16.45468134319181);
        counter_arrow.visible=false;
        let cooldown_timer=this.add.sprite(-117,289,'pizza-job','cooldown_timer_0001');
        cooldown_timer.visible=false;
        let sort=[parlor_pizza_2,counter_arrow,container,piano,pizzapan,container_2,beans,chair_left,chair_right,container_3,container_5,chair_right_3,chair_left_3,container_4,chair_right_2,chair_left_2];
        new Button(kitchendoor).spriteName='kitchendoor';
        new ShowHint(kitchendoor).text='pizza_hint';
        let moveTo=new MoveTo(kitchendoor);
        moveTo.x=396;
        moveTo.y=384;
        new Button(doors).spriteName='doors';
        new MoveTo(doors);
        new SimpleButton(book).callback=()=>this.onBookHover();
        new Animation(smoke);
        new Animation(ovenflame);
        new Animation(candleflame);
        new Animation(candleflame_2);
        new Animation(candleflame_3);
        new SimpleButton(rect).hoverCallback=()=>this.onRegisterOver();
        new SimpleButton(rect_2);
        new ShowHint(rect_2).text='pizzaoven_hint';
        let moveTo_2=new MoveTo(rect_2);
        moveTo_2.x=156;
        moveTo_2.y=840;
        let animation=new Animation(cooldown_timer);
        animation.key='cooldown_timer_';
        animation.end=121;
        animation.repeat=0;
        animation.autoPlay=false;
        this.kitchen=kitchen_en;
        this.menu=menu_en;
        this.fishdish=fishdish_en;
        this.cashregister=cashregister;
        this.book=book;
        this.parlor_pizza=parlor_pizza;
        this.penguin_pizza=parlor_pizza_2;
        this.parlor_arrow=parlor_arrow;
        this.coin_sprite=coin;
        this.coin_text=coin_text;
        this.coin=container_6;
        this.counter_arrow=counter_arrow;
        this.cooldown_timer=cooldown_timer;
        this.sort=sort;
        this.locale=[fishdish_en,menu_en,kitchen_en];
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.cooldown_timer.setDepth(1005);
        this.arrowTween=this.tweens.add({'targets':this.counter_arrow,'y':1230,'duration':400,'yoyo':true,'repeat':-1,'ease':'Sine.easeInOut'});

        this.work = new Work(this, {
            penguinItem: this.penguin_pizza,
            shopItem: this.parlor_pizza,
            pickupItem: this.parlor_pizza,
            arrow: this.parlor_arrow,
            coin: this.coin,
            coinText: this.coin_text,
            animKeys: this.pizzaAnimKeys,
            counterPos: { x: 592, y: 356 },
            doneSound: 'job_pizza_done'
        });

        this.network.send('start_work');
    }

    stop() {
        this.work?.removeListeners();
        super.stop();
    }

    update() {
        super.update();
        this.work?.update();
        this.world.client.penguin&&(this.cooldown_timer.x=this.world.client.penguin.x,this.cooldown_timer.y=this.world.client.penguin.y-110);
    }

    onRegisterOver() {
        if(this.isOut){this.cashregister.play('cashregister-over'),this.isOut=!this.isOut;return;}this.cashregister.play('cashregister-out');
        this.isOut=!this.isOut;
    }

    onBookHover() {
        this.book.play('book');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
