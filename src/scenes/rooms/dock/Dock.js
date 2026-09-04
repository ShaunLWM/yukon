import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, ShowHint, SimpleButton, Zone } from '@components/components'


/* START OF COMPILED CODE */

export default class Dock extends RoomScene {

    constructor() {
        super("Dock");

        /* START-USER-CTR-CODE */

        this.boat;
        this.rings;
        this.cataloganim;
        this.sort;
        this.roomTriggers={'beach':()=>this.triggerRoom(400,950,430),'village':()=>this.triggerRoom(200,1300,760),'town':()=>this.triggerRoom(100,368,640),'hydro':()=>this.triggerGame(903)};

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('dock-pack','assets/media/rooms/dock/dock-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-48,0,'dock','bg').setOrigin(0,0);
        let post_1=this.add.image(443,592,'dock','post_1');
        post_1.setOrigin(0.55,0.54782609);
        let boat=this.add.sprite(231,639,'dock','boat');
        boat.setOrigin(0.49477351916376305,0.5091743119266054);
        let dock=this.add.image(187,593,'dock','dock');
        dock.setOrigin(0,0);
        let post_2=this.add.image(572,619,'dock','post_2');
        post_2.setOrigin(0.43243243243243246,0.49137931034482757);
        let post_3=this.add.image(367,882,'dock','post_3');
        post_3.setOrigin(0.5384615384615384,0.806282722513089);
        let post_4=this.add.image(164,832,'dock','post_4');
        post_4.setOrigin(0.4943820224719101,0.7960526315789473);
        let box=this.add.image(434,652,'dock','box');
        box.setOrigin(0.4915254237288136,0.7142857142857143);
        let bollard_1=this.add.image(353,689,'dock','bollard_1');
        bollard_1.setOrigin(0.5,0.9302325581395349);
        let bollard_2=this.add.image(279,732,'dock','bollard_2');
        bollard_2.setOrigin(0.5,0.9215686274509803);
        let rings=this.add.sprite(632,668,'dock','rings0001');
        rings.setOrigin(0.4975124378109453,0.8127659574468085);
        this.add.image(1366,270,'dock','right_sign');
        this.add.image(120,345,'dock','left_sign');
        let container=this.add.container(740,746);
        let boards=this.add.image(0,0,'dock','boards');
        boards.setOrigin(0.5,0.7721088435374149);
        container.add(boards);
        let cataloganim=this.add.sprite(38.27641704023847,-41.71048207703632,'dock-catalogbtn','cataloganim0001');
        cataloganim.setOrigin(0.43467398316207845,0.45159826184048385);
        container.add(cataloganim);
        let rect=this.add.rectangle(631,633,135,160);
        rect.alpha=0.01;
        rect.isFilled=true;
        rect.fillColor=65280;
        let catalogbtn=this.add.image(1440,888,'dock-catalogbtn','catalogbtn');
        let sort=[post_3,post_4,post_1,post_2,rings,bollard_2,bollard_1,dock,box,container];
        let button=new Button(boat);
        button.spriteName='boat';
        button.pixelPerfect=true;
        new MoveTo(boat);
        new ShowHint(boat).text='hydro_hint';
        let animation=new Animation(rings);
        animation.key='rings';
        animation.end=34;
        animation.repeat=0;
        animation.autoPlay=false;
        animation.stopOnOut=false;
        let animation_2=new Animation(cataloganim);
        animation_2.key='cataloganim';
        animation_2.end=7;
        animation_2.repeat=0;
        animation_2.autoPlay=false;
        let simpleButton=new SimpleButton(cataloganim);
        simpleButton.hoverCallback=()=>this.onCatalogHover();
        simpleButton.hoverOutCallback=()=>this.onCatalogOut();
        simpleButton.callback=()=>this.onCatalog();
        new Zone(rect).hoverCallback=()=>this.onRingsOver();
        let button_2=new Button(catalogbtn);
        button_2.spriteName='catalogbtn';
        button_2.callback=()=>this.onCatalog();
        button_2.activeFrame=true;
        this.boat=boat;
        this.rings=rings;
        this.cataloganim=cataloganim;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.up=false;
        this.time.addEvent({'delay':1500,'callback':()=>this.floatBoat(),'loop':true});
    }

    onRingsOver() {
        this.rings.__Animation.play();
    }

    floatBoat() {
        this.up=!this.up;
    }

    onCatalog() {
        this.interface.loadWidget('DockCatalog');
    }

    onCatalogHover() {
        this.cataloganim.__Animation.play();
    }

    onCatalogOut() {
        this.cataloganim.stop();
        this.cataloganim.setFrame('cataloganim0001');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
