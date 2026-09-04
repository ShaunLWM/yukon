import RoomScene from '../RoomScene'

import { Animation, Button, HoverAnimation, MoveTo, ShowHint, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class Tourhq extends RoomScene {

    constructor() {
        super("Tourhq");

        /* START-USER-CTR-CODE */

        this.couch;
        this.suggestions;
        this.sort;
        this.roomTriggers={'lookout':()=>this.triggerRoom(3,484,788),'welcome':()=>this.triggerRoom(1,1064,588),'epf':()=>this.onRoomTrigger()};
        this.music='1108';

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('tourhq-pack','assets/media/rooms/tourhq/tourhq-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(765,472,'tourhq','background');
        let epftube=this.add.sprite(1457,332,'tourhq','epftube0001');
        let couchdoor=this.add.sprite(1304.5568424098517,415.8006826004683,'tourhq','couchdoor0001');
        couchdoor.setOrigin(0.10311457781831974,0.5420473937513304);
        let foreground=this.add.image(86,971.3433430051609,'tourhq','foreground');
        foreground.setOrigin(0.5,0.9853288639806866);
        let pufflebed=this.add.image(1058,372.3770575266137,'tourhq','pufflebed');
        pufflebed.setOrigin(0.5,0.23694252937922936);
        let pufflebed_front=this.add.image(1058,413.05771349652025,'tourhq','pufflebed-front');
        pufflebed_front.setOrigin(0.5,0.6457636302602977);
        let shelf_right=this.add.image(1427.79003675224,607.716014700896,'tourhq','shelf-right');
        shelf_right.setOrigin(0.022024280218247688,0.33033784102116903);
        let shelf_left=this.add.image(353,352,'tourhq','shelf-left');
        shelf_left.setOrigin(0.9215397185680756,0.4403172164873537);
        let coatrack=this.add.image(78.3703611844509,555.0829093171932,'tourhq','coatrack');
        coatrack.setOrigin(0.6095931244627123,0.8213288449267209);
        let chair2=this.add.image(287.6592286871613,651.8603766341184,'tourhq','chair2');
        chair2.setOrigin(0.48698280278797396,0.467470738190623);
        let chair1=this.add.image(83.38774508631828,648.9593138778623,'tourhq','chair1');
        chair1.setOrigin(0.5037645154011483,0.4680969232776096);
        let container=this.add.container(184.74712371310568,710.2758865820489);
        let table1=this.add.image(4.25287628689432,-38.275886582048884,'tourhq','table1');
        container.add(table1);
        let suggestions=this.add.sprite(35.55954360961914,-73.65034010992974,'tourhq','suggestions0001');
        suggestions.setOrigin(0.7413526617742342,0.31804485538725946);
        container.add(suggestions);
        let chair4=this.add.image(439.5654058616299,748.9578410314095,'tourhq','chair4');
        chair4.setOrigin(0.49578063943330025,0.48074582931271864);
        let v=this.add.polygon(1085,232,'38.34370186665137 198.43219609734803 30.28023717680162 75.79295456533703 -55.36769817442587 13.936112367228276 -44.661706255522404 -51.48939380384829 58.45313637754407 -131.1944569177159 37.54072567981689 -232.7690231638183 237.7095569096632 -233.3257113360979 215.29621661049623 -113.26953346252135 146.5840100322505 7.7236998600417905 196.1772232720907 76.31282917051169 198.4813622707104 186.91150110425025 138.57374830660206 230.69014207802178');
        v.setOrigin(0,0);
        v.fillColor=65535;
        v.fillAlpha=0.5;
        let tourhq_lookout_stairs=this.add.image(1178,402,'tourhq-stairs','tourhq-lookout-stairs0001');
        tourhq_lookout_stairs.setOrigin(0.4619223029162555,0.8561440264325495);
        let table2=this.add.image(361,812.7549330800814,'tourhq','table2');
        table2.setOrigin(0.5,0.7010833956023411);
        let chair3=this.add.image(268.1019287109375,813.3084564881332,'tourhq','chair3');
        chair3.setOrigin(0.4677992040867657,0.05898302763211202);
        let chair3_back=this.add.image(253.70478997432033,839.3628859117006,'tourhq','chair3-back');
        chair3_back.setOrigin(0.5108428353736381,0.8167969830126034);
        let table3=this.add.image(1216.131171198027,554.3768646553889,'tourhq','table3');
        table3.setOrigin(0.4814914270840452,0.6682471026720969);
        let door=this.add.image(783.9999602180625,197.9999961555044,'tourhq','door0001');
        this.add.image(492,321.07510910461536,'tourhq','officechair2').setOrigin(0.5,0.4707097694374281);
        let frontdesk2=this.add.image(583.3531494140625,387.11628763916696,'tourhq','frontdesk2');
        frontdesk2.setOrigin(0.8871777138518552,0.4788193728262569);
        let officechair1=this.add.image(352.4502258300781,406.5734837860824,'tourhq','officechair1');
        officechair1.setOrigin(0.39010642638467746,0.6378184892874839);
        let container_2=this.add.container(400.4341125488281,504.93882829726556);
        let frontdesk1=this.add.image(1.25,-0.75,'tourhq','frontdesk1');
        frontdesk1.setOrigin(0.41921884818238964,0.7848192911728652);
        container_2.add(frontdesk1);
        let phone=this.add.sprite(-78,-70.72777129096141,'tourhq','phone0001');
        container_2.add(phone);
        let container_3=this.add.container(1415.699951171875,748.2081909179688);
        let tourbot=this.add.image(0,-62.641531498591014,'tourhq','tourbot');
        tourbot.setOrigin(0.4273440738105414,0.2598410433846506);
        container_3.add(tourbot);
        let container_4=this.add.container(1262.144902182851,751.2754890857457);
        let tourbot_desk=this.add.image(77.56959079396938,29.792756393026252,'tourhq','tourbot-desk');
        container_4.add(tourbot_desk);
        let fishbowl=this.add.sprite(43.855097817149044,-68.27548908574568,'tourhq','fishbowl0001');
        container_4.add(fishbowl);
        let v_2=this.add.layer();
        let v_3=this.add.polygon(372.521314475786,417.7523414006489,'67.56232638585482 70.17351876418559 22.062357950631565 38.57631846194721 70.09010241003386 18.35411026851466 118.74979087548098 39.840206474036734');
        v_3.setOrigin(0.7086889412923437,0.7092389216237243);
        v_3.fillColor=65535;
        v_3.fillAlpha=0.5;
        v_2.add(v_3);
        let v_4=this.add.polygon(491.1469346106748,332.3590175338291,'-25.963699315345252 34.997799659929 -25.963699315345252 0.11422109086981891 24.492905400615427 -3.6233051843865383 35.08256318050837 31.260273384672644');
        v_4.setOrigin(0.0204081630953664,0.3548387067226611);
        v_4.fillColor=65535;
        v_4.fillAlpha=0.5;
        v_2.add(v_4);
        let v_5=this.add.polygon(280.588543411147,665.8777262035071,'91.05786202306575 76.05898278319296 52.60535903167872 51.74992916794827 84.87010292100348 29.2088067247214 131.27829618647058 52.19191196095278');
        v_5.setOrigin(1.1387466472095515,1.0005880478442848);
        v_5.fillColor=65535;
        v_5.fillAlpha=0.5;
        v_2.add(v_5);
        let v_6=this.add.polygon(88.23247527154427,663.0861735613581,'67.56232638585482 70.17351876418559 22.062357950631565 38.57631846194721 70.09010241003386 18.35411026851466 104.91925890412544 46.77361041404197');
        v_6.setOrigin(0.7848126408856168,0.7446699150837965);
        v_6.fillColor=65535;
        v_6.fillAlpha=0.5;
        v_2.add(v_6);
        let v_7=this.add.polygon(434.18264977192763,760.1557295583426,'70.81959493784211 58.62293189554521 26.977101010812873 29.26052770588342 67.19957250350024 10.355966104320373 102.59534741706511 31.673875995444632');
        v_7.setOrigin(0.9148936012116713,0.5833333232531774);
        v_7.fillColor=65535;
        v_7.fillAlpha=0.5;
        v_2.add(v_7);
        let v_8=this.add.polygon(274.26007710314406,825.5751530589151,'-45.14578749532063 -19.273357593192145 -85.61065630283443 -50.668514426608 -38.16908597678378 -69.50560852665751 -1.8902380803920664 -47.877833819193256');
        v_8.setOrigin(-0.4833333232724843,-1.055555533583586);
        v_8.fillColor=65535;
        v_8.fillAlpha=0.5;
        v_2.add(v_8);
        let waddl_monitor=this.add.image(569.5,405.5,'tourhq','waddl-monitor0001');
        waddl_monitor.setOrigin(0.5,1.9524259516623241);
        let sort=[foreground,shelf_right,table3,chair4,chair3_back,chair3,table2,chair1,chair2,container,coatrack,container_2,frontdesk2,shelf_left,officechair1,container_4,pufflebed_front,pufflebed,tourhq_lookout_stairs,container_3,couchdoor,waddl_monitor];
        let animation=new Animation(epftube);
        animation.key='epftube';
        animation.end=20;
        let animation_2=new Animation(couchdoor);
        animation_2.end=19;
        animation_2.repeat=0;
        animation_2.autoPlay=false;
        let simpleButton=new SimpleButton(suggestions);
        simpleButton.hoverCallback=()=>this.onSuggestionHover();
        simpleButton.callback=()=>this.interface.loadWidget('SuggestionBox');
        simpleButton.pixelPerfect=true;
        new ShowHint(suggestions).text='suggestion_hint';
        let moveTo=new MoveTo(v);
        moveTo.x=1200;
        moveTo.y=420;
        let button=new Button(tourhq_lookout_stairs);
        button.spriteName='tourhq-lookout-stairs';
        button.lazyName=true;
        button.alias=v;
        let button_2=new Button(door);
        button_2.spriteName='door';
        button_2.lazyName=true;
        let moveTo_2=new MoveTo(door);
        moveTo_2.x=772;
        moveTo_2.y=385;
        let hoverAnimation=new HoverAnimation(phone);
        hoverAnimation.key='phone';
        hoverAnimation.end=48;
        hoverAnimation.pixelPerfect=true;
        new SimpleButton(phone).callback=()=>{this.onEPFPhone();};
        let simpleButton_2=new SimpleButton(tourbot);
        simpleButton_2.callback=()=>this.onTourBot();
        simpleButton_2.pixelPerfect=true;
        new ShowHint(tourbot).text='tourbot_hint';
        let animation_3=new Animation(fishbowl);
        animation_3.key='fishbowl';
        animation_3.end=240;
        new SimpleButton(v_3).useHandCursor=false;
        new MoveTo(v_3);
        new SimpleButton(v_4).useHandCursor=false;
        new MoveTo(v_4);
        new SimpleButton(v_5).useHandCursor=false;
        new MoveTo(v_5);
        new SimpleButton(v_6).useHandCursor=false;
        new MoveTo(v_6);
        new SimpleButton(v_7).useHandCursor=false;
        new MoveTo(v_7);
        new SimpleButton(v_8).useHandCursor=false;
        new MoveTo(v_8);
        let button_3=new Button(waddl_monitor);
        button_3.callback=()=>this.waddle();
        button_3.lazyName=true;
        new ShowHint(waddl_monitor).text='waddl_hint';
        this.couch=couchdoor;
        this.suggestions=suggestions;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.activatedDoor=false;
    }

    onSuggestionHover() {
        this.suggestions.anims.isPlaying||this.suggestions.play('suggestion-hover');
    }

    onSuggestionDone() {
        this.suggestions.play('suggestion-send');
    }

    onTourBot() {
        this.interface.loadWidget('TourBot');
    }

    onEPFPhone() {
        this.world.client.hasItem(380782)?this.activatedDoor?(this.activatedDoor=false,this.playAnimation(this.couch,20,38,0,()=>{this.couch.setFrame('couchdoor0001'),this.block=this.addBody('block',1118481);})):(this.activatedDoor=true,this.playAnimation(this.couch,2,19,0,()=>{this.block=this.addBody('block_epf',1118481);})):this.world.client.hasItem(800)?this.world.client.hasCompletedPSAMissions()?this.world.missionController.showDialogue('director',0,{'missionId':'psa_no_epf'}):this.world.missionController.showDialogue('director',0,{'missionId':'psa_no_finish'}):this.world.missionController.showDialogue('director',0,{'missionId':'no_psa'});
    }

    onRoomTrigger() {
        this.world.client.hasItem(380792)?this.triggerRoom(323):this.triggerRoom(500);
    }

    waddle() {
        this.interface.loadWidget('Waddl');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
