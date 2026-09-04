import RoomScene from '../RoomScene'

import { Animation, Button, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class HiddenLake extends RoomScene {

    constructor() {
        super("HiddenLake");

        /* START-USER-CTR-CODE */

        this.door;
        this.invalidDoorHoverArea;
        this.validDoorHoverArea;
        this.doorNote;
        this.sort;
        this.water;
        this.roomTriggers={'cave':()=>this.triggerRoom(813,1342,424),'forest':()=>this.triggerRoom(809,330,845),'underwater':()=>this.checkEntrance()};
        this.music=1193;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('hiddenlake-pack','assets/media/rooms/hiddenlake/hiddenlake-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(787,484,'hiddenlake','blue');
        let wave=this.add.sprite(981,697,'hiddenlake','wave0001');
        this.add.image(760,431,'hiddenlake','bg');
        let left_water_fall=this.add.sprite(712,278,'hiddenlake','left_water_fall0001');
        let right_water_fall=this.add.sprite(1080,278,'hiddenlake','right_water_fall0001');
        let top_left_water=this.add.sprite(693,134,'hiddenlake','top_left_water0001');
        let top_left_water_2=this.add.sprite(748,132,'hiddenlake','top_left_water20001');
        let top_right_water=this.add.sprite(1062,142,'hiddenlake','top_right_water0001');
        let top_right_water_2=this.add.sprite(1117,147,'hiddenlake','top_right_water20001');
        let right_bottom_water=this.add.sprite(1063,451,'hiddenlake','right_bottom_water0001');
        let right_bottom_water_2=this.add.sprite(1101,450,'hiddenlake','right_bottom_water20001');
        let left_bottom_water=this.add.sprite(708,443,'hiddenlake','left_bottom_water0001');
        let left_bottom_water_2=this.add.sprite(734,446,'hiddenlake','left_bottom_water20001');
        this.add.image(711,455,'hiddenlake','left_extra_water');
        this.add.image(1082,455,'hiddenlake','right_extra_water');
        this.add.image(273,222,'hiddenlake','rock');
        let container=this.add.container(1369.5,509);
        let door=this.add.sprite(52.5,0,'hiddenlake','door0011');
        container.add(door);
        let rect=this.add.rectangle(40.5,55,140,186);
        rect.angle=7;
        rect.visible=false;
        container.add(rect);
        let rect_2=this.add.rectangle(40.5,55,140,186);
        rect_2.angle=7;
        rect_2.visible=false;
        container.add(rect_2);
        let note=this.add.image(0,14,'hiddenlake','note0001');
        note.visible=false;
        container.add(note);
        let right_water_splash=this.add.sprite(1067,417,'hiddenlake','right_water_splash0001');
        let left_water_splah=this.add.sprite(720,411,'hiddenlake','left_water_splah0001');
        this.add.image(771,488,'hiddenlake','frount');
        this.add.image(464,130,'hiddenlake','ladder');
        let star1=this.add.sprite(384,705,'hiddenlake','star1_0001');
        let star2=this.add.sprite(435,845,'hiddenlake','star2_0001');
        let star=this.add.sprite(378,265,'hiddenlake','star30001');
        let star_2=this.add.sprite(843,438,'hiddenlake','star40001');
        let star_3=this.add.sprite(1243,422,'hiddenlake','star50001');
        this.add.image(48,453,'hiddenlake','rock2');
        this.add.image(89,636,'hiddenlake','coin1');
        this.add.image(64,626,'hiddenlake','rock1');
        this.add.image(221,735,'hiddenlake','astro_back');
        let astro_fg=this.add.image(341.8326844912035,867.847465507521,'hiddenlake','astro_fg');
        astro_fg.setOrigin(0.8461205149943676,0.8799491564756254);
        this.add.image(288,249,'hiddenlake','barrel');
        this.add.image(606,304,'hiddenlake','rock4');
        this.add.image(578,369,'hiddenlake','rock3');
        this.add.image(329,356,'hiddenlake','rock5');
        this.add.image(231,298,'hiddenlake','rock6');
        this.add.image(526,464,'hiddenlake','coin_rock');
        this.add.image(328,318,'hiddenlake','coin2');
        let fg=this.add.image(763,1044.731633577818,'hiddenlake','fg');
        fg.setOrigin(0.5,1.0786184770264529);
        let L01=this.add.image(0,0,'hiddenlake-water','L01');
        L01.setOrigin(0,0);
        let L02=this.add.image(0,0,'hiddenlake-water','L02');
        L02.setOrigin(0,0);
        let L03=this.add.image(0,0,'hiddenlake-water','L03');
        L03.setOrigin(0,0);
        let L04=this.add.image(0,0,'hiddenlake-water','L04');
        L04.setOrigin(0,0);
        let L05=this.add.image(0,0,'hiddenlake-water','L05');
        L05.setOrigin(0,0);
        let L06=this.add.image(0,0,'hiddenlake-water','L06');
        L06.setOrigin(0,0);
        let L07=this.add.image(0,0,'hiddenlake-water','L07');
        L07.setOrigin(0,0);
        let L08=this.add.image(0,0,'hiddenlake-water','L08');
        L08.setOrigin(0,0);
        let L09=this.add.image(0,0,'hiddenlake-water','L09');
        L09.setOrigin(0,0);
        let L10=this.add.image(0,0,'hiddenlake-water','L10');
        L10.setOrigin(0,0);
        let L11=this.add.image(0,0,'hiddenlake-water','L11');
        L11.setOrigin(0,0);
        let L12=this.add.image(0,0,'hiddenlake-water','L12');
        L12.setOrigin(0,0);
        let L13=this.add.image(0,0,'hiddenlake-water','L13');
        L13.setOrigin(0,0);
        let L14=this.add.image(0,0,'hiddenlake-water','L14');
        L14.setOrigin(0,0);
        let L15=this.add.image(0,0,'hiddenlake-water','L15');
        L15.setOrigin(0,0);
        let L16=this.add.image(0,0,'hiddenlake-water','L16');
        L16.setOrigin(0,0);
        let L17=this.add.image(0,0,'hiddenlake-water','L17');
        L17.setOrigin(0,0);
        let L18=this.add.image(0,0,'hiddenlake-water','L18');
        L18.setOrigin(0,0);
        let L19=this.add.image(0,0,'hiddenlake-water','L19');
        L19.setOrigin(0,0);
        let L20=this.add.image(0,0,'hiddenlake-water','L20');
        L20.setOrigin(0,0);
        let L21=this.add.image(0,0,'hiddenlake-water','L21');
        L21.setOrigin(0,0);
        let sort=[fg,astro_fg];
        let water=[L01,L02,L03,L04,L05,L06,L07,L08,L09,L10,L11,L12,L13,L14,L15,L16,L17,L18,L19,L20,L21];
        new Animation(wave);
        new Animation(left_water_fall);
        new Animation(right_water_fall);
        new Animation(top_left_water);
        new Animation(top_left_water_2);
        new Animation(top_right_water);
        new Animation(top_right_water_2);
        new Animation(right_bottom_water);
        new Animation(right_bottom_water_2);
        new Animation(left_bottom_water);
        new Animation(left_bottom_water_2);
        new SimpleButton(rect).hoverCallback=()=>this.onDoorInvalidHover();
        new SimpleButton(rect_2).hoverCallback=()=>this.onDoorValidHover();
        let button=new Button(note);
        button.callback=()=>this.interface.loadWidget('LakePoster');
        button.lazyName=true;
        new Animation(right_water_splash);
        new Animation(left_water_splah);
        new Animation(star1);
        new Animation(star2);
        new Animation(star);
        new Animation(star_2);
        new Animation(star_3);
        this.door=door;
        this.invalidDoorHoverArea=rect;
        this.validDoorHoverArea=rect_2;
        this.doorNote=note;
        this.sort=sort;
        this.water=water;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.waterDepths=[275,285,305,315,345,355,365,375,395,335,405,415,425,435,445,465,265,295,325,385,455];
        this.waterDepths.length!==this.water.length&&console.error('Water depths length does not match water sprites length.');
        this.checkMossKey();
    }

    checkMossKey() {
        this.world.client.hasItem(7016)?(this.doorNote.visible=false,this.validDoorHoverArea.visible=true):(this.doorNote.visible=true,this.invalidDoorHoverArea.visible=true);
    }

    checkEntrance() {
        this.world.client.hasItem(7016)?this.triggerRoom(815,760,660):this.interface.loadWidget('LakePoster');
    }

    onDoorValidHover() {
        this.validDoorHoverArea.visible=false;
        this.door.play('door-open');
    }

    onDoorInvalidHover() {
        this.doorNote.visible=false;
        this.door.play('door-locked');
        this.door.on('animationcomplete',()=>{this.doorNote.visible=true;});
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
