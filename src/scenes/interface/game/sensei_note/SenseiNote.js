import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive } from '@components/components'


export default class SenseiNote extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        const block = scene.add.rectangle(0, 0, 1520, 960)
        block.setOrigin(0, 0)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const bg = scene.add.image(352, 159, 'sensei_note', 'bg')
        bg.setOrigin(0, 0)
        this.add(bg)

        const closeBtn = scene.add.image(1117, 173, 'sensei_note', 'close')
        closeBtn.setOrigin(0, 0)
        this.add(closeBtn)

        new Interactive(block)

        const close = new Button(closeBtn)
        close.spriteName = 'close'
        close.callback = () => this.close()
        close.pixelPerfect = true
        close.activeFrame = true
    }

}
