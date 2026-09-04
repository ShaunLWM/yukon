import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Interactive } from '@components/components'


export default class TourPrompt extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const prompt = scene.add.image(760, 480, 'tourprompt', 'tour_prompt')
        this.add(prompt)

        new Interactive(block)
        block.on('pointerup', () => this.close())
    }

}
