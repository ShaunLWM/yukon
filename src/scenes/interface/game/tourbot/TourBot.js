import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Interactive } from '@components/components'


export default class TourBot extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const bg = scene.add.image(760, 480, 'tourbot', 'tourbot-bg')
        this.add(bg)

        const bubble = scene.add.image(760, 300, 'tourbot', 'tourbot-bubble')
        this.add(bubble)

        new Interactive(block)
        block.on('pointerup', () => this.close())
    }

}
