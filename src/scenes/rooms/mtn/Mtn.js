import RoomScene from '../RoomScene'

import { Animation, Button, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Mtn extends RoomScene {

    constructor() {
        super("Mtn");

        /* START-USER-CTR-CODE */

        this.ridgerun;
        this.catalogpaper;
        this.liftpost;
        this.waddle103;
        this.waddle102;
        this.waddle101;
        this.waddle100;
        this.bunnyhill;
        this.express;
        this.penguinrun;
        this.sort;
        this.locale;
        this.roomTriggers={'village':()=>this.triggerRoom(200,480,560),'waddle100':()=>this.triggerWaddle(100),'waddle101':()=>this.triggerWaddle(101),'waddle102':()=>this.triggerWaddle(102),'waddle103':()=>this.triggerWaddle(103)};
        this.waddles={};
        this.sleds=[5021,5046,5047,380120,380170,380724,381328];

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('mtn-pack','assets/media/rooms/mtn/mtn-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(0,0,'mtn','mtn-background').setOrigin(0,0);
        let skilift=this.add.sprite(1125,299.5,'mtn','skilift0001');
        let ridgerun_en=this.add.image(301.75,307.75,'mtn','ridgerun-en');
        this.add.image(0,0,'mtn','skihill').setOrigin(0,0);
        let catalogicon=this.add.image(1438,900,'mtn','catalogicon');
        let container=this.add.container(508.5,232.5);
        let toboggan=this.add.image(0,18,'mtn','toboggan');
        container.add(toboggan);
        let catalogpaper=this.add.sprite(14,0,'mtn','catalogpaper0001');
        container.add(catalogpaper);
        let liftpost_en=this.add.image(723.486096986272,340.4426463956492,'mtn','liftpost-en');
        liftpost_en.setOrigin(0.6060657019847835,0.859706879424066);
        let bunnyhill_en=this.add.image(1267,629.5,'mtn','bunnyhill-en');
        let express_en=this.add.image(1062.0677573751138,795.0629649305164,'mtn','express-en');
        express_en.setOrigin(0.465265897007844,0.7651080410876365);
        let penguinrun_en=this.add.image(519.2293930005726,591.1072452760316,'mtn','penguinrun-en');
        penguinrun_en.setOrigin(0.5957097218088165,0.8321727258213948);
        this.add.image(0,0,'mtn','foreground').setOrigin(0,0);
        let sort=[liftpost_en,penguinrun_en,express_en];
        let locale=[bunnyhill_en,express_en,penguinrun_en,ridgerun_en,liftpost_en];
        new Animation(skilift);
        let button=new Button(catalogicon);
        button.spriteName='catalogicon';
        button.callback=()=>this.showSledCatalog();
        let simpleButton=new SimpleButton(catalogpaper);
        simpleButton.hoverCallback=()=>this.onPaperHover();
        simpleButton.hoverOutCallback=()=>this.onPaperOut();
        simpleButton.callback=()=>this.showSledCatalog();
        this.ridgerun=ridgerun_en;
        this.catalogpaper=catalogpaper;
        this.liftpost=liftpost_en;
        this.bunnyhill=bunnyhill_en;
        this.express=express_en;
        this.penguinrun=penguinrun_en;
        this.sort=sort;
        this.locale=locale;
        this.events.emit('scene-awake');
    }

    showSledCatalog() {
        this.interface.loadWidget('MtnCatalog');
    }

    onPaperHover() {
        this.catalogpaper.play('catalogpaper-open');
    }

    onPaperOut() {
        this.catalogpaper.stop();
        this.catalogpaper.setFrame('catalogpaper0001');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
