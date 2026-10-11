/* START OF COMPILED CODE */

import BaseDynamicWidget from "../../../base/BaseDynamicWidget";
import Interactive from "../../../components/Interactive";
import Button from "../../../components/Button";
import ShowHint from "../../../components/ShowHint";
import IglooMap from "./igloo_map/IglooMap";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Map extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 760, y ?? 480);

        /** @type {IglooMap} */
        this.iglooMap;


        // block
        const block = scene.add.rectangle(0, 0, 1520, 960);
        block.isFilled = true;
        block.fillColor = 0;
        block.fillAlpha = 0.2;
        this.add(block);

        // bg
        const bg = scene.add.image(0, -35, "map", "bg");
        bg.setOrigin(0.5, 0.5);
        this.add(bg);

        // island layers (back to front)
        const island1 = scene.add.image(-12, -30, "map", "island1");
        this.add(island1);
        const island2 = scene.add.image(-12, -30, "map", "island2");
        this.add(island2);
        const island3 = scene.add.image(-12, -200, "map", "island3");
        this.add(island3);
        const island4 = scene.add.image(360, -180, "map", "island4");
        this.add(island4);
        const island5 = scene.add.image(300, -210, "map", "island5");
        this.add(island5);
        const island6 = scene.add.image(-420, -140, "map", "island6");
        this.add(island6);
        const island7 = scene.add.image(-80, -260, "map", "island7");
        this.add(island7);

        // waterfall animation
        const waterfall = scene.add.sprite(-260, -210, "map", "waterfall0001");
        this.add(waterfall);

        // dock animation
        const dock = scene.add.sprite(-370, 114, "map", "dock0001");
        dock.setOrigin(0.5, 0.5);
        this.add(dock);

        // campfire animation
        const campfire = scene.add.sprite(310, -140, "map", "campfire0001");
        this.add(campfire);

        // decorative layers
        const welcomeTrees = scene.add.image(-220, -160, "map", "welcome-trees");
        this.add(welcomeTrees);
        const rinkTrees = scene.add.image(52, -130, "map", "rink-trees");
        this.add(rinkTrees);
        const covestairs = scene.add.image(370, -135, "map", "covestairs");
        this.add(covestairs);
        const logs = scene.add.image(318, -128, "map", "logs");
        this.add(logs);

        // mtn with ski lift
        const mtn = scene.add.image(-232, -256, "map", "mtn/mtn");
        this.add(mtn);

        // village
        const village = scene.add.image(-181, -179, "map", "village");
        village.setOrigin(0.5, 0.5);
        this.add(village);

        // welcome (ski village area)
        const welcome = scene.add.image(-190, -168, "map", "welcome");
        this.add(welcome);

        // beach
        const beach = scene.add.image(-390, -94, "map", "beach");
        this.add(beach);

        // town
        const town = scene.add.image(-128, 22, "map", "town/town");
        this.add(town);

        // forts
        const forts = scene.add.image(78, 30, "map", "forts/forts");
        forts.setOrigin(0.5, 0.5);
        this.add(forts);

        // igloos
        const igloo = scene.add.image(201, 100, "map", "igloos");
        this.add(igloo);

        // plaza
        const plaza = scene.add.image(264, 22, "map", "plaza");
        plaza.setOrigin(0.5, 0.5);
        this.add(plaza);

        // rink
        const rink = scene.add.image(52, -98, "map", "rinkVariations/hockey/button");
        rink.setOrigin(0.5, 0.5);
        this.add(rink);

        // forest
        const forest = scene.add.image(291, -84, "map", "forest");
        forest.setOrigin(0.5, 0.5);
        this.add(forest);

        // cove
        const cove = scene.add.image(334, -169, "map", "cove");
        cove.setOrigin(0.5, 0.5);
        this.add(cove);

        // courtyard (dojo area)
        const courtyard = scene.add.image(69, -310, "map", "courtyard");
        courtyard.setOrigin(0.5, 0.5);
        this.add(courtyard);

        // mine shack
        const mine = scene.add.image(168, -214, "map", "shack");
        mine.setOrigin(0.5, 0.5);
        this.add(mine);

        // berg animation
        const berg = scene.add.sprite(402, -210, "map", "berg0001");
        this.add(berg);

        // grey_button
        const grey_button = scene.add.image(483, -333, "main", "grey-button");
        this.add(grey_button);

        // grey_x
        const grey_x = scene.add.image(483, -335, "main", "grey-x");
        this.add(grey_x);

        // iglooMap
        const iglooMap = new IglooMap(scene, 0, 0);
        iglooMap.visible = false;
        this.add(iglooMap);

        // block (components)
        new Interactive(block);

        // bg (components)
        new Interactive(bg);

        // courtyard (components) - dojo courtyard
        const courtyardButton = new Button(courtyard);
        courtyardButton.spriteName = "courtyard";
        courtyardButton.callback = () => this.onRoomClick(321);
        courtyardButton.activeFrame = false;
        const courtyardShowHint = new ShowHint(courtyard);
        courtyardShowHint.text = "dojoext_hint";

        // mtn (components)
        const mtnButton = new Button(mtn);
        mtnButton.spriteName = "mtn/mtn";
        mtnButton.callback = () => this.onRoomClick(230);
        mtnButton.activeFrame = false;
        const mtnShowHint = new ShowHint(mtn);
        mtnShowHint.text = "mtn_hint";

        // village (components)
        const villageButton = new Button(village);
        villageButton.spriteName = "village";
        villageButton.callback = () => this.onRoomClick(200);
        villageButton.activeFrame = false;
        const villageShowHint = new ShowHint(village);
        villageShowHint.text = "village_hint";

        // welcome (components)
        const welcomeButton = new Button(welcome);
        welcomeButton.spriteName = "welcome";
        welcomeButton.callback = () => this.onRoomClick(200);
        welcomeButton.activeFrame = false;

        // beach (components)
        const beachButton = new Button(beach);
        beachButton.spriteName = "beach";
        beachButton.callback = () => this.onRoomClick(400);
        beachButton.activeFrame = false;
        const beachShowHint = new ShowHint(beach);
        beachShowHint.text = "beach_hint";

        // dock (components)
        const dockButton = new Button(dock);
        dockButton.spriteName = "dock0001";
        dockButton.callback = () => this.onRoomClick(800);
        dockButton.activeFrame = false;
        const dockShowHint = new ShowHint(dock);
        dockShowHint.text = "dock_hint";

        // town (components)
        const townButton = new Button(town);
        townButton.spriteName = "town/town";
        townButton.callback = () => this.onRoomClick(100);
        townButton.activeFrame = false;
        const townShowHint = new ShowHint(town);
        townShowHint.text = "town_hint";

        // forts (components)
        const fortsButton = new Button(forts);
        fortsButton.spriteName = "forts/forts";
        fortsButton.callback = () => this.onRoomClick(801);
        fortsButton.activeFrame = false;
        const fortsShowHint = new ShowHint(forts);
        fortsShowHint.text = "forts_hint";

        // igloo (components)
        const iglooButton = new Button(igloo);
        iglooButton.spriteName = "igloos";
        iglooButton.callback = () => this.iglooMap.show();
        iglooButton.activeFrame = false;
        const iglooShowHint = new ShowHint(igloo);
        iglooShowHint.text = "igloos_hint";

        // plaza (components)
        const plazaButton = new Button(plaza);
        plazaButton.spriteName = "plaza";
        plazaButton.callback = () => this.onRoomClick(300);
        plazaButton.activeFrame = false;
        const plazaShowHint = new ShowHint(plaza);
        plazaShowHint.text = "plaza_hint";

        // rink (components)
        const rinkButton = new Button(rink);
        rinkButton.spriteName = "rinkVariations/hockey/button";
        rinkButton.callback = () => this.onRoomClick(802);
        rinkButton.activeFrame = false;
        const rinkShowHint = new ShowHint(rink);
        rinkShowHint.text = "rink_hint";

        // forest (components)
        const forestButton = new Button(forest);
        forestButton.spriteName = "forest";
        forestButton.callback = () => this.onRoomClick(809);
        forestButton.activeFrame = false;
        const forestShowHint = new ShowHint(forest);
        forestShowHint.text = "forest_hint";

        // cove (components)
        const coveButton = new Button(cove);
        coveButton.spriteName = "cove";
        coveButton.callback = () => this.onRoomClick(810);
        coveButton.activeFrame = false;
        const coveShowHint = new ShowHint(cove);
        coveShowHint.text = "cove_hint";

        // mine (components)
        const mineButton = new Button(mine);
        mineButton.spriteName = "shack";
        mineButton.callback = () => this.onRoomClick(807);
        mineButton.activeFrame = false;
        const mineShowHint = new ShowHint(mine);
        mineShowHint.text = "shack_hint";

        // berg (components)
        const bergButton = new Button(berg);
        bergButton.spriteName = "berg0001";
        bergButton.callback = () => this.onRoomClick(805);
        bergButton.activeFrame = false;

        // grey_button (components)
        const grey_buttonButton = new Button(grey_button);
        grey_buttonButton.spriteName = "grey-button";
        grey_buttonButton.callback = () => this.close();

        this.iglooMap = iglooMap;
        this.dock = dock;
        this.berg = berg;
        this.waterfall = waterfall;
        this.campfire = campfire;

        /* START-USER-CTR-CODE */

        this.createAnimations(scene);

        /* END-USER-CTR-CODE */
    }


    /* START-USER-CODE */

    createAnimations(scene) {
        let tex = scene.textures.get('map');

        this.createFrameAnim(scene, tex, 'map_dock', 'dock', 96, 24);
        this.createFrameAnim(scene, tex, 'map_berg', 'berg', 75, 12);
        this.createFrameAnim(scene, tex, 'map_waterfall', 'waterfall', 30, 18);
        this.createFrameAnim(scene, tex, 'map_campfire', 'campfire', 12, 12);

        this.dock.play('map_dock');
        this.berg.play('map_berg');
        this.waterfall.play('map_waterfall');
        this.campfire.play('map_campfire');
    }

    createFrameAnim(scene, tex, key, prefix, count, frameRate) {
        if (scene.anims.exists(key)) return;

        let frames = [];
        for (let i = 1; i <= count; i++) {
            let name = prefix + String(i).padStart(4, '0');
            if (tex.has(name)) {
                frames.push({ key: 'map', frame: name });
            }
        }

        if (frames.length > 0) {
            scene.anims.create({
                key: key,
                frames: frames,
                frameRate: frameRate,
                repeat: -1
            });
        }
    }

    onRoomClick(id) {
        const room = this.crumbs.rooms[id]

        if (!room) return

        if (this.world.room.key === room.key) {
            return
        }

        this.world.client.sendJoinRoom(id, room.key, room.x, room.y, 80)
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
