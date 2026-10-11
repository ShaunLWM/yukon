/* START OF COMPILED CODE */

import BaseWidget from "../../../base/BaseWidget";
import DraggableContainer from "../../../components/DraggableContainer";
import Button from "../../../components/Button";
import BuddyItem from "./buddy_item/BuddyItem";
import ShowHint from "../../../components/ShowHint";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Buddy extends BaseWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 760, y ?? 480);

        /** @type {Phaser.GameObjects.Text} */
        this.text;
        /** @type {Phaser.GameObjects.Text} */
        this.total;
        /** @type {BuddyItem[]} */
        this.items;


        // card_bg
        const card_bg = scene.add.image(0, 0, "main", "card-bg");
        this.add(card_bg);

        // text
        const text = scene.add.text(0, -236, "", {});
        text.setOrigin(0.5, 0.5);
        text.text = "Your Friends";
        text.setStyle({ "align": "center", "color": "#000000", "fixedWidth":420,"fontFamily": "Arial Narrow", "fontSize": "32px" });
        this.add(text);

        // x_button
        const x_button = scene.add.image(177, -237, "main", "blue-button");
        this.add(x_button);

        // blue_x
        const blue_x = scene.add.image(177, -239, "main", "blue-x");
        this.add(blue_x);

        // buddy_scroll
        const buddy_scroll = scene.add.image(177, 14, "main", "buddy/scroll");
        this.add(buddy_scroll);

        // down_button
        const down_button = scene.add.image(177, 195, "main", "blue-button");
        this.add(down_button);

        // up_button
        const up_button = scene.add.image(177, -173, "main", "blue-button");
        this.add(up_button);

        // blue_arrow_1
        const blue_arrow_1 = scene.add.image(177, 193, "main", "blue-arrow");
        blue_arrow_1.flipY = true;
        this.add(blue_arrow_1);

        // blue_arrow
        const blue_arrow = scene.add.image(177, -175, "main", "blue-arrow");
        this.add(blue_arrow);

        // buddy_item_7
        const buddy_item_7 = new BuddyItem(scene, -26, 194);
        this.add(buddy_item_7);

        // buddy_item_6
        const buddy_item_6 = new BuddyItem(scene, -26, 142);
        this.add(buddy_item_6);

        // buddy_item_5
        const buddy_item_5 = new BuddyItem(scene, -26, 90);
        this.add(buddy_item_5);

        // buddy_item_4
        const buddy_item_4 = new BuddyItem(scene, -26, 38);
        this.add(buddy_item_4);

        // buddy_item_3
        const buddy_item_3 = new BuddyItem(scene, -26, -14);
        this.add(buddy_item_3);

        // buddy_item_2
        const buddy_item_2 = new BuddyItem(scene, -26, -66);
        this.add(buddy_item_2);

        // buddy_item_1
        const buddy_item_1 = new BuddyItem(scene, -26, -118);
        this.add(buddy_item_1);

        // buddy_item
        const buddy_item = new BuddyItem(scene, -26, -170);
        this.add(buddy_item);

        // buddy_button
        const buddy_button = scene.add.image(-90, 255, "main", "blue-button");
        this.add(buddy_button);

        // profile_button
        const profile_button = scene.add.image(-30, 255, "main", "blue-button");
        this.add(profile_button);

        // igloo_button
        const igloo_button = scene.add.image(30, 255, "main", "blue-button");
        this.add(igloo_button);

        // requests_button
        const requests_button = scene.add.image(90, 255, "main", "blue-button");
        this.add(requests_button);

        // buddies_icon_disabled
        const buddies_icon_disabled = scene.add.image(-90, 253, "main", "buddies-icon");
        this.add(buddies_icon_disabled);

        // help_icon_disabled
        const help_icon_disabled = scene.add.image(-30, 253, "main", "online-icon");
        this.add(help_icon_disabled);

        // igloo_icon_disabled
        const igloo_icon_disabled = scene.add.image(30, 253, "main", "ignore-icon");
        this.add(igloo_icon_disabled);

        // requests_icon
        const requests_icon = scene.add.image(90, 253, "main", "mail-icon");
        this.add(requests_icon);

        // total
        const total = scene.add.text(-132, 273, "", {});
        total.setOrigin(0.5, 0.5);
        total.setStyle({ "color": "#003366", "fixedWidth":100,"fixedHeight":64,"fontFamily": "Arial Narrow", "fontSize": "24px" });
        this.add(total);

        // search container
        const searchContainer = scene.add.container(0, -208);
        searchContainer.visible = false;
        this.add(searchContainer);

        const searchBg = scene.add.rectangle(0, 0, 320, 36, 0x003366, 0.3);
        searchBg.setStrokeStyle(1, 0x003366);
        searchContainer.add(searchBg);

        const searchText = scene.add.text(0, 0, "Search by username...", {});
        searchText.setOrigin(0.5, 0.5);
        searchText.setStyle({ "color": "#999999", "fontFamily": "Arial", "fontSize": "18px" });
        searchContainer.add(searchText);

        this.searchContainer = searchContainer;
        this.searchText = searchText;

        // search result container
        const searchResult = scene.add.container(0, 0);
        searchResult.visible = false;
        this.add(searchResult);

        const searchResultBg = scene.add.rectangle(0, 0, 360, 460, 0x000000, 0.7);
        searchResult.add(searchResultBg);

        const searchResultName = scene.add.text(0, -80, "", {});
        searchResultName.setOrigin(0.5, 0.5);
        searchResultName.setStyle({ "align": "center", "fontFamily": "Arial", "fontSize": "28px", "fontStyle": "bold" });
        searchResult.add(searchResultName);

        const searchResultStatus = scene.add.text(0, -40, "", {});
        searchResultStatus.setOrigin(0.5, 0.5);
        searchResultStatus.setStyle({ "align": "center", "color": "#aaaaaa", "fontFamily": "Arial", "fontSize": "20px" });
        searchResult.add(searchResultStatus);

        const searchAddBtn = scene.add.image(0, 20, "main", "blue-button");
        searchResult.add(searchAddBtn);
        const searchAddText = scene.add.text(0, 18, "Add Friend", {});
        searchAddText.setOrigin(0.5, 0.5);
        searchAddText.setStyle({ "fontFamily": "Arial", "fontSize": "16px" });
        searchResult.add(searchAddText);

        const searchCloseBtn = scene.add.image(0, 70, "main", "grey-button");
        searchResult.add(searchCloseBtn);
        const searchCloseText = scene.add.text(0, 68, "Close", {});
        searchCloseText.setOrigin(0.5, 0.5);
        searchCloseText.setStyle({ "fontFamily": "Arial", "fontSize": "16px" });
        searchResult.add(searchCloseText);

        const searchAddBtnButton = new Button(searchAddBtn);
        searchAddBtnButton.spriteName = "blue-button";
        searchAddBtnButton.callback = () => this.onSearchAdd();

        const searchCloseBtnButton = new Button(searchCloseBtn);
        searchCloseBtnButton.spriteName = "grey-button";
        searchCloseBtnButton.callback = () => { searchResult.visible = false; };

        this.searchResult = searchResult;
        this.searchResultName = searchResultName;
        this.searchResultStatus = searchResultStatus;
        this.searchAddBtn = searchAddBtn;
        this.searchAddText = searchAddText;
        this.searchResultId = null;

        // lists
        const items = [buddy_item, buddy_item_1, buddy_item_2, buddy_item_3, buddy_item_4, buddy_item_5, buddy_item_6, buddy_item_7];

        // this (components)
        const thisDraggableContainer = new DraggableContainer(this);
        thisDraggableContainer.handle = card_bg;

        // x_button (components)
        const x_buttonButton = new Button(x_button);
        x_buttonButton.spriteName = "blue-button";
        x_buttonButton.callback = () => this.close();

        // down_button (components)
        const down_buttonButton = new Button(down_button);
        down_buttonButton.spriteName = "blue-button";
        down_buttonButton.callback = () => this.nextPage();

        // up_button (components)
        const up_buttonButton = new Button(up_button);
        up_buttonButton.spriteName = "blue-button";
        up_buttonButton.callback = () => this.prevPage();

        // buddy_button (components)
        const buddy_buttonButton = new Button(buddy_button);
        buddy_buttonButton.spriteName = "blue-button";
        buddy_buttonButton.callback = () => this.switchList('buddies', 'Your Friends');
        const buddy_buttonShowHint = new ShowHint(buddy_button);
        buddy_buttonShowHint.text = "buddy_hint";

        // profile_button (components)
        const profile_buttonButton = new Button(profile_button);
        profile_buttonButton.spriteName = "blue-button";
        profile_buttonButton.callback = () => this.switchList('room', 'Users in Room');
        const profile_buttonShowHint = new ShowHint(profile_button);
        profile_buttonShowHint.text = "online_hint";

        // igloo_button (components)
        const igloo_buttonButton = new Button(igloo_button);
        igloo_buttonButton.spriteName = "blue-button";
        igloo_buttonButton.callback = () => this.switchList('ignores', 'Ignore List');
        const igloo_buttonShowHint = new ShowHint(igloo_button);
        igloo_buttonShowHint.text = "ignore_hint";

        // requests_button (components)
        const requests_buttonButton = new Button(requests_button);
        requests_buttonButton.spriteName = "blue-button";
        requests_buttonButton.callback = () => this.switchList('buddyRequests', 'Friend Requests');

        this.text = text;
        this.total = total;
        this.items = items;

        /* START-USER-CTR-CODE */

        this.listType = 'buddies'
        this.page = 1
        this.pageSize = 8

        this.searchContainer.setInteractive(
            new Phaser.Geom.Rectangle(-160, -18, 320, 36),
            Phaser.Geom.Rectangle.Contains
        )
        this.searchContainer.on('pointerdown', () => this.onSearchClick())

        this.showPage()

        /* END-USER-CTR-CODE */
    }


    /* START-USER-CODE */

    get penguins() {
        return this[this.listType]
    }

    get maxPage() {
        return Math.ceil(this.penguins.length / this.pageSize)
    }

    get buddies() {
        return this.world.client.buddies.sort((a, b) => {
            a.favorite ||= false
            b.favorite ||= false
            a.online ||= false
            b.online ||= false

            let score = p => p.online ? (p.favorite ? 4 : 3) : (p.favorite ? 1 : 0)
            let sa = score(a)
            let sb = score(b)
            if (sa !== sb) return sb - sa
            return a.username.toLowerCase().localeCompare(b.username.toLowerCase())
        })
    }

    /**
     * Gets the users in current room, sorted alphabetically.
     *
     * @readonly
     */
    get room() {
        let penguins = Object.values(this.world.room.penguins)

        return penguins.map(penguin => {
            // Map penguin to buddy item object
            return { id: penguin.id, username: penguin.username }
        }).sort((a, b) => {
            // Then sort by username
            return a.username.toLowerCase().localeCompare(b.username.toLowerCase())
        })
    }


    /**
     * Gets the client ignores array, sorted alphabetically.
     *
     * @readonly
     */
    get ignores() {
        return this.world.client.ignores.sort((a, b) => {
            return a.username.toLowerCase().localeCompare(b.username.toLowerCase())
        })
    }

    get buddyRequests() {
        return this.world.client.buddyRequests.sort((a, b) => {
            return a.username.toLowerCase().localeCompare(b.username.toLowerCase())
        })
    }

    show() {
        super.show()

        this.searchContainer.visible = (this.listType === 'buddies')
        this.searchResult.visible = false
        this.showPage()
    }

    showPage() {
        if (this.visible == false) return

        let page = this.penguins.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)

        for (let [index, item] of this.items.entries()) {
            let buddy = page[index]

            if (buddy) {
                item.setItem(buddy)
            } else {
                item.setItem(null)
            }
        }

        // Update total text
        if (this.listType == 'buddies' || this.listType == 'ignores') {
            this.total.text = `${this.world.client[this.listType].length}/100`
            this.total.visible = true
        } else {
            this.total.visible = false
        }


    }

    prevPage() {
        let page = this.page - 1
        if (page < 1) return

        this.page = page
        this.showPage()
    }

    nextPage() {
        let page = this.page + 1
        if (page > this.maxPage) return

        this.page = page
        this.showPage()
    }

    switchList(type, text) {
        this.page = 1
        this.text.text = text
        this.listType = type
        this.searchResult.visible = false
        this.searchContainer.visible = (type === 'buddies')
        this.showPage()
    }

    onSearchClick() {
        let search = prompt('Search for a penguin by username:')
        if (!search || search.trim().length < 3) return

        this.network.send('buddy_search', { search: search.trim() })
    }

    showSearchResult(penguin) {
        if (!penguin) {
            this.searchResult.visible = true
            this.searchResultName.text = 'Not Found'
            this.searchResultStatus.text = 'No penguin with that username.'
            this.searchAddBtn.visible = false
            this.searchAddText.visible = false
            this.searchResultId = null
            return
        }

        this.searchResult.visible = true
        this.searchResultName.text = penguin.username
        this.searchResultId = penguin.id

        if (penguin.isBuddy) {
            this.searchResultStatus.text = 'Already your friend!'
            this.searchAddBtn.visible = false
            this.searchAddText.visible = false
        } else {
            this.searchResultStatus.text = 'Send a friend request?'
            this.searchAddBtn.visible = true
            this.searchAddText.visible = true
        }
    }

    onSearchAdd() {
        if (!this.searchResultId) return
        this.network.send('buddy_request', { id: this.searchResultId })
        this.searchResultStatus.text = 'Request sent!'
        this.searchAddBtn.visible = false
        this.searchAddText.visible = false
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
