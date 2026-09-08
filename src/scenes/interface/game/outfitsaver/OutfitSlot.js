import PaperDoll from '../playercard/paperdoll/PaperDoll'
import { SimpleButton } from '@components/components'


export default class OutfitSlot extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        // Matches CPJ: slotBackground and paperDoll at (760, 480) relative to slot container
        const slotBackground = scene.add.nineslice(760, 480, 'main', 'large-box', 177, 177, 13, 17, 14, 13)
        this.add(slotBackground)

        const paperDoll = new PaperDoll(scene, 760, 480)
        paperDoll.scaleX = 0.4
        paperDoll.scaleY = 0.4
        this.add(paperDoll)

        const nameLabel = scene.add.text(760, 552, '', {
            align: 'center',
            color: '#ffffff',
            fixedWidth: 165,
            fixedHeight: 24,
            fontFamily: 'Burbank Small',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        })
        nameLabel.setOrigin(0.5, 0.5)
        nameLabel.visible = false
        this.add(nameLabel)

        const slotBgButton = new SimpleButton(slotBackground)
        slotBgButton.callback = () => this.onSlotClick()

        this.slotBackground = slotBackground
        this.paperDoll = paperDoll
        this.nameLabel = nameLabel
        this.slotID = 0
    }

    onSlotClick() {
        // parentContainer = page container, its parent = Outfitsaver
        this.parentContainer.parentContainer.selectSlot(this)
    }

}
