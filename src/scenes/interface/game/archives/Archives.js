import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive } from '@components/components'


export default class Archives extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const bg = scene.add.image(760, 480, 'archives', 'bg')
        this.add(bg)

        const newspaper = scene.add.image(760, 480, 'archives', 'newspaper')
        this.add(newspaper)

        const front = scene.add.image(760, 480, 'archives', 'front')
        this.add(front)

        const closeBtn = scene.add.image(1140, 50, 'archives', 'closebtn')
        this.add(closeBtn)

        new Interactive(block)

        const close = new Button(closeBtn)
        close.spriteName = 'closebtn'
        close.callback = () => this.close()
    }

}
