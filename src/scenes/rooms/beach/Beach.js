import RoomScene from '../RoomScene'

import { Animation, Button, HoverAnimation, MoveTo } from '@components/components'


/* START OF COMPILED CODE */

export default class Beach extends RoomScene {

    constructor() {
        super("Beach");

        /* START-USER-CTR-CODE */

        this.bucket;
        this.sort;
        this.roomTriggers={'village':()=>this.triggerRoom(200,450,750),'dock':()=>this.triggerRoom(800,240,420),'lighthouse':()=>this.triggerRoom(410,0,0),'ship':null};
        this.music=67561;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('beach-pack','assets/media/rooms/beach/beach-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-20,-20,'beach','bg').setOrigin(0,0);
        let migrator=this.add.sprite(498,192,'migrator_docked','migrator0001');
        migrator.visible=false;
        this.add.image(601,332,'migrator_docked','lighthouse_snow');
        this.add.image(389,206,'migrator_docked','lighthouse');
        let lighthouse_door=this.add.image(388,216,'beach','lighthouse_door');
        lighthouse_door.setOrigin(0,0);
        let cage=this.add.image(232,352,'beach','cage');
        cage.setOrigin(0.4935064935064935,0.5);
        let buoy=this.add.image(194,428,'beach','buoy');
        buoy.setOrigin(0.5185185185185185,0.4965034965034965);
        let fish=this.add.image(297,392,'beach','fish');
        fish.setOrigin(0.4782608695652174,0.4956521739130435);
        let net=this.add.image(290,465,'beach','net');
        net.setOrigin(0.49767441860465117,0.5);
        this.add.image(1217,293,'beach','fg').setOrigin(0,0);
        this.add.image(1146,323,'beach','sign').setOrigin(0,0);
        this.add.image(906,524,'beach','chair_ground').setOrigin(0,0);
        let chair_2=this.add.image(1060,501,'beach','chair_2');
        chair_2.setOrigin(0.5185185185185185,0.6060606060606061);
        let chair_2_front=this.add.image(1053,522,'beach','chair_2_front');
        chair_2_front.setOrigin(0.5,0.6764705882352942);
        let chair_1=this.add.image(961,526,'beach','chair_1');
        chair_1.setOrigin(0.5,0.58778626);
        let chair_1_front=this.add.image(943,542,'beach','chair_1_front');
        chair_1_front.setOrigin(0.4,0.67054264);
        let bucket_bucket=this.add.sprite(1078,612,'beach','bucket/bucket0001');
        bucket_bucket.setOrigin(0.8863109,0.94611727);
        let sort=[bucket_bucket,chair_1_front,chair_1,chair_2_front,chair_2,net,fish,buoy,cage];
        let animation=new Animation(migrator);
        animation.key='migrator';
        animation.end=100;
        new Button(lighthouse_door).spriteName='lighthouse_door';
        let moveTo=new MoveTo(lighthouse_door);
        moveTo.x=480;
        moveTo.y=400;
        let hoverAnimation=new HoverAnimation(bucket_bucket);
        hoverAnimation.key='bucket/bucket';
        hoverAnimation.checkpoints='70,137,210,269';
        hoverAnimation.end=346;
        hoverAnimation.pixelPerfect=true;
        this.bucket=bucket_bucket;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
