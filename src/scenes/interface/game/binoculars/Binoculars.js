import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Interactive } from '@components/components'


export default class Binoculars extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const blackspace = scene.add.image(760, 480, 'binoculars-cove', 'blackspace')
        this.add(blackspace)

        const blue = scene.add.image(760, 480, 'binoculars-cove', 'blue0001')
        this.add(blue)

        const interactive = new Interactive(block)
        block.on('pointerup', () => this.close())
    }

}
