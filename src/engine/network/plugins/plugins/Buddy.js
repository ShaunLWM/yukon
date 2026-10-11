import Plugin from '../Plugin'


export default class Buddy extends Plugin {

    constructor(network) {
        super(network)
        this.events = {
            'buddy_request': this.buddyRequest,
            'buddy_accept': this.buddyAccept,
            'buddy_reject': this.buddyReject,
            'buddy_remove': this.buddyRemove,
            'buddy_find': this.buddyFind,
            'buddy_online': this.buddyOnline,
            'buddy_offline': this.buddyOffline,
            'buddy_favorite': this.buddyFavorite,
            'buddy_search': this.buddySearch
        }
    }

    buddyRequest(args) {
        args.seen = 0
        this.world.client.buddyRequests.push(args)
        this.interface.buddyRequest()
    }

    buddyAccept(args) {
        this.world.client.buddyRequests = this.world.client.buddyRequests.filter(r => r.id != args.id)

        if (args.requester) {
            this.interface.main.addRequest(args)
        }

        let { requester, ...buddy } = args

        this.world.client.buddies.push(buddy)
        this.interface.updateBuddies()

        if (args.online) {
            this.interface.main.showOnlinePopup(buddy.username)

            let roomPenguin = this.world.room.penguins[buddy.id]
            if (roomPenguin) {
                this.world.client.penguin.penguinLoader.addBuddyRing(roomPenguin)
            }
        }
    }

    buddyReject(args) {
        this.world.client.buddyRequests = this.world.client.buddyRequests.filter(r => r.id != args.id)
        this.interface.updateBuddies()
    }

    buddyRemove(args) {
        this.world.client.buddies = this.world.client.buddies.filter(obj => obj.id != args.id)
        this.world.client.buddyRequests = this.world.client.buddyRequests.filter(r => r.id != args.id)
        this.interface.updateBuddies()

        let roomPenguin = this.world.room.penguins[args.id]
        if (roomPenguin) {
            this.world.client.penguin.penguinLoader.addRing(roomPenguin, true)
            this.world.client.penguin.penguinLoader.removeBuddyRing(roomPenguin)
        }
    }

    buddyFind(args) {
        let username = this.interface.main.playerCard.username.text
        let id = this.interface.main.playerCard.id

        let name = this.getRoomName(args, id)

        this.interface.prompt.showWindow(`${username} ${this.getString(`${name}_find`)}`, 'single')
    }

    buddyOnline(args) {
        let buddy = this.world.client.buddies.find(obj => obj.id == args.id)
        if (!buddy) return

        buddy.online = true

        if (this.interface.main.scene.isActive()) {
            this.interface.updateBuddies()
            this.interface.main.showOnlinePopup(buddy.username)
        }
    }

    buddyOffline(args) {
        let buddy = this.world.client.buddies.find(obj => obj.id == args.id)

        if (buddy) {
            buddy.online = false
            this.interface.updateBuddies()
        }
    }

    buddyFavorite(args) {
        let buddy = this.world.client.buddies.find(obj => obj.id == args.id)
        if (buddy) {
            buddy.favorite = args.favorite
            this.interface.updateBuddies()
        }
    }

    buddySearch(args) {
        let buddyWidget = this.interface.main.buddy
        if (buddyWidget) {
            buddyWidget.showSearchResult(args.penguin)
        }
    }

    getRoomName(args, userId) {
        if (!args.igloo && !args.game) {
            return this.crumbs.rooms[args.find].key
        }

        if (args.game) {
            return this.crumbs.games[args.find].key
        }

        let iglooUserId = args.find - this.crumbs.iglooIdOffset

        if (iglooUserId == userId) {
            return 'igloo_theirs'
        }

        if (iglooUserId == this.world.client.id) {
            return 'igloo_yours'
        }

        return 'igloo'
    }

}
