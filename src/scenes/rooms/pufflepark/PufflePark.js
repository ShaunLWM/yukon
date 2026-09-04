import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, ShowHint, SimpleButton } from '@components/components'


/* START OF COMPILED CODE */

export default class PufflePark extends RoomScene {

    constructor() {
        super("PufflePark");

        /* START-USER-CTR-CODE */

        this.pufflesign;
        this.puffle;
        this.trampoline;
        this.reindeertrampoline;
        this.redtrampoline;
        this.pinktrampoline;
        this.bluetrampoline;
        this.blacktrampoline;
        this.froggletrampoline;
        this.greentrampoline;
        this.greytrampoline;
        this.purpletrampoline;
        this.yellowtrampoline;
        this.whitetrampoline;
        this.browntrampoline;
        this.orangetrampoline;
        this.pumpkintrampoline;
        this.pufflelaunch;
        this.cannon;
        this.pufflebowlLeft;
        this.pufflebowlRight;
        this.blueswim;
        this.pinkswim;
        this.redswim;
        this.blackswim;
        this.greenswim;
        this.yellowswim;
        this.purpleswim;
        this.whiteswim;
        this.brownswim;
        this.greyswim;
        this.froggleswim;
        this.pumpkinswim;
        this.orangeswim;
        this.reindeerswim;
        this.roundupanim;
        this.pufflescapeball;
        this.magicberry;
        this.puffleHitbox;
        this.launchTrigger;
        this.sort;
        this.roomTriggers={'plaza':()=>this.triggerRoom(300,384,620),'pet':()=>this.triggerRoom(310,1320,550),'pufflelaunch':()=>this.triggerCannon(),'pufflescape':()=>this.triggerGame(957),'roundup':()=>this.triggerGame(902)};
        this.roomGlobalTriggers={'bath':{'callback':arg=>this.puffleBathing(arg),'exitCallback':arg_2=>this.puffleExitBathing(arg_2)},'bluefood':{'callback':arg_3=>this.blueFoodEat(arg_3),'exitCallback':arg_4=>this.blueFoodExit(arg_4)},'purplefood':{'callback':arg_5=>this.purpleFoodEat(arg_5),'exitCallback':arg_6=>this.purpleFoodExit(arg_6)},'trampoline':{'callback':arg_7=>this.trampolineJump(arg_7),'exitCallback':arg_8=>this.trampolineJumpExit(arg_8)}};
        this.puffleBowlAnims={'blue':[1,72],'red':[73,144],'pink':[145,216],'black':[217,288],'green':[289,360],'purple':[361,432],'yellow':[433,504],'white':[505,576],'orange':[577,648],'brown':[649,720],'grey':[721,792],'pumpkin':[793,892],'reindeer':[893,964],'froggle':[965,1036]};
        this.music='643';
        this.physicsKey='pufflepark-physics';

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('pufflepark-pack','assets/media/rooms/pufflepark/pufflepark-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(0,0,'pufflepark','pufflepark-background').setOrigin(0,0);
        let pufflesign=this.add.sprite(142,50,'pufflepark','pufflesign0012');
        pufflesign.visible=false;
        let pufflesign_2=this.add.image(141.25,50,'pufflepark','pufflesign0001');
        let petdoor=this.add.image(156.96150611833505,424.33815751234954,'pufflepark','petdoor0001');
        petdoor.setOrigin(0.5325440232784072,0.6933205382802051);
        let petarch=this.add.image(159.46360787800756,365.6104476237225,'pufflepark','petarch');
        petarch.setOrigin(0.5226379599869776,0.9065974465487138);
        let trampoline=this.add.sprite(845.5,369,'pufflepark','trampoline0001');
        let container=this.add.container(784,247);
        let reindeertrampoline=this.add.sprite(5.5,2.5,'pufflepark','reindeertrampoline0001');
        reindeertrampoline.visible=false;
        container.add(reindeertrampoline);
        let redtrampoline=this.add.sprite(96,0,'pufflepark','redtrampoline0001');
        redtrampoline.visible=false;
        container.add(redtrampoline);
        let pinktrampoline=this.add.sprite(51,20,'pufflepark','pinktrampoline0001');
        pinktrampoline.visible=false;
        container.add(pinktrampoline);
        let bluetrampoline=this.add.sprite(25,57.75,'pufflepark','bluetrampoline0001');
        bluetrampoline.visible=false;
        container.add(bluetrampoline);
        let blacktrampoline=this.add.sprite(115.5,83,'pufflepark','blacktrampoline0001');
        blacktrampoline.visible=false;
        container.add(blacktrampoline);
        let frogtrampoline=this.add.sprite(44,61,'pufflepark','frogtrampoline0001');
        frogtrampoline.visible=false;
        container.add(frogtrampoline);
        let greentrampoline=this.add.sprite(0,44,'pufflepark','greentrampoline0001');
        greentrampoline.visible=false;
        container.add(greentrampoline);
        let greytrampoline=this.add.sprite(80.5,61.5,'pufflepark','greytrampoline0001');
        greytrampoline.visible=false;
        container.add(greytrampoline);
        let purpletrampoline=this.add.sprite(63,65.5,'pufflepark','purpletrampoline0001');
        purpletrampoline.visible=false;
        container.add(purpletrampoline);
        let yellowtrampoline=this.add.sprite(112.25,57.5,'pufflepark','yellowtrampoline0001');
        yellowtrampoline.visible=false;
        container.add(yellowtrampoline);
        let whitetrampoline=this.add.sprite(11.5,109.5,'pufflepark','whitetrampoline0001');
        whitetrampoline.visible=false;
        container.add(whitetrampoline);
        let browntrampoline=this.add.sprite(83.5,87,'pufflepark','browntrampoline0001');
        browntrampoline.visible=false;
        container.add(browntrampoline);
        let orangetrampoline=this.add.sprite(42,105.5,'pufflepark','orangetrampoline0001');
        orangetrampoline.visible=false;
        container.add(orangetrampoline);
        let pumpkintrampoline=this.add.sprite(97.5,99,'pufflepark','pumpkintrampoline0001');
        pumpkintrampoline.visible=false;
        container.add(pumpkintrampoline);
        let toolbox=this.add.image(1328.1583086646533,419.322978817929,'pufflepark','toolbox');
        toolbox.setOrigin(0.35130492367052174,0.6079448221750442);
        let stool=this.add.image(1015.9266359486174,411.8055990019605,'pufflepark','stool');
        stool.setOrigin(0.5085650120078158,0.2556592407770463);
        let pufflelaunch=this.add.sprite(1300,130,'pufflepark','pufflelaunch0001');
        pufflelaunch.visible=false;
        let cannon=this.add.sprite(1164,382,'pufflepark','cannon0001');
        cannon.setOrigin(0.32721856279519057,0.8428251403694016);
        let wrench=this.add.image(1294.9944825501398,433.25827617479024,'pufflepark','wrench');
        wrench.setOrigin(0.5660953316197024,0.3651655234958048);
        let rightrail=this.add.image(1296.3019861526868,535.1795499692067,'pufflepark','rightrail');
        rightrail.setOrigin(0.5624209226504762,0.7078230191538258);
        let rightoberries=this.add.image(1387.9662578927287,547.900336555803,'pufflepark','rightoberries');
        rightoberries.setOrigin(0.3734094393800416,0.6718333137992745);
        this.add.image(230.96809184896932,567.6170163601265,'pufflepark','leftrail').setOrigin(0.8935817004949147,0.24961454017427975);
        let purplecushion=this.add.image(426.78479214944525,674.8887965605473,'pufflepark','purplecushion');
        purplecushion.setOrigin(0.41139223220620436,0.20678884111871318);
        let pufflebowl=this.add.sprite(508.71091547996707,750.2023469588373,'pufflepark','pufflebowl0001');
        pufflebowl.setOrigin(0.5208552159319243,1.256107364859455);
        pufflebowl.visible=false;
        let bluecushion=this.add.image(581.4155074914687,658.1014088908219,'pufflepark','bluecushion');
        bluecushion.setOrigin(0.4936468205594424,0.15002609057077515);
        let pufflebowl_2=this.add.sprite(647.5,760.7335675987935,'pufflepark','pufflebowl0001');
        pufflebowl_2.setOrigin(0.5,1.284639718250378);
        pufflebowl_2.visible=false;
        let container_2=this.add.container(1161.0864767223889,573.2594301671669);
        let blueswim=this.add.sprite(28.913523277611148,17.740569832833103,'pufflepark','blueswim0001');
        blueswim.visible=false;
        container_2.add(blueswim);
        let pinkswim=this.add.sprite(81.91352327761115,5.740569832833103,'pufflepark','pinkswim0001');
        pinkswim.visible=false;
        container_2.add(pinkswim);
        let redswim=this.add.sprite(152.41352327761115,-0.25943016716689726,'pufflepark','redswim0001');
        redswim.visible=false;
        container_2.add(redswim);
        let blackswim=this.add.sprite(222.91352327761115,-12.259430167166897,'pufflepark','blackswim0001');
        blackswim.visible=false;
        container_2.add(blackswim);
        let greenswim=this.add.sprite(189.91352327761115,42.7405698328331,'pufflepark','greenswim0001');
        greenswim.visible=false;
        container_2.add(greenswim);
        let yellowswim=this.add.sprite(130.41352327761115,34.2405698328331,'pufflepark','yellowswim0001');
        yellowswim.visible=false;
        container_2.add(yellowswim);
        let purpleswim=this.add.sprite(52.16352327761115,58.2405698328331,'pufflepark','purpleswim0001');
        purpleswim.visible=false;
        container_2.add(purpleswim);
        let whiteswim=this.add.sprite(-4.086476722388852,58.7405698328331,'pufflepark','whiteswim0001');
        whiteswim.visible=false;
        container_2.add(whiteswim);
        let brownswim=this.add.sprite(169.91352327761115,58.7405698328331,'pufflepark','brownswim0001');
        brownswim.visible=false;
        container_2.add(brownswim);
        let greyswim=this.add.sprite(98.16352327761115,70.2405698328331,'pufflepark','greyswim0001');
        greyswim.visible=false;
        container_2.add(greyswim);
        let frogswim=this.add.sprite(142.41352327761115,92.2405698328331,'pufflepark','frogswim0001');
        frogswim.visible=false;
        container_2.add(frogswim);
        let pumpkinswim=this.add.sprite(198.91352327761115,89.2405698328331,'pufflepark','pumpkinswim0001');
        pumpkinswim.visible=false;
        container_2.add(pumpkinswim);
        let orangeswim=this.add.sprite(35.41352327761115,85.7405698328331,'pufflepark','orangeswim0001');
        orangeswim.visible=false;
        container_2.add(orangeswim);
        let reindeerswim=this.add.sprite(77.91352327761115,102.7405698328331,'pufflepark','reindeerswim0001');
        reindeerswim.visible=false;
        container_2.add(reindeerswim);
        let lilypad=this.add.sprite(1184,708.5,'pufflepark','lilypad0001');
        let righttree=this.add.image(1302.827948180411,766.908813672014,'pufflepark','righttree');
        righttree.setOrigin(0.2542995863226461,0.7801519065607374);
        let roundupsign=this.add.image(1268.838623046875,816.1002661184643,'pufflepark','roundupsign');
        roundupsign.setOrigin(0.39657193890558157,0.8377797777537799);
        let container_3=this.add.container(1416.4570159045873,944.1852422349394);
        let roundupanim=this.add.sprite(44,-133,'pufflepark','roundupanim0001');
        container_3.add(roundupanim);
        let rounduppen=this.add.image(-10.73160575133761,-133.67980327223017,'pufflepark','rounduppen');
        rounduppen.setOrigin(0.12337188046523723,0.03200839795902295);
        container_3.add(rounduppen);
        let countermain=this.add.image(581.2761820591763,741.8617606029852,'pufflepark','countermain');
        countermain.setOrigin(0.498255978548806,0.338285755332714);
        let counterright=this.add.image(733.3411804548726,803.1559937222454,'pufflepark','counterright');
        counterright.setOrigin(0.560316675444823,0.6562483156965434);
        let benchsnowpile=this.add.image(343.2864054099445,844.5966486436969,'pufflepark','benchsnowpile');
        benchsnowpile.setOrigin(0.5579547424997382,0.4446142505937888);
        let puffleobox=this.add.image(444.91127819721675,858.1370795434133,'pufflepark','puffleobox');
        puffleobox.setOrigin(0.7028822055297846,0.681029532229147);
        let pufflescapeball=this.add.sprite(180.14886404971946,884.4105470170911,'pufflepark','pufflescapeball0001');
        pufflescapeball.setOrigin(0.699634937318163,0.6214125940901327);
        let foreground_pufflescape=this.add.image(604,1004,'pufflepark','foreground-pufflescape');
        foreground_pufflescape.setOrigin(0.49774716150480014,1.0384753344880957);
        let magicberry=this.add.image(-148,139,'pufflepark','magicberry');
        let rect=this.add.rectangle(140,51,175,135);
        let rect_2=this.add.rectangle(1165.481102506143,271.1470372695925,128,200);
        rect_2.setOrigin(0.49594572324535413,0.2057352005220801);
        let rect_3=this.add.rectangle(184,821,128,128);
        let sort=[petarch,toolbox,stool,cannon,wrench,rightrail,rightoberries,bluecushion,purplecushion,roundupsign,container_3,countermain,pufflebowl,pufflebowl_2,counterright,puffleobox,foreground_pufflescape,righttree,reindeerswim,orangeswim,pumpkinswim,frogswim,greyswim,brownswim,whiteswim,purpleswim,yellowswim,greenswim,blackswim,redswim,pinkswim,blueswim,container_2,benchsnowpile,pufflescapeball];
        let button=new Button(petdoor);
        button.spriteName='petdoor';
        button.lazyName=true;
        new MoveTo(petdoor);
        new Animation(reindeertrampoline);
        new Animation(redtrampoline);
        new Animation(pinktrampoline);
        new Animation(bluetrampoline);
        new Animation(blacktrampoline);
        new Animation(frogtrampoline);
        new Animation(greentrampoline);
        new Animation(greytrampoline);
        new Animation(purpletrampoline);
        new Animation(yellowtrampoline);
        new Animation(whitetrampoline);
        new Animation(browntrampoline);
        new Animation(orangetrampoline);
        new Animation(pumpkintrampoline);
        new Animation(pufflebowl);
        new Animation(pufflebowl_2);
        new Animation(blueswim);
        new Animation(pinkswim);
        new Animation(redswim);
        new Animation(blackswim);
        new Animation(greenswim);
        new Animation(yellowswim);
        new Animation(purpleswim);
        new Animation(whiteswim);
        new Animation(brownswim);
        new Animation(greyswim);
        new Animation(frogswim);
        new Animation(pumpkinswim);
        new Animation(orangeswim);
        new Animation(reindeerswim);
        new Animation(lilypad);
        new ShowHint(rounduppen).text='roundup_hint';
        let moveTo=new MoveTo(rounduppen);
        moveTo.x=1360;
        moveTo.y=900;
        let simpleButton=new SimpleButton(rounduppen);
        simpleButton.hoverCallback=()=>this.onRoundupHover();
        simpleButton.hoverOutCallback=()=>this.onRoundupOut();
        let moveTo_2=new MoveTo(rect_2);
        moveTo_2.x=1130;
        moveTo_2.y=430;
        new ShowHint(rect_2).text='pufflelaunch_hint';
        let simpleButton_2=new SimpleButton(rect_2);
        simpleButton_2.hoverCallback=()=>this.onLaunchHover();
        simpleButton_2.hoverOutCallback=()=>this.onLaunchOut();
        let simpleButton_3=new SimpleButton(rect_3);
        simpleButton_3.hoverCallback=()=>this.onPufflescapeHover();
        simpleButton_3.hoverOutCallback=()=>this.onPufflescapeOut();
        new ShowHint(rect_3).text='pufflescape_hint';
        new MoveTo(rect_3);
        this.pufflesign=pufflesign;
        this.puffle=pufflesign_2;
        this.trampoline=trampoline;
        this.reindeertrampoline=reindeertrampoline;
        this.redtrampoline=redtrampoline;
        this.pinktrampoline=pinktrampoline;
        this.bluetrampoline=bluetrampoline;
        this.blacktrampoline=blacktrampoline;
        this.froggletrampoline=frogtrampoline;
        this.greentrampoline=greentrampoline;
        this.greytrampoline=greytrampoline;
        this.purpletrampoline=purpletrampoline;
        this.yellowtrampoline=yellowtrampoline;
        this.whitetrampoline=whitetrampoline;
        this.browntrampoline=browntrampoline;
        this.orangetrampoline=orangetrampoline;
        this.pumpkintrampoline=pumpkintrampoline;
        this.pufflelaunch=pufflelaunch;
        this.cannon=cannon;
        this.pufflebowlLeft=pufflebowl;
        this.pufflebowlRight=pufflebowl_2;
        this.blueswim=blueswim;
        this.pinkswim=pinkswim;
        this.redswim=redswim;
        this.blackswim=blackswim;
        this.greenswim=greenswim;
        this.yellowswim=yellowswim;
        this.purpleswim=purpleswim;
        this.whiteswim=whiteswim;
        this.brownswim=brownswim;
        this.greyswim=greyswim;
        this.froggleswim=frogswim;
        this.pumpkinswim=pumpkinswim;
        this.orangeswim=orangeswim;
        this.reindeerswim=reindeerswim;
        this.roundupanim=roundupanim;
        this.pufflescapeball=pufflescapeball;
        this.magicberry=magicberry;
        this.puffleHitbox=rect;
        this.launchTrigger=rect_2;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.bounds={};
        this.bounds.puffleHitbox=this.puffleHitbox.getBounds();
        this.blueEat=false;
        this.purpleEat=false;
        this.hasSent=false;
        this.foodHasSent=false;
        this.world.client.penguin.puffle&&(this.walkingPuffleType=this.world.client.penguin.puffle.type,this.walkingPuffleColor=this.world.client.penguin.puffle.color);
        const swimColors = ['blue','pink','red','black','green','yellow','purple','white','brown','grey','frog','pumpkin','orange','reindeer'];
        const trampolineColors = ['reindeer','red','pink','blue','black','frog','green','grey','purple','yellow','white','brown','orange','pumpkin'];
        swimColors.forEach(c => { const s = c === 'frog' ? this.froggleswim : this[c+'swim']; s?.play?.(c+'swim'); });
        trampolineColors.forEach(c => { const s = c === 'frog' ? this.froggletrampoline : this[c+'trampoline']; s?.play?.(c+'trampoline'); });
        this.pufflebowlLeft?.play?.('pufflebowl');
        this.pufflebowlRight?.play?.('pufflebowl');
    }

    stop() {
        super.stop();
        this.work&&this.work.removeListeners();
    }

    update() {
        super.update();
        this.work&&this.work.update();
    }

    onRoundupHover() {
        this.roundupanim.visible=true;
        this.roundupanim.play('roundup-start');
        this.roundupanim.on('animationcomplete',()=>{this.roundupanim.play('roundup-loop');});
    }

    onRoundupOut() {
        this.roundupanim.visible=false;
    }

    onLaunchHover() {
        this.cannon.play('cannon');
        this.cannon.once('animationcomplete',()=>{this.cannon.off('animationupdate');});
    }

    onLaunchOut() {
        this.cannon.stop('cannon');
        this.cannon.setFrame('cannon0001');
    }

    onPufflescapeHover() {
        this.pufflescapeball.play('pufflescapeball');
    }

    onPufflescapeOut() {
        this.pufflescapeball.stop('pufflescapeball');
        this.pufflescapeball.setFrame('pufflescapeball0001');
    }

    triggerCannon() {
        window.ruffle.superCannon=false;
        this.triggerGame(953);
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
