import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton, Zone } from '@components/components'
import FourTable1 from '@scenes/shared_prefabs/tables/four/FourTable1'
import FourTable2 from '@scenes/shared_prefabs/tables/four/FourTable2'
import FourTable3 from '@scenes/shared_prefabs/tables/four/FourTable3'


/* START OF COMPILED CODE */

export default class Lodge extends RoomScene {

    constructor() {
        super("Lodge");

        /* START-USER-CTR-CODE */

        this.hourHand;
        this.minuteHand;
        this.fred;
        this.table207;
        this.table206;
        this.table205;
        this.flame;
        this.flame_out;
        this.fish;
        this.sort;
        this.roomTriggers={'attic':()=>this.triggerRoom(221,1400,800),'village':()=>this.triggerRoom(200,940,540),'fish':()=>this.triggerRoom(4,189,768),'table205':()=>this.triggerTable('four',205),'table206':()=>this.triggerTable('four',206),'table207':()=>this.triggerTable('four',207)};
        this.tables={};
        this.music=1215;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('lodge-pack','assets/media/rooms/lodge/lodge-pack.json');
        this.load.pack('four_tables-pack','assets/media/shared/tables/four/four_tables-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-16,1,'lodge','bg').setOrigin(0,0);
        this.add.image(262,367,'lodge','clock');
        let clockHour=this.add.image(291.67491340040146,347.36944580078125,'lodge','clockHour');
        clockHour.setOrigin(0.2624929857910396,0.5738910710872347);
        let clockMinute=this.add.image(291.61575892572694,347.2955267612516,'lodge','clockMinute');
        clockMinute.setOrigin(0.5684176584141041,0.7941959311806449);
        let fred=this.add.sprite(398,337,'lodge','fred0001');
        let door=this.add.image(135,462,'lodge','door');
        let footrest=this.add.image(1275,750,'lodge','footrest');
        footrest.setOrigin(0.49295775,0.47222222);
        let chair=this.add.image(1368,760,'lodge','chair');
        chair.setOrigin(0.5017064846416383,0.5018450184501845);
        let fire=this.add.sprite(1329,474,'lodge','fire0001');
        fire.setOrigin(0.5061728395061729,0.5);
        let fishing_door=this.add.image(946,256,'lodge','fishing_door');
        fishing_door.setOrigin(0.2916666666666667,0.3961218836565097);
        this.add.image(816,335,'lodge','rods');
        let bait=this.add.image(835,421,'lodge','bait');
        bait.setOrigin(0.5060240963855421,0.5);
        let candle=this.add.image(451,261,'lodge','candle');
        candle.setOrigin(0,0);
        let flame=this.add.sprite(516,232,'lodge','flame0001');
        flame.setOrigin(0,0);
        let flame_out=this.add.sprite(516,200,'lodge','flame_out0001');
        flame_out.setOrigin(0,0);
        flame_out.visible=false;
        let fish=this.add.sprite(1010,372,'lodge','fish0001');
        fish.setOrigin(0,0);
        fish.visible=false;
        let rect=this.add.rectangle(1220,215,115,430);
        rect.alpha=0.01;
        rect.isFilled=true;
        rect.fillColor=65280;
        let table205=this.add.existing(new FourTable3(this,600,513));
        let table206=this.add.existing(new FourTable1(this,620,794));
        let table207=this.add.existing(new FourTable2(this,1020,814));
        let sort=[door,table206,footrest,chair,table207,table205];
        let animation=new Animation(fred);
        animation.key='fred';
        animation.end=25;
        animation.repeat=0;
        animation.autoPlay=false;
        new Button(door).spriteName='door';
        let moveTo=new MoveTo(door);
        moveTo.x=184;
        moveTo.y=626;
        let animation_2=new Animation(fire);
        animation_2.key='fire';
        animation_2.end=10;
        let button=new Button(fishing_door);
        button.spriteName='fishing_door';
        button.hoverCallback=()=>this.onFishOver();
        button.hoverOutCallback=()=>this.onFishOut();
        let moveTo_2=new MoveTo(fishing_door);
        moveTo_2.x=960;
        moveTo_2.y=460;
        new Button(bait).spriteName='bait';
        let simpleButton=new SimpleButton(candle);
        simpleButton.hoverCallback=()=>this.onCandleOver();
        simpleButton.pixelPerfect=true;
        let animation_3=new Animation(flame);
        animation_3.key='flame';
        animation_3.end=14;
        let animation_4=new Animation(flame_out);
        animation_4.key='flame_out';
        animation_4.end=30;
        animation_4.repeat=0;
        animation_4.autoPlay=false;
        animation_4.showOnStart=true;
        animation_4.hideOnComplete=true;
        let animation_5=new Animation(fish);
        animation_5.key='fish';
        animation_5.end=18;
        animation_5.repeat=0;
        animation_5.autoPlay=false;
        animation_5.showOnStart=true;
        new Zone(rect).callback=()=>this.onZoneClick();
        this.hourHand=clockHour;
        this.minuteHand=clockMinute;
        this.fred=fred;
        this.table205=table205;
        this.table206=table206;
        this.table207=table207;
        this.flame=flame;
        this.flame_out=flame_out;
        this.fish=fish;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.flame_out.on('animationcomplete',()=>this.onFlameOutComplete());
        this.fred.on('animationupdate',()=>{5==this.fred.anims.currentFrame.index&&this.soundManager.playSfx('lodge-cuckoo');});
        this.time.addEvent({'delay':1000,'callback':()=>this.syncTime(),'repeat':-1});
        this.syncTime();
    }

    onCandleOver() {
        this.flame.visible&&(this.flame.visible=false,this.flame_out.__Animation.play());
    }

    onFlameOutComplete() {
        this.flame.visible=true;
    }

    onFishOver() {
        this.fish.__Animation.play();
    }

    onFishOut() {
        this.fish.__Animation.stop();
        this.fish.visible=false;
    }

    onZoneClick() {
        this.world.client.sendMove(1210,460);
    }

    syncTime() {
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        this.hourHand.angle = (hours + minutes / 60) * 30;
        this.minuteHand.angle = minutes * 6;
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
