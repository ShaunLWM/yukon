import Plugin from '../Plugin'


export default class Mine extends Plugin {

    constructor(network) {
        super(network)

        this.events = {
            'mine_coins': this.mineCoins,
            'job_coins': this.jobCoins,
            'update_coins': this.updateCoins
        }

        this.mineRooms = [813, 805]
        this.jobRooms = [330, 110, 310, 809, 890]
    }

    mineCoins(args) {
        if (this.mineRooms.includes(this.world.room.id)) {
            this.world.client.coins += args.coins
            this.world.room.showCoinRewardToPlayer(this.world.client.penguin, args.coins)
        }
    }

    jobCoins(args) {
        this.world.client.coins += args.coins
        if (this.jobRooms.includes(this.world.room.id)) {
            this.world.room.work?.showCoinRewardToPlayer(this.world.client.penguin, args.coins)
        }
    }

    updateCoins(args) {
        this.world.client.coins = args.coins
    }

}
