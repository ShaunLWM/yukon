import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, ShowHint } from '@components/components'


/* START OF COMPILED CODE */

export default class Welcome extends RoomScene {

    constructor() {
        super("Welcome");

        /* START-USER-CTR-CODE */

        this.sort;
        this.roomTriggers={'plaza':()=>this.triggerRoom(300,870,330),'town':()=>this.triggerRoom(100,760,660),'welcome':()=>this.triggerRoom(2,775,440),'notice':()=>this.interface.loadWidget('CommunityEvents')};
        this.music='welcome_room';

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('new-welcome-pack','assets/media/rooms/welcome/welcome-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(767,498,'new-welcome','background');
        let clublights=this.add.sprite(542,179,'new-welcome','clublights0001');
        let fountain=this.add.sprite(664.75,128,'new-welcome','fountain0001');
        let waterfall_tl=this.add.sprite(664,262,'new-welcome','waterfall_tl0001');
        let waterfall_tr=this.add.sprite(892,260,'new-welcome','waterfall_tr0001');
        let waterfall_bl=this.add.sprite(663,386,'new-welcome','waterfall_bl0001');
        let waterfall_br=this.add.sprite(893,383,'new-welcome','waterfall_br0001');
        let communityevents=this.add.image(781.2091798679122,312.1926674822881,'new-welcome','communityevents');
        communityevents.setOrigin(0.5221321383842482,0.25145971317723875);
        let gazebo_side=this.add.image(413.5247095602145,455.9870501304021,'new-welcome','gazebo_side');
        gazebo_side.setOrigin(0.25017905478416297,0.7725319402354586);
        let gazebo_stairs=this.add.image(385.4834128169197,471.6172357074426,'new-welcome','gazebo_stairs');
        gazebo_stairs.setOrigin(0.5805686604048673,0.03997837975517893);
        let gazebo_front=this.add.image(209.64686864747324,517.5925781803951,'new-welcome','gazebo_front');
        gazebo_front.setOrigin(0.4923010013834898,0.8736805702873441);
        let gazebo_snow=this.add.image(254.42614489417298,551.4999961498532,'new-welcome','gazebo_snow');
        gazebo_snow.setOrigin(0.7874689081098138,0.5);
        let tourhq_door=this.add.image(1286.4308762900332,440.16819586301125,'new-welcome','tourhq_door');
        tourhq_door.setOrigin(0.4750477747157172,0.6776538674431811);
        let tourhq_leftpost=this.add.image(1092.1843302671427,469.23504599286014,'new-welcome','tourhq_leftpost');
        tourhq_leftpost.setOrigin(0.46531209333766127,0.776497806728793);
        let tourhq_overhang=this.add.image(1285.632676535836,519.9969143998641,'new-welcome','tourhq_overhang');
        tourhq_overhang.setOrigin(0.5320260139725659,0.8809425371757204);
        this.add.image(1337.649922060076,559.3796219123482,'new-welcome','tourhq_right').setOrigin(0.33485779829676987,0.7571704441493204);
        this.add.image(1430.5,642.5,'new-welcome','right_trees');
        let foreground=this.add.image(772.3203168139927,946.1799592815368,'new-welcome','foreground');
        foreground.setOrigin(0.5011820239051901,0.9023858220404798);
        let volcanosmoke=this.add.sprite(955,38,'welcome-volcano','volcanosmoke0001');
        let sort=[gazebo_front,gazebo_side,gazebo_stairs,tourhq_leftpost,tourhq_overhang,foreground,gazebo_snow];
        let animation=new Animation(clublights);
        animation.key='clublights';
        animation.end=69;
        let animation_2=new Animation(fountain);
        animation_2.key='fountain';
        animation_2.end=12;
        let animation_3=new Animation(waterfall_tl);
        animation_3.key='waterfall_tl';
        animation_3.end=6;
        let animation_4=new Animation(waterfall_tr);
        animation_4.key='waterfall_tr';
        animation_4.end=6;
        let animation_5=new Animation(waterfall_bl);
        animation_5.key='waterfall_bl';
        animation_5.end=12;
        let animation_6=new Animation(waterfall_br);
        animation_6.key='waterfall_br';
        animation_6.end=12;
        new Button(communityevents).spriteName='communityevents';
        let moveTo=new MoveTo(communityevents);
        moveTo.x=780;
        moveTo.y=400;
        new ShowHint(communityevents).text='Community Events';
        new Button(tourhq_door).spriteName='tourhq_door';
        new MoveTo(tourhq_door);
        new Animation(volcanosmoke);
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
