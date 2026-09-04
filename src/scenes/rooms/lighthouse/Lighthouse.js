import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Lighthouse extends RoomScene {

    constructor() {
        super("Lighthouse");

        /* START-USER-CTR-CODE */

        this.drumBounds;
        this.interfaceIcons;
        this.sort;
        this.roomTriggers={'beach':()=>this.triggerRoom(400,529,490),'beacon':()=>this.triggerRoom(411,272,680),'instruments':()=>this.interface.loadWidget('MusicCatalog')};
        this.layeredMusic=['lighthouse/electricGuitarTrack','lighthouse/acousticGuitarTrack','lighthouse/bassGuitarTrack','lighthouse/tubaTrack','lighthouse/tromboneTrack','lighthouse/drumTrack','lighthouse/kazooTrack'];

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('lighthouse-pack','assets/media/rooms/lighthouse/lighthouse-pack.json');
    }

    /** @returns {void} */
    _create() {

        let rect=this.add.rectangle(453,424,128,128);
        rect.scaleX=2.01822369519442;
        rect.scaleY=2.01822369519442;
        rect.isFilled=true;
        rect.fillColor=0;
        this.add.image(754,486,'lighthouse','bg');
        let railing=this.add.image(645.870239843217,800.1325795432979,'lighthouse','railing');
        railing.setOrigin(0.4828981760766746,1.2064019485074828);
        this.add.image(339,667,'lighthouse','wirelol');
        let piano=this.add.image(397.8038926188229,727.0705115914689,'lighthouse','piano');
        piano.setOrigin(0.4577520925160905,0.6696854044183268);
        let chair=this.add.image(365.4742110513567,783.6805226405032,'lighthouse','chair');
        chair.setOrigin(0.5196561473514225,0.33355681678231014);
        let drum=this.add.image(167.34384879155448,543.3552028095227,'lighthouse','drum0001');
        drum.setOrigin(0.47921361067658247,0.873903051587293);
        let mic=this.add.image(319.29869600047743,635.4415240031034,'lighthouse','mic');
        mic.setOrigin(0.5659739200095487,0.730554021538746);
        let blspeaker=this.add.sprite(111,296,'lighthouse','blspeaker0001');
        let bottomspeaker=this.add.sprite(8,875,'lighthouse','bottomspeaker0001');
        let instruments=this.add.sprite(1189.8134786366043,607.1020400947572,'lighthouse','instruments');
        instruments.scaleX=0.7;
        instruments.scaleY=0.7;
        instruments.setOrigin(0.5031055954871473,0.6991055549754968);
        instruments.flipX=true;
        this.add.image(624,383,'lighthouse','pole');
        let speaker=this.add.sprite(621,315,'lighthouse','speaker0001');
        let s1seat=this.add.image(617.8312224785659,821.9510463413874,'lighthouse','s1seat');
        s1seat.setOrigin(0.46856844171834644,0.05419573170520506);
        let s1back=this.add.image(609.0383928005637,851.4589604990405,'lighthouse','s1back');
        s1back.setOrigin(0.3450328886650794,0.6051281607881505);
        let s2seat=this.add.image(696.1924252924085,753.7223508517634,'lighthouse','s2seat');
        s2seat.setOrigin(0.3720065725055266,0.1475736527669511);
        let s2back=this.add.image(731.8181017646428,761.5279561498824,'lighthouse','s2back');
        s2back.setOrigin(0.6757562866555544,0.4855685234960104);
        let s3=this.add.image(742.4205989424391,653.4021477456533,'lighthouse','s3');
        s3.setOrigin(0.4927574159236755,0.39906804914594646);
        let s3_2=this.add.image(947.9579128428666,660.2007652801464,'lighthouse','s3');
        s3_2.setOrigin(0.49947410606284137,0.368578749824728);
        let s3_3=this.add.image(970.1327906956822,738.5455468127228,'lighthouse','s3');
        s3_3.setOrigin(0.48915952660640727,0.3623383548332327);
        let s6seat=this.add.image(909.3297101006357,854.0130436377116,'lighthouse','s6seat');
        s6seat.setOrigin(0.5545854114858308,0.12540761367848674);
        let s6back=this.add.image(918.6818383166291,874.966028447006,'lighthouse','s6back');
        s6back.setOrigin(0.47272721537929235,0.6542890816917697);
        let top=this.add.sprite(334,63,'lighthouse','top0001');
        let door=this.add.sprite(466,401,'lighthouse','door');
        door.angle=1;
        let rect_2=this.add.rectangle(165,486,200,140);
        rect_2.visible=false;
        let shop=this.add.image(1520.570807168574,960.7662868584129,'lighthouse','shop');
        shop.setOrigin(1.0849376507137503,1.177040387338947);
        let sort=[drum,mic,piano,chair,s1back,s1seat,s2back,s2seat,s3,s3_2,s3_3,s6back,s6seat,railing,instruments,shop];
        let animation=new Animation(blspeaker);
        animation.key='blspeaker';
        animation.end=10;
        let animation_2=new Animation(bottomspeaker);
        animation_2.key='bottomspeaker';
        animation_2.end=10;
        new Button(instruments).spriteName='instruments';
        new MoveTo(instruments);
        let animation_3=new Animation(speaker);
        animation_3.key='speaker';
        animation_3.end=10;
        let animation_4=new Animation(top);
        animation_4.key='top';
        animation_4.end=26;
        animation_4.repeat=0;
        animation_4.autoPlay=false;
        animation_4.onHover=true;
        animation_4.stopOnOut=false;
        new SimpleButton(top).callback=()=>{this.triggerRoom(411,272,680);};
        new Button(door).spriteName='door';
        new MoveTo(door);
        let button=new Button(shop);
        button.spriteName='shop';
        button.callback=()=>this.interface.loadWidget('MusicCatalog');
        this.drumBounds=rect_2;
        this.interfaceIcons=shop;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.changeLayerMutes([false,false,false,false,false,false,false]);
    }

    onPenguinsAdded(arg1) {
        this.checkBand();
    }

    onPenguinUpdate(arg1) {
        this.checkBand();
    }

    setMusic() {
        super.setMusic();
        this.checkBand();
    }

    checkBand() {
        if(!this.penguins)return;
        this.isPlaying||this.rewindLayers();
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
