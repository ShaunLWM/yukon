import Plugin from '../Plugin'


export default class OutfitLoader extends Plugin {

    constructor(network) {
        super(network)
        this.events = {
            'slot': this.slotLoad,
        }
    }

    slotLoad(args) {
        let outfitsaver = this.interface.main.playerCard.outfitsaver
        if (!outfitsaver) return

        let outfits = Array.isArray(args) ? args : args.outfits
        outfitsaver.setOutfits(outfits)
    }

}
