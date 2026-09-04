import RoomScene from '../RoomScene'

import { Animation, Button } from '@components/components'


/* START OF COMPILED CODE */

export default class Forts extends RoomScene {

    constructor() {
        super("Forts");

        /* START-USER-CTR-CODE */

        this.tower;
        this.hitbox;
        this.clockTime;
        this.day;
        this.am_pm;
        this.sort;
        this.roomTriggers={'town':()=>this.triggerRoom(100,1240,660),'rink':()=>this.triggerRoom(802,750,320),'plaza':()=>this.triggerRoom(300,340,660)};

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('forts-pack','assets/media/rooms/forts/forts-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-35,-18,'forts','bg').setOrigin(0,0);
        this.add.image(749,453,'fortsrink').visible=false;
        this.add.image(749,453,'fortsbaseball');
        let red_fort=this.add.image(603,655,'forts','red_fort');
        red_fort.setOrigin(0.5,0.65116279);
        let red_pole=this.add.image(662,657,'forts','red_pole');
        red_pole.setOrigin(0.47058824,1);
        let red_fort_front=this.add.image(703,702,'forts','red_fort_front');
        red_fort_front.setOrigin(0.5,0.6473684210526316);
        let blue_pole=this.add.image(993,424,'forts','blue_pole');
        blue_pole.setOrigin(0.5,1);
        let blue_fort=this.add.image(1023,477,'forts','blue_fort');
        blue_fort.setOrigin(0.49803922,0.81818182);
        this.add.image(1065,304,'forts','tower_shadow').setOrigin(0,0);
        let tower=this.add.sprite(1046,-13,'forts','tower0001');
        tower.setOrigin(0,0);
        this.add.image(1082,104,'forts','clock').setOrigin(0,0);
        this.add.image(1252,327,'forts','secret_message').setOrigin(0,0);
        let sign=this.add.image(1390,291,'forts','sign');
        sign.setOrigin(0,0);
        let snowballs=this.add.image(676,786,'forts','snowballs');
        snowballs.setOrigin(0.49230769,0.57777778);
        let blue_flag=this.add.sprite(966,334,'forts','blue_flag0001');
        blue_flag.setOrigin(0.5,1.85185185);
        let red_flag=this.add.sprite(626,524,'forts','red_flag0001');
        red_flag.setOrigin(0.5,1.73913043);
        let rect=this.add.rectangle(1347,156,70,75);
        rect.visible=false;
        let clockTime=this.add.text(1078,108,'',{});
        clockTime.scaleX=0.45;
        clockTime.scaleY=0.7166177259864144;
        clockTime.angle=-1;
        clockTime.text='12:24';
        clockTime.setStyle({'align':'center','color':'#DBEDF0','fixedWidth':300,'fixedHeight':130,'fontFamily':'CPLCD','fontSize':'112px'});
        let day=this.add.text(1099,209,'',{});
        day.scaleX=0.5;
        day.scaleY=0.5;
        day.angle=3.0000000000000004;
        day.text='THURSDAY';
        day.setStyle({'align':'center','color':'#000000ff','fixedWidth':240,'fixedHeight':40,'fontFamily':'CCComiccrazy','fontSize':'30px','fontStyle':'bold italic'});
        let am_pm=this.add.text(1199,115,'',{});
        am_pm.scaleX=0.5;
        am_pm.scaleY=0.5;
        am_pm.angle=-1;
        am_pm.text='AM';
        am_pm.setStyle({'color':'#DBEDF0','fontFamily':'CPLCD','fontSize':'64px'});
        let v=this.add.text(1078,59,'',{});
        v.scaleY=1.2195577762568657;
        v.angle=-5;
        v.visible=false;
        v.text='CLUB PENGUIN\nTime Zone';
        v.setStyle({'align':'center','color':'#000000ff','fontFamily':'CCComiccrazy','fontSize':'19px','fontStyle':'bold italic'});
        this.add.image(1164,74,'forts-towertext');
        let sort=[red_flag,red_pole,blue_pole,blue_flag,blue_fort,red_fort_front,red_fort,snowballs];
        let animation=new Animation(tower);
        animation.key='tower';
        animation.end=24;
        animation.repeat=0;
        animation.autoPlay=false;
        let button=new Button(sign);
        button.spriteName='sign';
        button.callback=()=>{this.interface.loadWidget('ClocktowerUI');};
        let animation_2=new Animation(blue_flag);
        animation_2.key='blue_flag';
        animation_2.end=16;
        let animation_3=new Animation(red_flag);
        animation_3.key='red_flag';
        animation_3.end=16;
        animation_3.frameSeek=5;
        this.tower=tower;
        this.hitbox=rect;
        this.clockTime=clockTime;
        this.day=day;
        this.am_pm=am_pm;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.bounds=this.hitbox.getBounds();
        this.tower.on('animationcomplete',()=>this.onTowerAnimComplete());
        this.syncTime();
        this.time.addEvent({'delay':5000,'loop':true,'callback':()=>{this.syncTime();}});
        this.myThrows=0;
    }

    onTowerAnimComplete() {
        this.tower.setFrame('tower0001');
    }

    syncTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        this.clockTime.text = `${hours}:${minutes}`;
        this.am_pm.text = ampm;
        const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        this.day.text = days[now.getDay()];
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
