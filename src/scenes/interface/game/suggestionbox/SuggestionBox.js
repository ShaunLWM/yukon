import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive } from '@components/components'


export default class SuggestionBox extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const btn = scene.add.image(760, 480, 'blue_btn_large', 'blue_btn_large')
        this.add(btn)

        new Interactive(block)

        const closeBtn = new Button(btn)
        closeBtn.spriteName = 'blue_btn_large'
        closeBtn.callback = () => this.close()

        block.on('pointerup', () => this.close())
    }

}
