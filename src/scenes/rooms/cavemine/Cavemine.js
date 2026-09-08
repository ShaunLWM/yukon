import RoomScene from '../RoomScene'

import { Animation, Button, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Cavemine extends RoomScene {

    constructor() {
        super("Cavemine");

        /* START-USER-CTR-CODE */

        this.waterfall0001;
        this.shinemid0001;
        this.shinemid;
        this.shinetop0001;
        this.shinetop;
        this.snowball_tube0001;
        this.mwtop0001;
        this.smolbulb_2;
        this.smolbulb_1;
        this.smolbulb_0001;
        this.bulb;
        this.smolbulb;
        this.whistle0001;
        this.coffee;
        this.bulbs0001;
        this.hitbox;
        this.overlay;
        this.coin_sprite;
        this.coin_text;
        this.coin_container;
        this.sort;
        this.roomTriggers={'minehat':()=>this.interface.prompt.showItem(429),'lake':()=>this.triggerRoom(814,240,600),'mine':()=>this.triggerRoom(808,806,370),'minearea':null};
        this.music='Training_Caves';

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('newcavemine-pack','assets/media/rooms/cavemine/newcavemine-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(1167.34,-22.32,'newcavemine','bg').setOrigin(0.768,-0.023);
        let waterfall0001=this.add.sprite(1245,10,'newcavemine','waterfall0001');
        waterfall0001.setOrigin(0.444,-0.104);
        let shinemid0001=this.add.sprite(1292,231,'newcavemine','shinemid0001');
        shinemid0001.scaleX=0.7;
        shinemid0001.scaleY=1.4;
        shinemid0001.flipX=true;
        let seaspray=this.add.sprite(1260,114,'newcavemine','seaspray0001');
        seaspray.scaleX=0.7;
        seaspray.setOrigin(0.418,-1.558);
        let shinemid=this.add.sprite(1236,231,'newcavemine','shinemid0001');
        shinemid.scaleX=0.7;
        shinemid.scaleY=1.4;
        shinemid.flipX=true;
        let shinetop0001=this.add.sprite(1285,97,'newcavemine','shinetop0001');
        shinetop0001.scaleY=2;
        shinetop0001.flipX=true;
        let shinetop=this.add.sprite(1242,96,'newcavemine','shinetop0001');
        shinetop.scaleY=2;
        shinetop.flipX=true;
        this.add.image(1033,181,'newcavemine','wirebehindmachine');
        let snowball_tube0001=this.add.sprite(942,194,'newcavemine','snowball_tube0001');
        this.add.image(1186,260,'newcavemine','wfrocksleft');
        this.add.image(1322,304,'newcavemine','slime');
        this.add.image(1092,249,'newcavemine','microwave');
        this.add.image(581.76,194.83,'newcavemine','platform').setOrigin(0.714,0.375);
        this.add.image(754.08,333.60,'newcavemine','rocks').setOrigin(0.510,0.329);
        let mwtop0001=this.add.sprite(1086,200,'newcavemine','mwtop0030');
        let smolbulb_2=this.add.sprite(1123,177,'newcavemine','smolbulb_0005');
        let smolbulb_1=this.add.sprite(1051,165,'newcavemine','smolbulb_0005');
        let smolbulb_0001=this.add.sprite(1110,189,'newcavemine','smolbulb_0005');
        let bulb=this.add.sprite(1079,153,'newcavemine','bulb_0004');
        bulb.setOrigin(0.5,0.657);
        let smolbulb=this.add.sprite(1035,180,'newcavemine','smolbulb_0005');
        let coffee_table=this.add.image(313,167,'newcavemine','coffee_table');
        let whistle0001=this.add.sprite(387,68,'newcavemine','whistle0001');
        this.add.image(405,211,'newcavemine','frontrail');
        this.add.image(232,205,'newcavemine','leftrail');
        let computer_front_right=this.add.image(1347.22,800.89,'newcavemine','computer_front_right');
        computer_front_right.setOrigin(0.484,0.510);
        let chairs=this.add.image(497,106,'newcavemine','chairs');
        chairs.setOrigin(0.482,0.318);
        let mine_notice=this.add.image(408,584,'newcavemine','mine_notice');
        mine_notice.setOrigin(0.557,0.727);
        let coffee=this.add.sprite(303,167,'newcavemine','coffee0001');
        coffee.setOrigin(0.5,0.779);
        let cavedoor=this.add.image(199.74,392.32,'newcavemine','cavedoor');
        cavedoor.setOrigin(0.736,0.775);
        this.add.image(767,-6,'newcavemine','bulbswires');
        let fg=this.add.image(62.27,585.16,'newcavemine','fg');
        fg.setOrigin(0.394,0.738);
        let fg_bottom=this.add.image(112.66,904.86,'newcavemine','fg_bottom');
        fg_bottom.setOrigin(0.469,0.754);
        let shovel=this.add.image(912.68,600.49,'newcavemine','shovel');
        shovel.setOrigin(0.374,0.751);
        this.add.image(1508,177,'lights');
        let bulbs0001=this.add.sprite(854,60,'newcavemine','bulbs0001');
        let hitbox=this.add.rectangle(943,88,186,70);
        hitbox.visible=false;
        let overlay=this.add.rectangle(766.63,1015.70,1587,1027);
        overlay.setOrigin(0.506,1.034);
        overlay.alpha=0;
        overlay.isFilled=true;
        overlay.fillColor=0;
        overlay.fillAlpha=0.5;
        overlay.strokeColor=0;
        let coin_container=this.add.container(-108,358);
        let coin_sprite=this.add.sprite(31.04,-50.13,'newcavemine','coin0002');
        coin_container.add(coin_sprite);
        let coin_text=this.add.text(-29,-33,'',{});
        coin_text.text='10';
        coin_text.setStyle({'align':'center','baselineX':0,'baselineY':0,'fixedWidth':50,'fixedHeight':50,'fontFamily':'CCComiccrazy','fontStyle':'bold','stroke':'#000000ff','strokeThickness':2});
        coin_text.setPadding({'top':15});
        coin_container.add(coin_text);
        let sort=[computer_front_right,cavedoor,fg,fg_bottom,shovel,coffee,coffee_table,chairs,mine_notice,overlay];
        let animation=new Animation(seaspray);
        animation.key='seaspray';
        animation.end=12;
        new SimpleButton(whistle0001).callback=()=>this.onWhistleClick();
        let button=new Button(mine_notice);
        button.spriteName='mine_notice';
        button.callback=()=>this.interface.loadWidget('DigPoster');
        button.pixelPerfect=true;
        new SimpleButton(coffee).callback=()=>this.onCoffeeClick();
        this.waterfall0001=waterfall0001;
        this.shinemid0001=shinemid0001;
        this.shinemid=shinemid;
        this.shinetop0001=shinetop0001;
        this.shinetop=shinetop;
        this.snowball_tube0001=snowball_tube0001;
        this.mwtop0001=mwtop0001;
        this.smolbulb_2=smolbulb_2;
        this.smolbulb_1=smolbulb_1;
        this.smolbulb_0001=smolbulb_0001;
        this.bulb=bulb;
        this.smolbulb=smolbulb;
        this.whistle0001=whistle0001;
        this.coffee=coffee;
        this.bulbs0001=bulbs0001;
        this.hitbox=hitbox;
        this.overlay=overlay;
        this.coin_sprite=coin_sprite;
        this.coin_text=coin_text;
        this.coin_container=coin_container;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.shinetop0001.play('shinetop');
        this.shinetop.play('shinetop');
        this.shinemid.play('shinemid');
        this.shinemid0001.play('shinemid');
        this.waterfall0001.play('waterfall');
        this.coin_container.depth=1000;
        this.coin_container.visible=false;
    }

    onWhistleClick() {
        this.whistle0001.play('whistle');
        this.soundManager.playSfx('sound_116');
    }

    onCoffeeClick() {
        this.coffee.play('coffee');
    }

    showCoinRewardToPlayer(penguin, coins) {
        if (this.tweenCoin) this.tweenCoin.stop()
        let y = penguin.y - 50
        this.coin_container.setPosition(penguin.x, y)
        this.coin_container.setDepth(1002)
        this.coin_container.setAlpha(1)
        this.coin_container.visible = true
        this.coin_text.text = '' + coins
        this.tweenCoin = this.tweens.add({
            targets: [this.coin_container],
            y: y - 70,
            alpha: 0,
            ease: 'Linear',
            duration: 1500,
            onComplete: () => {
                this.coin_container.visible = false
                this.coin_container.setAlpha(1)
            }
        })
        this.coin_sprite.play('coin')
        this.interface.refreshPlayerCard()
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
