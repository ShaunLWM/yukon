/* START OF COMPILED CODE */

import BaseWidget from "../../../base/BaseWidget";
import DraggableContainer from "../../../components/DraggableContainer";
import Interactive from "../../../components/Interactive";
import PaperDoll from "./paperdoll/PaperDoll";
import Buttons from "./buttons/Buttons";
import Button from "../../../components/Button";
import InventorySort from "./inventory_sort/InventorySort";
import Inventory from "./inventory/Inventory";
import Animation from "../../../components/Animation";
/* START-USER-IMPORTS */
import TransformPaperLoader from '@engine/loaders/TransformPaperLoader'
import Outfitsaver from '../outfitsaver/Outfitsaver'
import SimpleButton from '../../../components/SimpleButton'
/* END-USER-IMPORTS */

export default class PlayerCard extends BaseWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 760, y ?? 460);

        /** @type {Phaser.GameObjects.Container} */
        this.photo;
        /** @type {Phaser.GameObjects.Image} */
        this.spinner;
        /** @type {PaperDoll} */
        this.paperDoll;
        /** @type {Buttons} */
        this.buttons;
        /** @type {Phaser.GameObjects.Text} */
        this.coins;
        /** @type {Phaser.GameObjects.Text} */
        this.stampCount;
        /** @type {Phaser.GameObjects.Container} */
        this.stats;
        /** @type {Phaser.GameObjects.Text} */
        this.username;
        /** @type {InventorySort} */
        this.inventorySort;
        /** @type {Inventory} */
        this.inventory;
        /** @type {Phaser.GameObjects.Image} */
        this.stripes;
        /** @type {Phaser.GameObjects.Container} */
        this.badge;


        // outfitsaver wrapper — must be first child so it renders behind card
        const outfitWrapper = scene.add.container(-245, -123)
        this.add(outfitWrapper)

        const outfitsaver = new Outfitsaver(scene, 865, 105)
        outfitsaver.visible = false
        outfitWrapper.add(outfitsaver)

        // card_photo
        const card_photo = scene.add.image(0, 0, "main", "card-photo");
        card_photo.setOrigin(0.5011600928074246, 0.5011709601873536);
        this.add(card_photo);

        // photo
        const photo = scene.add.container(-205, -206);
        this.add(photo);

        // spinner
        const spinner = scene.add.image(0, -2, "main", "card-spinner");
        this.add(spinner);

        // card_bg
        const card_bg = scene.add.image(0, 0, "main", "card-bg-player");
        this.add(card_bg);

        // paperDoll
        const paperDoll = new PaperDoll(scene, 0, 0);
        paperDoll.visible = false;
        this.add(paperDoll);

        // buttons
        const buttons = new Buttons(scene, 0, 255);
        buttons.visible = false;
        this.add(buttons);

        // stats
        const stats = scene.add.container(-13, 255);
        stats.visible = false;
        this.add(stats);

        // coins row (top)
        const card_coin = scene.add.image(-160.5, -50, "main", "card-coin");
        card_coin.setScale(0.9);
        card_coin.setOrigin(0, 0);
        stats.add(card_coin);

        const coins = scene.add.text(39, -37, "", {});
        coins.setOrigin(0.5, 0);
        coins.text = "Your Coins: 000000";
        coins.setStyle({ "color": "#000000ff", "fixedWidth":300,"fontFamily": "Arial", "fontSize": "24px" });
        stats.add(coins);

        // stamps row (bottom) - clickable button like CPJ
        const stampButton = scene.add.image(-146, 23, "main", "blue-button");
        stats.add(stampButton);

        const stampIcon = scene.add.image(-163.5, 3.5, "main", "stamps-icon");
        stampIcon.setOrigin(0, 0);
        stats.add(stampIcon);

        const stampCount = scene.add.text(39, 9, "", {});
        stampCount.setOrigin(0.5, 0);
        stampCount.text = "Your Stamps: 0/0";
        stampCount.setStyle({ "color": "#000000ff", "fixedWidth":300,"fontFamily": "Arial", "fontSize": "24px" });
        stats.add(stampCount);

        // stamp button component
        const stampButtonButton = new Button(stampButton);
        stampButtonButton.spriteName = "blue-button";
        stampButtonButton.callback = () => this.openStampbook();
        stampButtonButton.activeFrame = true;

        // username
        const username = scene.add.text(0, -238, "", {});
        username.setOrigin(0.5, 0.5);
        username.text = "Username";
        username.setStyle({ "align": "center", "color": "#000000ff", "fixedWidth":360,"fontFamily": "Arial", "fontSize": "32px", "fontStyle": "bold" });
        this.add(username);

        // x_button
        const x_button = scene.add.image(177, -237, "main", "blue-button");
        this.add(x_button);

        // blue_x
        const blue_x = scene.add.image(177, -239, "main", "blue-x");
        this.add(blue_x);

        // inventorySort
        const inventorySort = new InventorySort(scene, 434, 315);
        inventorySort.visible = false;
        this.add(inventorySort);

        // inventory
        const inventory = new Inventory(scene, -135, 33);
        inventory.visible = false;
        this.add(inventory);

        // outfit arrow toggle container
        const outfitarrowContainer = scene.add.container(-255, -164)
        outfitarrowContainer.visible = false
        this.add(outfitarrowContainer)

        const outfitarrow = scene.add.image(497, 261, 'main', 'tab')
        outfitarrow.angle = -90
        outfitarrowContainer.add(outfitarrow)

        const outfitarrowIcon = scene.add.image(490, 258, 'main', 'tab-arrow')
        outfitarrowIcon.angle = -90
        outfitarrowContainer.add(outfitarrowIcon)

        const outfitarrowBtn = new SimpleButton(outfitarrow)
        outfitarrowBtn.callback = () => this.toggleOutfitSaver()

        // badge
        const badge = scene.add.container(-153, -240);
        this.add(badge);

        // badge_member
        const badge_member = scene.add.image(0, 17, "main", "badge/member");
        badge.add(badge_member);

        // badge_lines_lines
        const badge_lines_lines = scene.add.sprite(0, 18, "main", "badge/lines/lines0001");
        badge_lines_lines.setOrigin(0.5, 0.5028571428571429);
        badge.add(badge_lines_lines);

        // stripes
        const stripes = scene.add.image(0, 56, "main", "badge/stripes/0");
        stripes.setOrigin(0.5, 0.5051546391752577);
        badge.add(stripes);

        // badge_ribbon
        const badge_ribbon = scene.add.image(0, 33, "main", "badge/ribbon");
        badge_ribbon.setOrigin(0.5061728395061729, 0.5185185185185185);
        badge.add(badge_ribbon);

        // badge_star
        const badge_star = scene.add.image(0, 0, "main", "badge/star");
        badge.add(badge_star);

        // this (components)
        const thisDraggableContainer = new DraggableContainer(this);
        thisDraggableContainer.handle = card_bg;

        // card_photo (components)
        new Interactive(card_photo);

        // x_button (components)
        const x_buttonButton = new Button(x_button);
        x_buttonButton.spriteName = "blue-button";
        x_buttonButton.callback = () => this.close();

        // badge_lines_lines (components)
        const badge_lines_linesAnimation = new Animation(badge_lines_lines);
        badge_lines_linesAnimation.key = "badge/lines/lines";
        badge_lines_linesAnimation.end = 180;

        this.photo = photo;
        this.spinner = spinner;
        this.paperDoll = paperDoll;
        this.buttons = buttons;
        this.coins = coins;
        this.stampCount = stampCount;
        this.stats = stats;
        this.username = username;
        this.inventorySort = inventorySort;
        this.inventory = inventory;
        this.outfitsaver = outfitsaver;
        this.outfitarrowContainer = outfitarrowContainer;
        this.stripes = stripes;
        this.badge = badge;

        /* START-USER-CTR-CODE */

        // Transform paper container — insert right after paperDoll so UI elements render above it
        this.transformPaper = scene.add.container(0, 0)
        this.transformPaper.visible = false
        this.transformPaper.paper = null
        this.addAt(this.transformPaper, this.getIndex(this.paperDoll) + 1)

        this.transformPaperLoader = new TransformPaperLoader(scene, this.transformPaper, () => this.revertTransform())

        // Active player id
        this.id = null

        this.spinnerTween = scene.tweens.add({
            targets: spinner,
            angle: { from: 0, to: 180 },
            duration: 900,
            repeat: -1,
            ease: 'Cubic',
            paused: true
        })

        /* END-USER-CTR-CODE */
    }


    /* START-USER-CODE */

    show(playerId, username) {
        if (this.visible && playerId === this.id) {
            return
        }

        this.reset()

        this.id = playerId

        this.setUsername(username)
        this.updateButtons()

        if (playerId in this.world.room.penguins) {
            this.updatePlayer(this.world.room.penguins[playerId])

        } else {
            this.startSpinner()
            this.network.send('get_player', { id: playerId })
        }

        super.show()
    }

    close() {
        super.close()
        this.reset()
    }

    updatePlayer(player) {
        const { id, username, joinTime, isClient } = player

        if (id !== this.id) {
            return
        }

        this.updateElements({
            username,
            coins: isClient ? this.world.client.coins : 0,
            isClient
        })

        const dollData = player.items?.flat || player
        dollData.transform = player.transform
        dollData.color = dollData.color || player.color
        this.loadDoll(dollData, isClient)

        this.updateBadge(joinTime)

        this.inventorySort.closeMenu()
    }

    updateElements({ username, coins, isClient }) {
        this.setUsername(username)
        this.setCoins(coins)

        this.outfitsaver.visible = this.outfitsaver.visible && isClient
        this.inventory.visible = isClient && !this.outfitsaver.visible
        this.outfitarrowContainer.visible = isClient && !this.outfitsaver.visible
        this.stats.visible = isClient
        this.buttons.visible = !isClient

        if (isClient) {
            this.updateInventory()
        }
    }

    setUsername(username) {
        this.username.text = username
    }

    setCoins(coins) {
        this.coins.text = `Your Coins: ${coins}`

        const client = this.world.client
        const earned = client.stamps?.length || 0
        const total = Object.keys(client.stampsByGroup || {}).length
        this.stampCount.text = `Your Stamps: ${earned}/${total}`
    }

    openStampbook() {
        this.close()
        this.interface.loadWidget('Stampbook')
    }

    updateInventory() {
        this.inventory.showPage()
    }

    toggleOutfitSaver() {
        if (this.outfitsaver.visible) {
            this.outfitsaver.visible = false
            this.outfitarrowContainer.visible = true
            return
        }
        this.inventory.visible = false
        this.outfitsaver.visible = true
        this.outfitarrowContainer.visible = false
    }

    loadDoll(items, isClient) {
        const transformId = items.transform
        const crumb = transformId > 0 ? this.crumbs.transformations[transformId] : null
        if (!transformId || transformId <= 0 || (crumb && crumb.dont_hide_doll)) {
            this.paperDoll.visible = true
            this.transformPaper.visible = false
            this.paperDoll.loadDoll(items, isClient)
        }

        if (transformId > 0 && crumb && !crumb.no_paper) {
            if (!crumb.dont_hide_doll) {
                this.paperDoll.visible = false
            }
            this.transformPaper.visible = true
            this.transformPaperLoader.loadItem(transformId, isClient, crumb.paper_colors, items.color)
            this.stopSpinner()
        }
    }

    revertTransform() {
        this.world.client.sendTransform(0)
    }

    resetDoll() {
        this.paperDoll.visible = false
        this.paperDoll.removeItems()
        this.transformPaper.visible = false
        if (this.transformPaper.paper) {
            this.transformPaper.paper.destroy()
            this.transformPaper.paper = null
        }
    }

    updateButtons() {
        if (this.buttons.visible) {
            const relationship = this.world.getRelationship(this.id)

            this.buttons.updateButtons(relationship)
        }
    }

    resetButtons() {
        this.buttons.resetButtons()
    }

    updateBadge(joinTime = null) {
        this.badge.visible = !!joinTime

        if (!joinTime) {
            return
        }

        const oneDay = 1000 * 60 * 60 * 24
        const timeDiff = Date.now() - Date.parse(joinTime)
        const daysDiff = Math.round(timeDiff / oneDay)

        const months = Math.floor(daysDiff / 30)
        let frame

        if (months <= 6) {
            frame = 0
        } else if (months <= 12) {
            frame = 1
        } else if (months <= 18) {
            frame = 2
        } else if (months <= 24) {
            frame = 3
        } else {
            frame = 4
        }

        this.stripes.setFrame(`badge/stripes/${frame}`)
    }

    startSpinner() {
        this.spinnerTween.seek(0)
        this.spinnerTween.resume()

        this.spinner.visible = true
    }

    stopSpinner() {
        this.spinner.visible = false

        this.spinnerTween.pause()
        this.spinner.angle = 0
    }

    reset() {
        this.id = null

        this.updateElements({
            username: '',
            coins: 0,
            isClient: false
        })

        this.resetDoll()

        this.resetButtons()
        this.updateBadge()

        this.inventory.reset()

        this.outfitsaver.visible = false
        this.outfitsaver.clearSelection()
        this.outfitarrowContainer.visible = false

        this.stopSpinner()
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
