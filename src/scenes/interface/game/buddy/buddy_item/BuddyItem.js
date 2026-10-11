import BaseContainer from '@scenes/base/BaseContainer'

import { Button, SimpleButton, ShowHint } from '@components/components'


/* START OF COMPILED CODE */

export default class BuddyItem extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 760, y ?? 480);

        /** @type {Phaser.GameObjects.Image} */
        this.icon;
        /** @type {Phaser.GameObjects.Text} */
        this.username;


        // buddy_item
        const buddy_item = scene.add.image(0, 0, "main", "buddy/item");
        this.add(buddy_item);

        // icon
        const icon = scene.add.image(-137, 0, "main", "buddy/icon-offline");
        this.add(icon);

        // username
        const username = scene.add.text(25, 0, "", {});
        username.setOrigin(0.5, 0.5);
        username.setStyle({ "fixedWidth":270,"fontFamily": "Arial", "fontSize": "24px" });
        this.add(username);

        // favorite star
        const favoriteStar = scene.add.image(155, 0, "main", "badge/star");
        favoriteStar.setScale(0.6);
        favoriteStar.visible = false;
        favoriteStar.setInteractive({ cursor: 'pointer' });
        favoriteStar.on('pointerdown', () => this.onFavoriteClick());
        this.add(favoriteStar);

        this.favoriteStar = favoriteStar;

        // requestBtns container (matches CPJ: x=102, y=0)
        const requestBtns = scene.add.container(102, 0);
        requestBtns.visible = false;
        this.add(requestBtns);

        // accept emote (emotes/1 = smiley)
        const requestAccept = scene.add.image(0, 6, "main", "emotes/1");
        requestAccept.scaleX = 0.8;
        requestAccept.scaleY = 0.8;
        requestAccept.setOrigin(0.5, 0.67);
        requestBtns.add(requestAccept);

        // deny emote (emotes/4 = frown)
        const requestDeny = scene.add.image(43, 6, "main", "emotes/4");
        requestDeny.scaleX = 0.8;
        requestDeny.scaleY = 0.8;
        requestDeny.setOrigin(0.5, 0.67);
        requestBtns.add(requestDeny);

        // buddy_item (components)
        const buddy_itemButton = new Button(buddy_item);
        buddy_itemButton.spriteName = "buddy/item";
        buddy_itemButton.callback = () => this.onClick();
        buddy_itemButton.activeFrame = false;

        // accept (components)
        const acceptButton = new SimpleButton(requestAccept);
        acceptButton.callback = () => this.onAcceptClick();

        // deny (components)
        const denyButton = new SimpleButton(requestDeny);
        denyButton.callback = () => this.onDenyClick();

        this.buddy_item = buddy_item;
        this.icon = icon;
        this.username = username;
        this.requestBtns = requestBtns;

        /* START-USER-CTR-CODE */

        this.id
        this.favorite = false

        /* END-USER-CTR-CODE */
    }


    /* START-USER-CODE */

    setItem(buddy) {
        if (!buddy) {
            return this.clearItem()
        }

        this.id = buddy.id
        this.username.text = buddy.username
        this.favorite = !!buddy.favorite

        let relationship = this.world.getRelationship(buddy.id)
        let texture = `buddy/icon-${relationship}`

        this.icon.setTexture('main', texture)

        let isBuddies = this.parentContainer.listType == 'buddies'
        let isRequests = this.parentContainer.listType == 'buddyRequests'
        this.requestBtns.visible = isRequests
        this.favoriteStar.visible = isBuddies
        this.favoriteStar.setAlpha(this.favorite ? 1 : 0.3)

        if (isRequests) {
            this.buddy_item.disableInteractive()
        } else {
            this.buddy_item.setInteractive({ cursor: 'pointer' })
        }

        if (isRequests && buddy.seen != 1) {
            buddy.seen = 1
        }
    }

    clearItem() {
        this.id = null
        this.username.text = ''
        this.favorite = false

        this.icon.setTexture('main', 'buddy/icon-offline')
        this.requestBtns.visible = false
        this.favoriteStar.visible = false
        this.buddy_item.setInteractive({ cursor: 'pointer' })
    }

    onFavoriteClick() {
        if (!this.id) return
        this.network.send('buddy_favorite', { id: this.id })
    }

    onClick() {
        if (!this.id) {
            return
        }

        if (this.parentContainer.listType == 'ignores') {
            this.showRemoveIgnore()
            return
        }

        if (this.parentContainer.listType == 'buddyRequests') {
            return
        }

        this.interface.showCard(this.id, this.username.text)
    }

    onAcceptClick() {
        if (!this.id) return
        this.network.send('buddy_accept', { id: this.id })
    }

    onDenyClick() {
        if (!this.id) return
        this.network.send('buddy_reject', { id: this.id })
    }

    showRemoveIgnore() {
        let text = `Would you like to remove ${this.username.text}\nfrom your ignore list?`

        this.interface.prompt.showWindow(text, 'dual', () => {
            this.network.send('ignore_remove', { id: this.id })

            this.interface.prompt.showWindow('Done', 'single')
        })
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
