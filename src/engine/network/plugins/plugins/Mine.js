import Plugin from '../Plugin'


export default class Mine extends Plugin {

    constructor(network) {
        super(network)

        this.events = {
            'mine_coins': this.mineCoins
        }

        this.mineRooms = [813, 805]
    }

    mineCoins(args) {
        if (this.mineRooms.includes(this.world.room.id)) {
            this.world.client.coins += args.coins
            this.world.room.showCoinRewardToPlayer(this.world.client.penguin, args.coins)
        }
    }

}
