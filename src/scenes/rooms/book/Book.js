import RoomScene from '../RoomScene'

import { Button, MoveTo } from '@components/components'
import MancalaTable from '@scenes/shared_prefabs/tables/mancala/MancalaTable'


/* START OF COMPILED CODE */

export default class Book extends RoomScene {

    constructor() {
        super("Book");

        /* START-USER-CTR-CODE */

        this.table104;
        this.table103;
        this.table102;
        this.table101;
        this.table100;
        this.interfaceIcons;
        this.sort;
        this.roomTriggers={'coffee':()=>this.triggerRoom(110,1120,800),'library':()=>this.interface.loadWidget('Library'),'table100':()=>this.triggerTable('mancala',100),'table101':()=>this.triggerTable('mancala',101),'table102':()=>this.triggerTable('mancala',102),'table103':()=>this.triggerTable('mancala',103),'table104':()=>this.triggerTable('mancala',104)};
        this.tables={};
        this.music='1';

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('book-pack','assets/media/rooms/book/book-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(0,-6,'book','bg').setOrigin(0,0);
        let books=this.add.image(241,267,'book','books');
        books.setOrigin(0.35501355013550134,0.28205128205128205);
        let chair_back=this.add.image(175,590,'book','chair_back');
        chair_back.setOrigin(0.5052631578947369,0.46808510638297873);
        let chair_front=this.add.image(180,652,'book','chair_front');
        chair_front.setOrigin(0.5022026431718062,0.5178571428571429);
        let chair_table=this.add.image(132,722,'book','chair_table');
        chair_table.setOrigin(0.5069124423963134,0.5103734439834025);
        let poster=this.add.image(720,97,'book','poster');
        poster.setOrigin(0,0);
        let bookbtn=this.add.image(1435.0000261607795,872.000002672045,'book-btn','bookbtn');
        let table100=this.add.existing(new MancalaTable(this,651,450));
        let table101=this.add.existing(new MancalaTable(this,951,453));
        let table102=this.add.existing(new MancalaTable(this,426,652));
        let table103=this.add.existing(new MancalaTable(this,806,690));
        let table104=this.add.existing(new MancalaTable(this,1208,755));
        let sort=[chair_table,chair_front,chair_back,table100,table101,table102,table103,table104];
        new Button(books).spriteName='books';
        let moveTo=new MoveTo(books);
        moveTo.x=360;
        moveTo.y=470;
        let button=new Button(poster);
        button.spriteName='poster';
        button.callback=()=>this.interface.loadWidget('HowtoPlay');
        button.pixelPerfect=true;
        let button_2=new Button(bookbtn);
        button_2.spriteName='bookbtn';
        button_2.callback=()=>this.onLibrary();
        this.table100=table100;
        this.table101=table101;
        this.table102=table102;
        this.table103=table103;
        this.table104=table104;
        this.interfaceIcons=bookbtn;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
    }

    onLibrary() {
        this.interface.loadWidget('Library');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
