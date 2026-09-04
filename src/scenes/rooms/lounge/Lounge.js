import RoomScene from '../RoomScene'

import { Button, MoveTo, ShowHint, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Lounge extends RoomScene {

    constructor() {
        super("Lounge");

        /* START-USER-CTR-CODE */

        this.sort;
        this.roomTriggers={'dance':()=>this.triggerRoom(120,1200,792),'ice':()=>this.triggerGame(909),'astro':()=>this.triggerGame(900)};
        this.music='6';

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('lounge-pack','assets/media/rooms/lounge/lounge-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-2,0,'lounge','bg').setOrigin(0,0);
        let astro=this.add.image(1033,380,'lounge','astro');
        astro.setOrigin(0.5022222222222222,0.501577287066246);
        let ice=this.add.image(626,377,'lounge','ice');
        ice.setOrigin(0.5026178010471204,0.5);
        let plant=this.add.image(30,701,'lounge','plant');
        plant.setOrigin(0.45652173913043476,0.9061224489795918);
        let chair_1=this.add.image(264,478,'lounge','chair_1');
        chair_1.setOrigin(0.5225225225225225,0.4567901234567901);
        let chair_2=this.add.image(431,456,'lounge','chair_2');
        chair_2.setOrigin(0.3867924528301887,0.38181818181818183);
        let table_1=this.add.image(356,540,'lounge','table_1');
        table_1.setOrigin(0.5,0.6330935251798561);
        let chair_1_2=this.add.image(164,680,'lounge','chair_1');
        chair_1_2.setOrigin(0.5225225225225225,0.4567901234567901);
        let chair_2_2=this.add.image(371,657,'lounge','chair_2');
        chair_2_2.setOrigin(0.3867924528301887,0.38181818181818183);
        let table_2=this.add.image(274,761,'lounge','table_2');
        table_2.setOrigin(0.4824120603015075,0.7052631578947368);
        let chair_1_3=this.add.image(627,718,'lounge','chair_1');
        chair_1_3.setOrigin(0.5225225225225225,0.4567901234567901);
        let chair_1_4=this.add.image(841,729,'lounge','chair_1');
        chair_1_4.setOrigin(0.5225225225225225,0.4567901234567901);
        chair_1_4.flipX=true;
        let table_3=this.add.image(733,778,'lounge','table_3');
        table_3.setOrigin(0.4691358024691358,0.5379310344827586);
        let rail_2=this.add.image(1512,698,'lounge','rail_2');
        rail_2.setOrigin(0.5142857142857142,0.5);
        let rail_3=this.add.image(1419,627,'lounge','rail_3');
        rail_3.setOrigin(0.5,0.5038167938931297);
        let rail_4=this.add.image(1343,573,'lounge','rail_4');
        rail_4.setOrigin(0.5121951219512195,0.5);
        let rail_1=this.add.image(1438,636,'lounge','rail_1');
        rail_1.setOrigin(0.5027932960893855,1);
        let sort=[chair_1_3,chair_1_4,table_3,table_2,chair_2_2,chair_1_2,chair_1,table_1,chair_2,plant,rail_4,rail_3,rail_2,rail_1];
        let button=new Button(astro);
        button.spriteName='astro';
        button.pixelPerfect=true;
        let moveTo=new MoveTo(astro);
        moveTo.x=940;
        moveTo.y=520;
        new ShowHint(astro).text='astro_hint';
        let button_2=new Button(ice);
        button_2.spriteName='ice';
        button_2.pixelPerfect=true;
        let moveTo_2=new MoveTo(ice);
        moveTo_2.x=672;
        moveTo_2.y=512;
        new ShowHint(ice).text='thinice_hint';
        let simpleButton=new SimpleButton(chair_1);
        simpleButton.pixelPerfect=true;
        simpleButton.useHandCursor=false;
        new MoveTo(chair_1).y=488;
        let simpleButton_2=new SimpleButton(chair_2);
        simpleButton_2.pixelPerfect=true;
        simpleButton_2.useHandCursor=false;
        new MoveTo(chair_2).y=466;
        let simpleButton_3=new SimpleButton(chair_1_2);
        simpleButton_3.pixelPerfect=true;
        simpleButton_3.useHandCursor=false;
        new MoveTo(chair_1_2).y=690;
        let simpleButton_4=new SimpleButton(chair_2_2);
        simpleButton_4.pixelPerfect=true;
        simpleButton_4.useHandCursor=false;
        new MoveTo(chair_2_2).y=667;
        let simpleButton_5=new SimpleButton(chair_1_3);
        simpleButton_5.pixelPerfect=true;
        simpleButton_5.useHandCursor=false;
        new MoveTo(chair_1_3).y=728;
        let simpleButton_6=new SimpleButton(chair_1_4);
        simpleButton_6.pixelPerfect=true;
        simpleButton_6.useHandCursor=false;
        new MoveTo(chair_1_4).y=739;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
