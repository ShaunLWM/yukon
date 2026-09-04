import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive } from '@components/components'


export default class MusicCatalog extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const bg = scene.add.image(760, 480, 'musiccatalog', 'bg')
        this.add(bg)

        const instruments = scene.add.image(760, 480, 'musiccatalog', 'instruments')
        this.add(instruments)

        const closeBtn = scene.add.image(1140, 72, 'musiccatalog', 'closebtn')
        this.add(closeBtn)

        new Interactive(block)

        const closeBtnButton = new Button(closeBtn)
        closeBtnButton.spriteName = 'closebtn'
        closeBtnButton.callback = () => this.close()
    }

}
