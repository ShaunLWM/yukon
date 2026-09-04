import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive } from '@components/components'


export default class CoveCatalog extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const bg = scene.add.image(760, 480, 'covecatalog', 'cove')
        this.add(bg)

        const secretPage = scene.add.container(0, 0)
        secretPage.visible = false
        this.add(secretPage)
        secretPage.add(scene.add.image(760, 480, 'covecatalog', 'secret'))
        const secretClose = scene.add.image(1140, 50, 'covecatalog', 'secretclosebtn')
        secretPage.add(secretClose)
        this.secretPage = secretPage

        const surfboard = scene.add.image(760, 700, 'covecatalog', 'surfboard')
        this.add(surfboard)

        const closeBtn = scene.add.image(1140, 50, 'covecatalog', 'closebtn')
        this.add(closeBtn)

        new Interactive(block)

        const close = new Button(closeBtn)
        close.spriteName = 'closebtn'
        close.callback = () => this.close()

        const surfBtn = new Button(surfboard)
        surfBtn.spriteName = 'surfboard'
        surfBtn.callback = () => {
            this.secretPage.visible = true
        }
        surfBtn.activeFrame = false

        const sClose = new Button(secretClose)
        sClose.spriteName = 'secretclosebtn'
        sClose.callback = () => {
            this.secretPage.visible = false
        }
    }

}
