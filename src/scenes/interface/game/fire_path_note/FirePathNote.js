import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive } from '@components/components'


export default class FirePathNote extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const bg = scene.add.image(760, 480, 'fire_path_note', 'bg')
        this.add(bg)

        const button = scene.add.image(760, 700, 'fire_path_note', 'button')
        this.add(button)

        const closeBtn = scene.add.image(1140, 50, 'fire_path_note', 'close')
        this.add(closeBtn)

        new Interactive(block)

        const btn = new Button(button)
        btn.spriteName = 'button'
        btn.callback = () => this.close()

        const close = new Button(closeBtn)
        close.spriteName = 'close'
        close.callback = () => this.close()
    }

}
