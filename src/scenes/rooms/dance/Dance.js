import RoomScene from '../RoomScene'

import { Animation, Button, MoveTo, ShowHint, SimpleButton, Zone } from '@components/components'


/* START OF COMPILED CODE */

export default class Dance extends RoomScene {

    constructor() {
        super("Dance");

        /* START-USER-CTR-CODE */

        this.phase1BgAnim;
        this.discoLoop;
        this.discoDrop;
        this.discoRetract;
        this.phase3FloorReveal;
        this.phase3FloorRetract;
        this.dancefloor;
        this.dancefloorBW;
        this._rings;
        this._ringsBW;
        this.catalogBox;
        this.catalogPaper;
        this.desk0001;
        this.puffle;
        this.dj_speaker_sound;
        this.dj_mixer_wave;
        this.dj_mixer_tables_under;
        this.dj_mixer_tables;
        this.dj_mixer_lights;
        this.dj_mixer_slider;
        this.lights;
        this.lightsBW;
        this.dj_box_headphones_back;
        this.dj_box_sliders;
        this.dj_box_lights;
        this.dj_box_headphones_front;
        this.poster;
        this.phase3ThingReveal;
        this.phase3ThingLoop;
        this.phase3ThingRetract;
        this.interfaceIcons;
        this.spotlights;
        this.sort;
        this.animate;
        this._tint;
        this._bwRings;
        this.roomTriggers={'town':()=>this.triggerRoom(100,741,557),'boiler':()=>this.triggerRoom(804),'lounge':()=>this.triggerRoom(121,1200,760),'mix':()=>this.triggerGame(930),'dancing':()=>this.triggerGame(952)};
        this.preLoop='5_1';
        this.mainLoops=['5_4','5_5','5_6','5_7','5_8','5_9'];
        this.DARK_TINT=11185604;
        this.PHASE1_POPULATION=10;
        this.PHASE2_POPULATION=20;
        this.PHASE3_POPULATION=30;

        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {
        this.load.pack('dance-pack','assets/media/rooms/dance/dance-pack.json');
    }

    /** @returns {void} */
    _create() {

        let bg=this.add.image(762,471,'dance','bg');
        let phase1_bg_loop=this.add.sprite(660,197,'dance','phase1/bg/loop0001');
        phase1_bg_loop.scaleX=0.97;
        phase1_bg_loop.visible=false;
        let container=this.add.container(660.4860499765464,322.6598158145175);
        let phase1_fg_loop=this.add.sprite(-5.486049976546383,-175.65981581451751,'dance','phase1/fg/loop0001');
        phase1_fg_loop.visible=false;
        container.add(phase1_fg_loop);
        let phase1_fg_drop=this.add.sprite(-6,-235,'dance','phase1/fg/drop0021');
        phase1_fg_drop.visible=false;
        container.add(phase1_fg_drop);
        let phase1_fg_raise=this.add.sprite(-5.4,-170.5,'dance','phase1/fg/raise0001');
        phase1_fg_raise.visible=false;
        container.add(phase1_fg_raise);
        let wire=this.add.image(1283,726,'dance','wire');
        wire.setOrigin(0.5,0.5070422535211268);
        let container_2=this.add.container(657,460);
        let phase3_bg_reveal=this.add.sprite(0,0,'dance','phase3/bg/reveal0021');
        phase3_bg_reveal.visible=false;
        container_2.add(phase3_bg_reveal);
        let phase3_bg_retract=this.add.sprite(1,-7,'dance','phase3/bg/retract0001');
        phase3_bg_retract.visible=false;
        container_2.add(phase3_bg_retract);
        let floor_frame=this.add.image(646,703,'dance','floor/frame');
        let floor_default=this.add.sprite(646,698,'dance','floor/default0001');
        floor_default.tintTopLeft=16777215;
        floor_default.tintTopRight=16777215;
        floor_default.tintBottomLeft=16777215;
        floor_default.tintBottomRight=16777215;
        let floor_bw=this.add.sprite(650,702.5,'dance','floor/bw0001');
        floor_bw.visible=false;
        let stage=this.add.image(660,388,'dance','stage');
        stage.setOrigin(0.5008576329331046,0.5028248587570622);
        let fg_fg_wire=this.add.image(217,32,'dance','fg/fg_wire');
        fg_fg_wire.setOrigin(0.5106382978723404,0.5063291139240507);
        let fg_fg_speaker=this.add.sprite(268,151,'dance','fg/fg_speaker_10001');
        let lamp=this.add.image(1457,227,'dance','lamp');
        lamp.setOrigin(0.5045045045045045,0.5);
        let rings=this.add.layer();
        rings.visible=false;
        let phase2_bg=this.add.sprite(28,163,'dance','phase2/bg/10001');
        rings.add(phase2_bg);
        let phase2_bg_2=this.add.sprite(281,576,'dance','phase2/bg/20001');
        rings.add(phase2_bg_2);
        let phase2_bg_3=this.add.sprite(922,-24,'dance','phase2/bg/30001');
        rings.add(phase2_bg_3);
        let phase2_bg_4=this.add.sprite(1208,845,'dance','phase2/bg/40001');
        rings.add(phase2_bg_4);
        let phase2_bg_5=this.add.sprite(1384,88,'dance','phase2/bg/50001');
        rings.add(phase2_bg_5);
        let ringsBW=this.add.layer();
        ringsBW.visible=false;
        let phase2_bg_bw=this.add.sprite(28,163,'dance','phase2/bg/bw/10001');
        ringsBW.add(phase2_bg_bw);
        let phase2_bg_bw_2=this.add.sprite(281,576,'dance','phase2/bg/bw/20001');
        ringsBW.add(phase2_bg_bw_2);
        let phase2_bg_bw_3=this.add.sprite(922,-24,'dance','phase2/bg/bw/30001');
        ringsBW.add(phase2_bg_bw_3);
        let phase2_bg_bw_4=this.add.sprite(1208,845,'dance','phase2/bg/bw/40001');
        ringsBW.add(phase2_bg_bw_4);
        let phase2_bg_bw_5=this.add.sprite(1384,88,'dance','phase2/bg/bw/50001');
        ringsBW.add(phase2_bg_bw_5);
        let fg_fg_speaker_2=this.add.sprite(170,131,'dance','fg/fg_speaker_20001');
        fg_fg_speaker_2.setOrigin(0.503448275862069,0.5026455026455027);
        let fg_fg_wire_2=this.add.image(1130,32,'dance','fg/fg_wire');
        fg_fg_wire_2.setOrigin(0.5106382978723404,0.5063291139240507);
        fg_fg_wire_2.flipX=true;
        let fg_fg_speaker_3=this.add.sprite(1080,151,'dance','fg/fg_speaker_10001');
        fg_fg_speaker_3.flipX=true;
        let speaker_3=this.add.image(119,827,'dance','speaker_3');
        speaker_3.setOrigin(0.5297297297297298,0.8456140350877193);
        let fg_fg_speaker_4=this.add.sprite(1178,131,'dance','fg/fg_speaker_20001');
        fg_fg_speaker_4.setOrigin(0.503448275862069,0.5026455026455027);
        fg_fg_speaker_4.flipX=true;
        let speaker=this.add.sprite(350,424,'dance','speaker_10001');
        speaker.setOrigin(0.5655737704918032,0.770949720670391);
        let catalog_box=this.add.image(286,474.85028706969433,'dance','catalog/box');
        catalog_box.setOrigin(0.5,0.7032867669320754);
        let catalog_paper=this.add.sprite(258,364,'dance','catalog/paper0001');
        let door_behind=this.add.image(154,434,'dance','door/behind');
        let door_door=this.add.sprite(154,440,'dance','door/door0001');
        door_door.setOrigin(0.5,0.5016722408026756);
        let door_frame=this.add.image(152,437,'dance','door/frame');
        door_frame.setOrigin(0.5031446540880503,0.5);
        let desk=this.add.sprite(1122,501,'dance','desk0001');
        let stairs=this.add.image(1361,433,'dance','stairs');
        stairs.setOrigin(0.5026455026455027,0.5010141987829615);
        let container_3=this.add.container(1164,735.5295257801258);
        let speaker_4=this.add.image(2,1.4705234832657652,'dance','speaker_4');
        speaker_4.setOrigin(0.45918367346938777,0.8421052631578947);
        container_3.add(speaker_4);
        let puffle_puffle=this.add.sprite(0,-199.52947651673423,'dance','puffle/puffle0001');
        puffle_puffle.setOrigin(0.5,0.7933884297520661);
        container_3.add(puffle_puffle);
        let container_4=this.add.container(996,419);
        let speaker_2=this.add.sprite(0.6415522983123765,-0.9657361633013579,'dance','speaker_10001');
        speaker_2.setOrigin(0.5655737704918032,0.770949720670391);
        speaker_2.flipX=true;
        container_4.add(speaker_2);
        let boiler=this.add.image(9,-50,'dance','boiler');
        boiler.setOrigin(0.5,0.4236453201970443);
        boiler.flipX=true;
        container_4.add(boiler);
        let container_5=this.add.container(790.7929422877853,305.10866987575673);
        let dj_speaker=this.add.image(1.2070577122146915,-0.10866987575673193,'dance','dj/speaker');
        dj_speaker.setOrigin(0.4,0.6923076923076923);
        container_5.add(dj_speaker);
        let dj_speaker_sound=this.add.sprite(6.2070577122146915,-39.10866987575673,'dance','dj/speaker_sound0001');
        dj_speaker_sound.setOrigin(0.5,0.5061728395061729);
        container_5.add(dj_speaker_sound);
        let container_6=this.add.container(656.758588457557,340.0371580227643);
        let dj_mixer_wave_green=this.add.image(0,12,'dance','dj/mixer/wave/green');
        container_6.add(dj_mixer_wave_green);
        let dj_mixer_wave_wave=this.add.sprite(0,12,'dance','dj/mixer/wave/wave0001');
        container_6.add(dj_mixer_wave_wave);
        let dj_mixer_mixer=this.add.image(0.24141154244296104,2.962841977235712,'dance','dj/mixer/mixer');
        container_6.add(dj_mixer_mixer);
        let dj_mixer_tables_tables_under=this.add.sprite(1.241411542442961,-4.037158022764288,'dance','dj/mixer/tables/tables_under0001');
        dj_mixer_tables_tables_under.setOrigin(0.5027027027027027,0.5128205128205128);
        container_6.add(dj_mixer_tables_tables_under);
        let dj_mixer_tables_tables=this.add.sprite(0.24141154244296104,-7.037158022764288,'dance','dj/mixer/tables/tables0001');
        dj_mixer_tables_tables.setOrigin(0.5,0.5161290322580645);
        container_6.add(dj_mixer_tables_tables);
        let dj_mixer_lights_lights=this.add.sprite(0.24141154244296104,-20.037158022764288,'dance','dj/mixer/lights/lights0001');
        container_6.add(dj_mixer_lights_lights);
        let dj_mixer_slider_slider=this.add.sprite(0.24141154244296104,-20.037158022764288,'dance','dj/mixer/slider/slider0001');
        container_6.add(dj_mixer_slider_slider);
        let dj_wires=this.add.image(5.241411542442961,29.962841977235712,'dance','dj/wires');
        dj_wires.setOrigin(0.5014836795252225,0.5050505050505051);
        container_6.add(dj_wires);
        let container_7=this.add.container(666,334.75580341239964);
        let lights_frame=this.add.image(-3,-228.75580341239964,'dance','lights/frame');
        container_7.add(lights_frame);
        let lights_lights=this.add.sprite(-3,-229.75580341239964,'dance','lights/lights0001');
        container_7.add(lights_lights);
        let lights_bw_lights=this.add.sprite(1,-227,'dance','lights/bw/lights0001');
        lights_bw_lights.visible=false;
        container_7.add(lights_bw_lights);
        let container_8=this.add.container(520.6001395292443,310.6122881275866);
        let dj_box_headphones_back=this.add.sprite(-52.600168515674795,-58.61229112964787,'dance','dj/box/headphones/back0001');
        dj_box_headphones_back.setOrigin(0.5135135135135135,0.5);
        container_8.add(dj_box_headphones_back);
        let dj_box_box=this.add.image(-8.234149950044639,-56.48662238555352,'dance','dj/box/box');
        dj_box_box.setOrigin(0.4154913904958189,0.34115047716727415);
        container_8.add(dj_box_box);
        let dj_box_sliders_sliders=this.add.sprite(30.399831484325205,2.387708870352128,'dance','dj/box/sliders/sliders0001');
        dj_box_sliders_sliders.setOrigin(0.5,0.5151515151515151);
        container_8.add(dj_box_sliders_sliders);
        let dj_box_lights_lights=this.add.sprite(43.399831484325205,-44.61229112964787,'dance','dj/box/lights/lights0001');
        dj_box_lights_lights.setOrigin(0.5,0.5072463768115942);
        container_8.add(dj_box_lights_lights);
        let dj_box_headphones_front=this.add.sprite(-26.600168515674795,-70.61229112964787,'dance','dj/box/headphones/front0001');
        dj_box_headphones_front.setOrigin(0.5,0.509090909090909);
        container_8.add(dj_box_headphones_front);
        let rect=this.add.rectangle(1164,537,60,50);
        rect.alpha=0.01;
        rect.isFilled=true;
        rect.fillColor=65280;
        let poster=this.add.image(1168,366,'dance','poster');
        let container_9=this.add.container(657,459.50928944208147);
        let phase3_fg_reveal=this.add.sprite(0,-36.87107132162896,'dance','phase3/fg/reveal0021');
        phase3_fg_reveal.visible=false;
        container_9.add(phase3_fg_reveal);
        let phase3_fg_loop=this.add.sprite(0,-219.00928944208147,'dance','phase3/fg/loop0001');
        phase3_fg_loop.visible=false;
        container_9.add(phase3_fg_loop);
        let phase3_fg_retract=this.add.sprite(0,-37,'dance','phase3/fg/retract0001');
        phase3_fg_retract.visible=false;
        container_9.add(phase3_fg_retract);
        let v=this.add.polygon(1142.7683850705682,437.6970015883089,'-28.654961469025196 174.44148245048498 -15.0055715075965 149.62735118505242 57.77927367475783 111.91094395310469 90.45638148052265 -53.96163885365911 201.62503171025634 -28.60698628060078 179.6806758193739 173.50819083112114 94.47314030269035 221.146211760087 46.74288207050404 256.8783500761387');
        v.setOrigin(0.4903090404500476,0.43468346884600356);
        v.alpha=0.8;
        v.fillColor=7339828;
        let v_2=this.add.polygon(225,340,'66.1946175725401 180.9666965418778 11.544880888460526 148.19550372532404 8.736256330428134 80.22514100602649 2.6813278184423552 -0.6590267900156164 46.13778922914082 -10.687440961715254 60.62327636604027 45.02597110328276 75.10876350293978 63.96853120538202 109.6510789832385 80.68255482488144 126.36510260273792 145.31011282027913');
        v_2.setOrigin(0,0);
        v_2.alpha=0.8;
        v_2.fillColor=7339828;
        let catalog_icon=this.add.image(1418.2860739218731,888.414006164138,'dance','catalog/icon');
        this.add.image(92,280,'dance','exit');
        let phase2_fg_spotlight=this.add.image(732,780.9589893611403,'dance','phase2/fg/spotlight');
        phase2_fg_spotlight.setOrigin(0.5,1.3452903597270451);
        phase2_fg_spotlight.visible=false;
        let sort=[speaker_3,speaker,container_4,container_8,container_5,container_6,container_3,catalog_box,container,container_7,phase2_fg_spotlight,container_9];
        let animate=[dj_box_headphones_front,dj_box_lights_lights,dj_mixer_slider_slider,dj_mixer_lights_lights,dj_mixer_tables_tables,dj_mixer_tables_tables_under,dj_speaker_sound,dj_box_headphones_back];
        let tint=[floor_frame,bg,speaker_3,desk,speaker_4,speaker_2,boiler,dj_speaker,dj_speaker_sound,dj_wires,dj_mixer_slider_slider,dj_mixer_lights_lights,dj_mixer_tables_tables,dj_mixer_tables_tables_under,dj_mixer_mixer,dj_mixer_wave_wave,lights_frame,dj_box_headphones_front,dj_box_lights_lights,dj_box_sliders_sliders,dj_box_box,dj_box_headphones_back,poster,door_door,door_frame,door_behind,lamp,speaker,fg_fg_speaker_4,fg_fg_speaker_3,fg_fg_wire_2,fg_fg_speaker_2,fg_fg_speaker,fg_fg_wire,stage,wire,catalog_box,catalog_paper,phase3_bg_reveal,phase3_bg_retract];
        let bwRings=[phase2_bg_bw,phase2_bg_bw_5,phase2_bg_bw_4,phase2_bg_bw_3,phase2_bg_bw_2];
        let animation=new Animation(phase1_bg_loop);
        animation.key='phase1/bg/loop';
        animation.end=5;
        animation.autoPlay=false;
        animation.showOnStart=true;
        animation.hideOnComplete=true;
        let animation_2=new Animation(phase1_fg_loop);
        animation_2.key='phase1/fg/loop';
        animation_2.end=8;
        animation_2.autoPlay=false;
        animation_2.showOnStart=true;
        animation_2.hideOnComplete=true;
        let animation_3=new Animation(phase1_fg_drop);
        animation_3.key='phase1/fg/drop';
        animation_3.end=21;
        animation_3.repeat=0;
        animation_3.autoPlay=false;
        animation_3.showOnStart=true;
        animation_3.hideOnComplete=true;
        animation_3.onCompleteCallback=()=>{this.discoLoop.__Animation.play(),this.phase1BgAnim.__Animation.play();};
        let animation_4=new Animation(phase1_fg_raise);
        animation_4.key='phase1/fg/raise';
        animation_4.end=19;
        animation_4.repeat=0;
        animation_4.autoPlay=false;
        animation_4.showOnStart=true;
        animation_4.hideOnComplete=true;
        animation_4.onCompleteCallback=()=>this.resetEverything();
        let animation_5=new Animation(phase3_bg_reveal);
        animation_5.key='phase3/bg/reveal';
        animation_5.end=21;
        animation_5.repeat=0;
        animation_5.autoPlay=false;
        animation_5.showOnStart=true;
        let animation_6=new Animation(phase3_bg_retract);
        animation_6.key='phase3/bg/retract';
        animation_6.end=37;
        animation_6.repeat=0;
        animation_6.autoPlay=false;
        animation_6.showOnStart=true;
        animation_6.hideOnComplete=true;
        let animation_7=new Animation(floor_default);
        animation_7.key='floor/default';
        animation_7.end=60;
        let animation_8=new Animation(floor_bw);
        animation_8.key='floor/bw';
        animation_8.end=60;
        let animation_9=new Animation(fg_fg_speaker);
        animation_9.key='fg/fg_speaker_1';
        animation_9.end=10;
        let animation_10=new Animation(phase2_bg);
        animation_10.key='phase2/bg/1';
        animation_10.end=5;
        let animation_11=new Animation(phase2_bg_2);
        animation_11.key='phase2/bg/2';
        animation_11.end=5;
        let animation_12=new Animation(phase2_bg_3);
        animation_12.key='phase2/bg/3';
        animation_12.end=5;
        let animation_13=new Animation(phase2_bg_4);
        animation_13.key='phase2/bg/4';
        animation_13.end=5;
        let animation_14=new Animation(phase2_bg_5);
        animation_14.key='phase2/bg/5';
        animation_14.end=5;
        let animation_15=new Animation(phase2_bg_bw);
        animation_15.key='phase2/bg/bw/1';
        animation_15.end=5;
        let animation_16=new Animation(phase2_bg_bw_2);
        animation_16.key='phase2/bg/bw/2';
        animation_16.end=5;
        let animation_17=new Animation(phase2_bg_bw_3);
        animation_17.key='phase2/bg/bw/3';
        animation_17.end=5;
        let animation_18=new Animation(phase2_bg_bw_4);
        animation_18.key='phase2/bg/bw/4';
        animation_18.end=5;
        let animation_19=new Animation(phase2_bg_bw_5);
        animation_19.key='phase2/bg/bw/5';
        animation_19.end=5;
        let animation_20=new Animation(fg_fg_speaker_2);
        animation_20.key='fg/fg_speaker_2';
        animation_20.end=10;
        let animation_21=new Animation(fg_fg_speaker_3);
        animation_21.key='fg/fg_speaker_1';
        animation_21.end=10;
        let animation_22=new Animation(fg_fg_speaker_4);
        animation_22.key='fg/fg_speaker_2';
        animation_22.end=10;
        let animation_23=new Animation(speaker);
        animation_23.key='speaker_1';
        animation_23.end=10;
        let animation_24=new Animation(catalog_paper);
        animation_24.key='catalog/paper';
        animation_24.end=7;
        animation_24.repeat=0;
        animation_24.autoPlay=false;
        new SimpleButton(door_door);
        let animation_25=new Animation(door_door);
        animation_25.key='door/door';
        animation_25.end=5;
        animation_25.repeat=0;
        animation_25.autoPlay=false;
        animation_25.onHover=true;
        let moveTo=new MoveTo(door_door);
        moveTo.x=220;
        moveTo.y=540;
        let animation_26=new Animation(desk);
        animation_26.key='desk';
        animation_26.end=55;
        animation_26.autoPlay=false;
        new Button(stairs).spriteName='stairs';
        let moveTo_2=new MoveTo(stairs);
        moveTo_2.x=1324;
        moveTo_2.y=769;
        let animation_27=new Animation(speaker_2);
        animation_27.key='speaker_1';
        animation_27.end=10;
        new Button(boiler).spriteName='boiler';
        let moveTo_3=new MoveTo(boiler);
        moveTo_3.x=960;
        moveTo_3.y=420;
        let animation_28=new Animation(dj_speaker_sound);
        animation_28.key='dj/speaker_sound';
        animation_28.end=2;
        animation_28.repeatDelay=250;
        animation_28.autoPlay=false;
        let animation_29=new Animation(dj_mixer_tables_tables_under);
        animation_29.key='dj/mixer/tables/tables_under';
        animation_29.end=23;
        animation_29.autoPlay=false;
        let animation_30=new Animation(dj_mixer_tables_tables);
        animation_30.key='dj/mixer/tables/tables';
        animation_30.end=6;
        animation_30.autoPlay=false;
        let animation_31=new Animation(dj_mixer_lights_lights);
        animation_31.key='dj/mixer/lights/lights';
        animation_31.end=23;
        animation_31.autoPlay=false;
        let animation_32=new Animation(dj_mixer_slider_slider);
        animation_32.key='dj/mixer/slider/slider';
        animation_32.end=23;
        animation_32.autoPlay=false;
        let animation_33=new Animation(lights_lights);
        animation_33.key='lights/lights';
        animation_33.end=80;
        let animation_34=new Animation(lights_bw_lights);
        animation_34.key='lights/bw/lights';
        animation_34.end=80;
        let animation_35=new Animation(dj_box_headphones_back);
        animation_35.key='dj/box/headphones/back';
        animation_35.end=30;
        animation_35.autoPlay=false;
        let simpleButton=new SimpleButton(dj_box_box);
        simpleButton.hoverCallback=()=>this.onBoxOver();
        simpleButton.hoverOutCallback=()=>this.onBoxOut();
        let moveTo_4=new MoveTo(dj_box_box);
        moveTo_4.x=520;
        moveTo_4.y=300;
        new ShowHint(dj_box_box).text='DJ3K';
        let animation_36=new Animation(dj_box_lights_lights);
        animation_36.key='dj/box/lights/lights';
        animation_36.end=30;
        animation_36.autoPlay=false;
        let animation_37=new Animation(dj_box_headphones_front);
        animation_37.key='dj/box/headphones/front';
        animation_37.end=30;
        animation_37.autoPlay=false;
        let zone=new Zone(rect);
        zone.hoverCallback=()=>this.onPuffleOver();
        zone.useHandCursor=false;
        zone.clickThrough=true;
        let animation_38=new Animation(phase3_fg_reveal);
        animation_38.key='phase3/fg/reveal';
        animation_38.end=21;
        animation_38.repeat=0;
        animation_38.autoPlay=false;
        animation_38.showOnStart=true;
        animation_38.hideOnComplete=true;
        animation_38.onCompleteCallback=()=>{this.phase3ThingLoop.visible=true,this.phase3ThingLoop.play(this.phase3ThingAnimKey);};
        let animation_39=new Animation(phase3_fg_retract);
        animation_39.key='phase3/fg/retract';
        animation_39.end=17;
        animation_39.repeat=0;
        animation_39.autoPlay=false;
        animation_39.showOnStart=true;
        animation_39.hideOnComplete=true;
        new ShowHint(v).text='dancing_hint';
        let simpleButton_2=new SimpleButton(v);
        simpleButton_2.hoverCallback=()=>this.onDanceContestOver();
        simpleButton_2.hoverOutCallback=()=>this.onDanceContestOut();
        let moveTo_5=new MoveTo(v);
        moveTo_5.x=1066;
        moveTo_5.y=545;
        let simpleButton_3=new SimpleButton(v_2);
        simpleButton_3.hoverCallback=()=>this.onCatalogOver();
        simpleButton_3.hoverOutCallback=()=>this.onCatalogOut();
        simpleButton_3.callback=()=>this.interface.loadWidget('DanceCatalog');
        let button=new Button(catalog_icon);
        button.spriteName='catalog/icon';
        button.callback=()=>this.interface.loadWidget('DanceCatalog');
        this.phase1BgAnim=phase1_bg_loop;
        this.discoLoop=phase1_fg_loop;
        this.discoDrop=phase1_fg_drop;
        this.discoRetract=phase1_fg_raise;
        this.phase3FloorReveal=phase3_bg_reveal;
        this.phase3FloorRetract=phase3_bg_retract;
        this.dancefloor=floor_default;
        this.dancefloorBW=floor_bw;
        this._rings=rings;
        this._ringsBW=ringsBW;
        this.catalogBox=catalog_box;
        this.catalogPaper=catalog_paper;
        this.desk0001=desk;
        this.puffle=puffle_puffle;
        this.dj_speaker_sound=dj_speaker_sound;
        this.dj_mixer_wave=dj_mixer_wave_wave;
        this.dj_mixer_tables_under=dj_mixer_tables_tables_under;
        this.dj_mixer_tables=dj_mixer_tables_tables;
        this.dj_mixer_lights=dj_mixer_lights_lights;
        this.dj_mixer_slider=dj_mixer_slider_slider;
        this.lights=lights_lights;
        this.lightsBW=lights_bw_lights;
        this.dj_box_headphones_back=dj_box_headphones_back;
        this.dj_box_sliders=dj_box_sliders_sliders;
        this.dj_box_lights=dj_box_lights_lights;
        this.dj_box_headphones_front=dj_box_headphones_front;
        this.poster=poster;
        this.phase3ThingReveal=phase3_fg_reveal;
        this.phase3ThingLoop=phase3_fg_loop;
        this.phase3ThingRetract=phase3_fg_retract;
        this.interfaceIcons=catalog_icon;
        this.spotlights=phase2_fg_spotlight;
        this.sort=sort;
        this.animate=animate;
        this._tint=tint;
        this._bwRings=bwRings;
        this.events.emit('scene-awake');
    }

    create() {
        super.create();
        this.puffle.on('animationcomplete',()=>this.onPuffleAnimComplete());
        this.dj_box_sliders.on('animationcomplete',()=>this.onSlidersAnimComplete());
        this.dj_mixer_wave.on('animationcomplete',()=>this.onWaveAnimComplete());
        this.puffle.play('dj_puffle_idle');
        this.previousRaveState=0;
        this.raveState=0;
        this.phase1StuffShowing=false;
        this.phase3StuffShowing=false;
        this.phase3ThingAnimKey='phase3Thing';
        this.events.on('addpenguin',()=>this.checkPenguins());
        this.colorTints=[8763628,8763628,9033854,16091327,10132122,15365750,14851696,16382607,12355039,14400660,14390420,9755547,9751003,11723172,16777215,11001821,13290424,16777215,16225971,8763628,12750501,12563668,15847672,14990488,15365750,9102583,12964268,16580229,12040119,13730547,10905939,16747609,3709068,12040119];
        this.floorTints=[7504117,7504117,2948953,16737498,12040119,16728642,16225860,16645967,10420474,14133871,16024194,1618740,6206944,2816635,16777215,5493691,15000528,16777215,16096952,7504117,13326731,12036815,15191274,16302996,16728642,8907518,11452041,16514189,12040119,12398332,13530196,16747638,3709101,12040119];
    }

    initCheckPenguins() {
        if(!this.penguins)return;
        this.checkRave();
        this.previousRaveState=this.raveState;
    }

    checkPenguins() {
        if(!this.penguins)return;
        this.checkRave();
    }

    checkColor() {
        if(!this.penguins)return;
        this.spotlights.setFrame('phase2/fg/spotlight-bw');
        this.phase3ThingLoop.anims&&this.phase3ThingLoop.anims.currentFrame?'phase3ThingBW'!=this.phase3ThingLoop.anims.currentAnim.key&&this.phase3ThingLoop.play({'key':'phase3ThingBW','startFrame':this.phase3ThingLoop.anims.currentFrame.index}):this.phase3ThingLoop.play('phase3ThingBW');
        this.phase3ThingAnimKey='phase3ThingBW';
    }

    resetEverything() {
        this.dancefloorBW.visible=false;
        this.dancefloor.visible=true;
        this.lightsBW.visible=false;
        this.lights.visible=true;
    }

    onPuffleAnimComplete() {
        this.puffle.play('dj_puffle_idle');
    }

    onSlidersAnimComplete() {
        this.dj_box_sliders.play('dj_sliders_move');
    }

    onWaveAnimComplete() {
        this.dj_mixer_wave.play('dj_wave_move');
    }

    onPuffleOver() {
        this.puffle.play('dj_puffle_jump');
    }

    onBoxOver() {
        this.dj_box_sliders.play('dj_sliders_on');
        this.dj_mixer_wave.play('dj_wave_on');
    }

    onBoxOut() {
        this.dj_box_sliders.stop();
        this.dj_mixer_wave.stop();
        this.dj_box_sliders.setFrame('dj/box/sliders/sliders0001');
        this.dj_mixer_wave.setFrame('dj/mixer/wave/wave0001');
    }

    onDanceContestOver() {
        this.poster.setFrame('poster-hover');
        this.desk0001.__Animation.play();
    }

    onDanceContestOut() {
        this.poster.setFrame('poster');
        this.desk0001.__Animation.stop();
        this.desk0001.setFrame('desk0001');
    }

    onCatalogOver() {
        this.catalogBox.setFrame('catalog/box-hover');
        this.catalogPaper.__Animation.play();
    }

    onCatalogOut() {
        this.catalogBox.setFrame('catalog/box');
        this.catalogPaper.__Animation.stop();
        this.catalogPaper.setFrame('catalog/paper0001');
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
