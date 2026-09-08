import RoomScene from '../RoomScene'

import { Animation, MoveTo, ShowHint, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Berg extends RoomScene {

    constructor() {
        super("Berg");

        /* START-USER-CTR-CODE */

        this.aqua;
        this.coin_sprite;
        this.coin_text;
        this.coin;
        this.sort;
        this.roomTriggers={'aqua':()=>this.triggerGame(916)};
        this.music=584;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('berg-pack','assets/media/rooms/berg/berg-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-18,-18,'berg','bg').setOrigin(0,0);
        let aqua=this.add.sprite(1255,325,'berg','aqua0001');
        aqua.setOrigin(0.5,0.4014336917562724);
        let container=this.add.container(-130,99);
        let coin=this.add.sprite(31.03714265764836,-50.12658541187517,'job_coin','coin0002');
        container.add(coin);
        let coin_text=this.add.text(-29,-33,'',{});
        coin_text.text='10';
        coin_text.setStyle({'align':'center','baselineX':0,'baselineY':0,'fixedWidth':50,'fixedHeight':50,'fontFamily':'CCComiccrazy','fontStyle':'bold','stroke':'#000000ff','strokeThickness':2});
        coin_text.setPadding({'top':15});
        container.add(coin_text);
        let animation=new Animation(aqua);
        animation.key='aqua';
        animation.end=501;
        let animation_2=new Animation(coin);
        animation_2.key='coin';
        animation_2.end=30;
        let simpleButton=new SimpleButton(aqua);
        simpleButton.hoverCallback=()=>this.onAquaOver();
        simpleButton.callback=()=>this.onAquaClick();
        simpleButton.pixelPerfect=true;
        new MoveTo(aqua);
        new ShowHint(aqua).text='sub_hint';
        this.aqua=aqua;
        this.coin_sprite=coin;
        this.coin_text=coin_text;
        this.coin=container;
        this.sort=[];
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.coin.visible=false;
    }

    onAquaOver() {
    }

    onAquaClick() {
    }

    showCoinRewardToPlayer(penguin, coins) {
        if (this.tweenCoin) this.tweenCoin.stop()
        let y = penguin.y - 50
        this.coin.setPosition(penguin.x, y)
        this.coin.setDepth(1002)
        this.coin.setAlpha(1)
        this.coin.visible = true
        this.coin_text.text = '' + coins
        this.tweenCoin = this.tweens.add({
            targets: [this.coin],
            y: y - 70,
            alpha: 0,
            ease: 'Linear',
            duration: 1500,
            onComplete: () => {
                this.coin.visible = false
                this.coin.setAlpha(1)
            }
        })
        this.coin_sprite.play('coin')
        this.interface.refreshPlayerCard()
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
