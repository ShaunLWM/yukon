import RoomScene from '../RoomScene'

import { Animation, MoveTo, ShowHint, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Lookout extends RoomScene {

    constructor() {
        super("Lookout");

        /* START-USER-CTR-CODE */

        this.lookoutpuzzle;
        this.sort;
        this.roomTriggers={'tourhq':()=>this.triggerRoom(2,1090,500),'puzzle':()=>this.triggerGame(1002)};
        this.preLoop='empty';
        this.mainLoops=['1230_1','1230_2','1230_3','1230_4','1230_5'];

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('lookout-pack','assets/media/rooms/lookout/lookout-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(726,294,'lookout','lookoutview');
        let container=this.add.container(572,153);
        container.visible=false;
        let rink_back=this.add.image(96,40,'lookout','rink-back');
        container.add(rink_back);
        let rink_penguins=this.add.sprite(95,62,'lookout','rink-penguins0001');
        container.add(rink_penguins);
        let container_2=this.add.container(575,156);
        container_2.visible=false;
        let stadium_back=this.add.image(95,41,'lookout','stadium-back');
        container_2.add(stadium_back);
        let stadium_penguins=this.add.sprite(93,60,'lookout','stadium-penguins0001');
        container_2.add(stadium_penguins);
        let container_3=this.add.container(553,150);
        let baseball_back=this.add.image(116,44,'lookout','baseball-back');
        container_3.add(baseball_back);
        let baseball_penguins=this.add.sprite(116,67,'lookout','baseball-penguins0001');
        container_3.add(baseball_penguins);
        this.add.image(579,231,'lookout','stadium-trees');
        let lookoutclublights=this.add.sprite(417,214,'lookout','lookoutclublights0001');
        let lookoutfortsflag=this.add.sprite(696,279,'lookout','lookoutfortsflag10001');
        let lookoutfortsflag_2=this.add.sprite(756,242,'lookout','lookoutfortsflag20001');
        let lookoutsmoke=this.add.sprite(935,18,'lookout','lookoutsmoke0001');
        this.add.image(229,511,'lookout','lookoutfountain');
        this.add.image(759,485,'lookout','lookoutbg');
        this.add.image(418,434,'lookout','lookoutbino1');
        this.add.image(1100,434,'lookout','lookoutbino2');
        let lookoutrailing1=this.add.image(107.91882853186308,745.6217572022053,'lookout','lookoutrailing1');
        lookoutrailing1.setOrigin(0.5100303385974676,0.4742456306012079);
        let lookoutrailing2=this.add.image(366.9966448985424,885.9991592417188,'lookout','lookoutrailing2');
        lookoutrailing2.setOrigin(0.7421449678899878,0.6011204641188526);
        let lookoutplant=this.add.image(1435.8057861328125,679.3977113002269,'lookout','lookoutplant');
        lookoutplant.setOrigin(0.280610848249887,0.7304829959105252);
        this.add.image(1260,836,'lookout','lookoutcouchfront');
        let lookoutcouchback=this.add.image(1343.6723277543742,919.9565966436435,'lookout','lookoutcouchback');
        lookoutcouchback.setOrigin(0.5736811235060432,0.7533215015910891);
        let lookoutnewspapers=this.add.image(1469.7325013108132,1009.1392294415272,'lookout','lookoutnewspapers');
        lookoutnewspapers.setOrigin(0.711412675721963,0.9101977086005107);
        let lookouttable=this.add.image(1159,687,'lookout','lookouttable');
        lookouttable.setOrigin(0.45004985615022247,0.36740926729620266);
        let lookoutpuzzle=this.add.sprite(1205.3462793961064,687.221997193484,'lookout','lookoutpuzzle0001');
        lookoutpuzzle.setOrigin(0.6281610344746867,0.380937932951591);
        let rect=this.add.rectangle(1184.5170062508282,697.0818481445312,128,100);
        rect.setOrigin(0.49974493352617166,0.39168025802508155);
        let sack1=this.add.image(579,612,'lookout','sack1');
        let sack2=this.add.image(789,594,'lookout','sack2');
        let sack3=this.add.image(883.2392172392076,626,'lookout','sack3');
        sack3.setOrigin(0.522973171909274,0.5);
        let sort=[lookoutrailing2,lookoutrailing1,lookouttable,lookoutnewspapers,lookoutcouchback,lookoutpuzzle,lookoutplant,sack2,sack1,sack3];
        new Animation(rink_penguins);
        new Animation(stadium_penguins);
        new Animation(baseball_penguins);
        new Animation(lookoutclublights);
        new Animation(lookoutfortsflag).frameSeek=5;
        new Animation(lookoutfortsflag_2);
        new Animation(lookoutsmoke);
        let moveTo=new MoveTo(rect);
        moveTo.x=1193;
        moveTo.y=785;
        let simpleButton=new SimpleButton(rect);
        simpleButton.hoverCallback=()=>this.puzzleHover();
        simpleButton.hoverOutCallback=()=>this.puzzleHoverOut();
        new ShowHint(rect).text='puzzle_hint';
        this.lookoutpuzzle=lookoutpuzzle;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    puzzleHover() {
        this.lookoutpuzzle.setFrame('lookoutpuzzle0002');
    }

    puzzleHoverOut() {
        this.lookoutpuzzle.setFrame('lookoutpuzzle0001');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
