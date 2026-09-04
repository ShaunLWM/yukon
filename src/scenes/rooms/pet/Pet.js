import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, SimpleButton, Zone } from '@components/components'


/* START OF COMPILED CODE */

export default class Pet extends RoomScene {

    constructor() {
        super("Pet");

        /* START-USER-CTR-CODE */

        this.black;
        this.brownpuffle;
        this.pufflepark;
        this.puffles;
        this.jump;
        this.jumpLoop;
        this.red;
        this.yellow;
        this.eyesYellow;
        this.fish;
        this.fishIdle;
        this.orangepufflejump;
        this.orangepuffle;
        this.eyesRed;
        this.pets_catalog;
        this.interfaceIcons;
        this.penEyes;
        this.sort;
        this.roomTriggers={'plaza':()=>this.triggerRoom(300,384,620),'adopt':()=>this.openAdoptCatalog(),'roundup':()=>this.triggerRoom(890,260,480)};

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('pet-pack','assets/media/rooms/pet/pet-pack.json');
    }

    /** @returns {void} */
    _create() {

        this.add.image(-4,0,'newbg').setOrigin(0,0);
        let black_black=this.add.sprite(92,375,'pet','black/black0001');
        black_black.setOrigin(0.56875,0.9064039408866995);
        let container=this.add.container(1078.4557005243134,442.7941714429035);
        let post=this.add.image(5.544299475686557,-3.7941714429035187,'pet','post');
        post.setOrigin(0.5220125786163522,0.8860103626943006);
        container.add(post);
        let brownpuffle=this.add.sprite(23.544299475686557,-169.79417144290352,'pet-additions','brownpuffle0001');
        container.add(brownpuffle);
        let bowls=this.add.image(1104,481,'pet','bowls');
        bowls.setOrigin(0.5116279069767442,0.5962260406974493);
        let sack=this.add.image(1427,602,'pet','sack');
        sack.setOrigin(0.4557823129251701,0.660377358490566);
        let os_os=this.add.sprite(1423,688,'pet','os/os0001');
        os_os.setOrigin(0.395,0.6936619718309859);
        let pufflepark=this.add.image(1411,370,'pet','pufflepark');
        pufflepark.setOrigin(0.5,0.5015479876160991);
        pufflepark.visible=false;
        let door=this.add.image(639,58,'pet','door');
        door.setOrigin(0,0);
        let puffles=this.add.sprite(390,339,'pet','puffles');
        puffles.setOrigin(0,0);
        let jump_jump=this.add.sprite(383.5,287.5,'pet','jump/jump0001');
        jump_jump.setOrigin(0,0);
        jump_jump.visible=false;
        let jump_jump_2=this.add.sprite(383.5,287.5,'pet','jump/jump0001');
        jump_jump_2.setOrigin(0,0);
        jump_jump_2.visible=false;
        let red_red=this.add.sprite(-243,-280,'pet','red/red0001');
        red_red.setOrigin(0,0);
        let yellow_yellow=this.add.sprite(554,172,'pet','yellow/yellow');
        yellow_yellow.setOrigin(0,0);
        let eyes_black_black=this.add.sprite(600,383,'pet','eyes/black/black0001');
        eyes_black_black.setOrigin(0,0);
        let eyes_pink_pink=this.add.sprite(503,408,'pet','eyes/pink/pink0001');
        eyes_pink_pink.setOrigin(0,0);
        let eyes_blue_blue=this.add.sprite(438,390,'pet','eyes/blue/blue0001');
        eyes_blue_blue.setOrigin(0,0);
        let eyes_white_white=this.add.sprite(401.5,390.5,'pet','eyes/white/white0001');
        let eyes_green_green=this.add.sprite(528,365,'pet','eyes/green/green0001');
        eyes_green_green.setOrigin(0,0);
        let eyes_purple_purple=this.add.sprite(481,354,'pet','eyes/purple/purple0001');
        eyes_purple_purple.setOrigin(0,0);
        let eyes_green_green_2=this.add.sprite(570,241,'pet','eyes/green/green0001');
        eyes_green_green_2.setOrigin(0,0);
        let pen_front=this.add.image(370,323,'pet','pen_front');
        pen_front.setOrigin(0,0);
        let fish_fish=this.add.sprite(363,473,'pet','fish/fish0001');
        fish_fish.setOrigin(0.8174807197943444,0.8061420345489443);
        let fish_idle_idle=this.add.sprite(316,380,'pet','fish/idle/idle0001');
        fish_idle_idle.setOrigin(0,0);
        let house_3=this.add.image(178,581,'pet','house_3');
        house_3.setOrigin(0.4897959183673469,0.7444933920704846);
        let house_2=this.add.image(280,652,'pet','house_2');
        house_2.setOrigin(0.4724137931034483,0.6473029045643154);
        let container_2=this.add.container(170.59613073144698,711.0893557089855);
        let house_1=this.add.image(-0.5961302509759889,-1.0893820301139385,'pet','house_1');
        house_1.setOrigin(0.5288135593220339,0.6590038314176245);
        container_2.add(house_1);
        let orangepufflejump=this.add.sprite(21.40386974902401,-171.08938203011394,'pet-additions','orangepufflejump0001');
        orangepufflejump.visible=false;
        container_2.add(orangepufflejump);
        let orangepuffle=this.add.sprite(21.40386974902401,-143.08938203011394,'pet-additions','orangepuffle0001');
        container_2.add(orangepuffle);
        let bed_back=this.add.image(182,781,'pet','bed_back');
        bed_back.setOrigin(0.5020080321285141,0.5);
        let bed_front=this.add.image(182,860,'pet','bed_front');
        bed_front.setOrigin(0.5020242914979757,0.6495726495726496);
        let eyes_green_green_3=this.add.sprite(293,112,'pet','eyes/green/green0001');
        eyes_green_green_3.setOrigin(0,0);
        let rect=this.add.rectangle(585,248,60,50);
        rect.alpha=0.01;
        rect.isFilled=true;
        rect.fillColor=65280;
        let rect_2=this.add.rectangle(92,356,150,120);
        rect_2.alpha=0.01;
        rect_2.isFilled=true;
        rect_2.fillColor=65280;
        let container_3=this.add.container(1325,682);
        let adopt_catalog=this.add.sprite(0,127,'pet','adopt_catalog');
        adopt_catalog.setOrigin(0,0);
        container_3.add(adopt_catalog);
        let pets_catalog=this.add.sprite(0,0,'pet','pets_catalog');
        pets_catalog.setOrigin(0,0);
        container_3.add(pets_catalog);
        let rect_3=this.add.rectangle(1395.6419784220122,486.273238809966,100,256);
        rect_3.angle=11;
        rect_3.setOrigin(0.49583559765112567,1.010761924583857);
        let rect_4=this.add.rectangle(192,568,65,65);
        let penEyes=[eyes_pink_pink,eyes_blue_blue,eyes_purple_purple,eyes_green_green,eyes_black_black,eyes_white_white];
        let sort=[bed_front,bed_back,house_2,house_3,bowls,sack,os_os,container,container_2];
        new SimpleButton(os_os).pixelPerfect=true;
        let animation=new Animation(os_os);
        animation.key='os/os';
        animation.end=74;
        animation.repeat=0;
        animation.autoPlay=false;
        animation.onHover=true;
        animation.stopOnOut=false;
        new Button(door).spriteName='door';
        let moveTo=new MoveTo(door);
        moveTo.x=808;
        moveTo.y=380;
        let animation_2=new Animation(jump_jump);
        animation_2.key='jump/jump';
        animation_2.end=89;
        animation_2.repeat=0;
        animation_2.onCompleteCallback=()=>this.onPetLoop();
        let animation_3=new Animation(jump_jump_2);
        animation_3.key='jump/jump';
        animation_3.start=79;
        animation_3.end=89;
        new SimpleButton(red_red).hoverCallback=()=>this.onRedOver();
        let animation_4=new Animation(yellow_yellow);
        animation_4.key='yellow/yellow';
        animation_4.end=11;
        animation_4.autoPlay=false;
        let animation_5=new Animation(eyes_black_black);
        animation_5.key='eyes/black/black';
        animation_5.end=54;
        let animation_6=new Animation(eyes_pink_pink);
        animation_6.key='eyes/pink/pink';
        animation_6.end=50;
        let animation_7=new Animation(eyes_blue_blue);
        animation_7.key='eyes/blue/blue';
        animation_7.end=54;
        let animation_8=new Animation(eyes_white_white);
        animation_8.key='eyes/white/white';
        animation_8.end=54;
        let animation_9=new Animation(eyes_green_green);
        animation_9.key='eyes/green/green';
        animation_9.end=56;
        let animation_10=new Animation(eyes_purple_purple);
        animation_10.key='eyes/purple/purple';
        animation_10.end=62;
        let animation_11=new Animation(eyes_green_green_2);
        animation_11.key='eyes/green/green';
        animation_11.end=56;
        let simpleButton=new SimpleButton(pen_front);
        simpleButton.hoverCallback=()=>this.onPenOver();
        simpleButton.hoverOutCallback=()=>this.onPenOut();
        let moveTo_2=new MoveTo(pen_front);
        moveTo_2.x=590;
        moveTo_2.y=490;
        let simpleButton_2=new SimpleButton(fish_fish);
        simpleButton_2.hoverCallback=()=>this.onFishOver();
        simpleButton_2.pixelPerfect=true;
        let animation_12=new Animation(fish_fish);
        animation_12.key='fish/fish';
        animation_12.start=2;
        animation_12.end=32;
        animation_12.repeat=0;
        animation_12.autoPlay=false;
        animation_12.stopOnOut=false;
        let animation_13=new Animation(fish_idle_idle);
        animation_13.key='fish/idle/idle';
        animation_13.end=95;
        let animation_14=new Animation(eyes_green_green_3);
        animation_14.key='eyes/green/green';
        animation_14.end=56;
        let zone=new Zone(rect);
        zone.hoverCallback=()=>this.onYellowOver();
        zone.hoverOutCallback=()=>this.onYellowOut();
        new Zone(rect_2).hoverCallback=()=>this.onBlackOver();
        let button=new Button(adopt_catalog);
        button.spriteName='adopt_catalog';
        button.callback=()=>this.openAdoptCatalog();
        let button_2=new Button(pets_catalog);
        button_2.spriteName='pets_catalog';
        button_2.callback=()=>this.openPetFurnitureCatalog();
        new MoveTo(rect_3);
        let simpleButton_3=new SimpleButton(rect_3);
        simpleButton_3.hoverCallback=()=>this.pufflepark.visible=true;
        simpleButton_3.hoverOutCallback=()=>this.pufflepark.visible=false;
        let simpleButton_4=new SimpleButton(rect_4);
        simpleButton_4.hoverCallback=()=>this.onOrangeHover();
        simpleButton_4.hoverOutCallback=()=>this.onOrangeOut();
        this.black=black_black;
        this.brownpuffle=brownpuffle;
        this.pufflepark=pufflepark;
        this.puffles=puffles;
        this.jump=jump_jump;
        this.jumpLoop=jump_jump_2;
        this.red=red_red;
        this.yellow=yellow_yellow;
        this.eyesYellow=eyes_green_green_2;
        this.fish=fish_fish;
        this.fishIdle=fish_idle_idle;
        this.orangepufflejump=orangepufflejump;
        this.orangepuffle=orangepuffle;
        this.eyesRed=eyes_green_green_3;
        this.pets_catalog=pets_catalog;
        this.interfaceIcons=container_3;
        this.penEyes=penEyes;
        this.sort=sort;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.fish.on('animationcomplete',this.onFishAnimComplete,this);
        this.black.on('animationcomplete',this.onBlackAnimComplete,this);
        this.red.on('animationcomplete',this.onRedAnimComplete,this);
        this.red.on('animationupdate',this.onRedAnimUpdate,this);
        this.black.play('black_sleep');
        this.pets_catalog.depth=1000;
        this.brownpuffle.play('brownpuffle');
        this.orangepuffle.play('orangepuffle');
        this.orangepuffle.visible=true;
        this.orangepufflejump.visible=false;
    }

    stop() {
        super.stop();
        this.work&&this.work.removeListeners();
    }

    update() {
        super.update();
        this.work&&this.work.update();
    }

    onPenOver() {
        this.puffles.visible=false;
        this.jump.visible=true;
        this.jump.anims.restart();
    }

    onPetLoop() {
        this.jumpLoop.visible=this.jump.visible;
        this.jumpLoop.anims.restart();
        this.jump.visible=false;
    }

    onPenOut() {
        this.puffles.visible=true;
        this.jump.visible=false;
        this.jumpLoop.visible=false;
    }

    onFishOver() {
        this.fishIdle.visible=false;
        this.fish.__Animation.play();
    }

    onFishAnimComplete() {
        this.fishIdle.visible=true;
        this.fishIdle.anims.restart();
        this.fish.setFrame('fish/fish0001');
    }

    onYellowOver() {
        this.eyesYellow.visible=false;
        this.yellow.__Animation.play();
    }

    onYellowOut() {
        this.eyesYellow.visible=true;
        this.yellow.__Animation.stop();
    }

    onBlackOver() {
        this.black.play('black_wake');
    }

    onBlackAnimComplete() {
        this.black.play('black_sleep');
    }

    resetEyesRed(arg1, arg2) {
        this.eyesRed.visible=true;
        this.eyesRed.anims.restart();
    }

    onOrangeHover() {
        this.orangepuffle.visible=false;
        this.orangepufflejump.visible=true;
        this.orangepufflejump.play('orangepufflejump');
    }

    onOrangeOut() {
        this.orangepuffle.visible=true;
        this.orangepufflejump.visible=false;
        this.orangepufflejump.setFrame('orangepufflejump0001');
    }

    openAdoptCatalog() {
        this.network.send('open_sprite',{'sprite':'1_8'});
        this.interface.loadWidget('AdoptCatalog');
    }

    openPetFurnitureCatalog() {
        this.network.send('open_sprite',{'sprite':'1_7'});
        this.interface.loadWidget('PetFurnitureCatalog');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
