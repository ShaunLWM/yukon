import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Village extends RoomScene {

    constructor() {
        super("Village");

        /* START-USER-CTR-CODE */

        this.sporttubes;
        this.sort;
        this.roomTriggers={'lodge':()=>this.triggerRoom(220,320,640),'dock':()=>this.triggerRoom(800,436,280),'beach':()=>this.triggerRoom(400,920,360),'mtn':()=>this.triggerRoom(230,840,320),'sport':()=>this.triggerRoom(210,1069,526)};

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('village-pack','assets/media/rooms/village/village-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(0,0,'village','village-background').setOrigin(0,0);
        this.add.image(969,440.5,'village','lodgestair');
        let lodgedoor=this.add.sprite(1118,298,'village','lodgedoor0001');
        let lodgefront=this.add.image(1077.9336656506036,382.96198435596614,'village','lodgefront');
        lodgefront.setOrigin(0.4499370171253708,0.5276338062737922);
        let lodgesnow=this.add.image(1220.508386024415,404.462964407251,'village','lodgesnow');
        lodgesnow.setOrigin(0.7596688233559367,0.3555316455307134);
        let tourbooth=this.add.sprite(794.75,474,'village','tourbooth0001');
        tourbooth.setOrigin(0.4867019406542816,0.8749894532738862);
        let lodgesmoke=this.add.sprite(1115,30.5,'village','lodgesmoke0001');
        let sportshop=this.add.image(1470,463,'village','sportshop');
        sportshop.setOrigin(0.8605203195423886,0.6225747826557397);
        let sportdoor=this.add.sprite(1636,465.5,'village','sportdoor0001');
        sportdoor.setOrigin(1.6749941388283422,0.9367677231297962);
        let greensled=this.add.image(1375,574.5,'village','greensled');
        greensled.setOrigin(0.1739943573908177,1.9863282948287024);
        let innertubes=this.add.image(1465.5,561,'village','innertubes');
        innertubes.setOrigin(0.4774905891990333,0.7750531032172894);
        let sporttubes=this.add.sprite(1366,580.5,'village','sporttubes0001');
        sporttubes.setOrigin(0.4519098688188002,0.7827750334415609);
        let docksign=this.add.image(1466,644,'village','docksign');
        this.add.image(143,673,'village','beachsign');
        let skilift=this.add.sprite(300,146.5,'village','skilift0001');
        let rect=this.add.rectangle(1376,550,150,184);
        let sort=[lodgefront,greensled,sporttubes,sportdoor,innertubes,lodgesnow,sportshop,tourbooth,docksign];
        let button=new Button(lodgedoor);
        button.spriteName='lodgedoor';
        button.pixelPerfect=true;
        let moveTo=new MoveTo(lodgedoor);
        moveTo.x=1069;
        moveTo.y=318;
        let button_2=new Button(tourbooth);
        button_2.spriteName='tourbooth';
        button_2.hoverCallback=()=>null;
        button_2.hoverOutCallback=()=>null;
        button_2.callback=()=>{this.onTourButton();};
        button_2.pixelPerfect=true;
        button_2.lazyName=true;
        let animation=new Animation(lodgesmoke);
        animation.key='lodgesmoke';
        animation.end=5;
        let button_3=new Button(sportdoor);
        button_3.spriteName='sportdoor';
        button_3.pixelPerfect=true;
        button_3.lazyName=true;
        let moveTo_2=new MoveTo(sportdoor);
        moveTo_2.x=1321;
        moveTo_2.y=458;
        let animation_2=new Animation(skilift);
        animation_2.key='skilift';
        animation_2.end=210;
        let animation_3=new Animation(sporttubes);
        animation_3.key='sporttubes';
        animation_3.end=34;
        animation_3.repeat=0;
        animation_3.autoPlay=false;
        new SimpleButton(rect).hoverCallback=()=>this.onTubesBounce();
        this.sporttubes=sporttubes;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
    }

    onTourButton() {
        this.world.client.hasItem(428)?this.interface.loadWidget('TourGuideBook'):this.interface.loadWidget('TourPrompt');
    }

    onTubesBounce() {
        this.sporttubes.__Animation.play();
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
