import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive } from '@components/components'


export default class NinjaCatalog extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        this.page = 0

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const page4 = scene.add.container(0, 0)
        page4.visible = false
        this.add(page4)
        const p4 = scene.add.image(760, 480, 'ninjacatalog', 'page0012')
        page4.add(p4)

        const page3 = scene.add.container(0, 0)
        page3.visible = false
        this.add(page3)
        const p3 = scene.add.image(760, 480, 'ninjacatalog', 'page0003')
        page3.add(p3)

        const page2 = scene.add.container(0, 0)
        page2.visible = false
        this.add(page2)
        const p2 = scene.add.image(760, 480, 'ninjacatalog', 'page0002')
        page2.add(p2)

        const page1 = scene.add.container(0, 0)
        this.add(page1)
        const p1 = scene.add.image(760, 480, 'ninjacatalog', 'page0001')
        page1.add(p1)

        const turnRight = scene.add.image(1200, 480, 'ninjacatalog', 'turn0001')
        page1.add(turnRight)

        const closeBtn = scene.add.image(1400, 60, 'ninjacatalog', 'close')
        this.add(closeBtn)

        const backClose = scene.add.image(100, 60, 'ninjacatalog', 'back_close')
        backClose.visible = false
        this.add(backClose)

        this.pages = [page1, page2, page3, page4]
        this.closeBtn = closeBtn
        this.backClose = backClose

        new Interactive(block)

        const closeBtnButton = new Button(closeBtn)
        closeBtnButton.spriteName = 'close'
        closeBtnButton.callback = () => this.close()

        const backCloseButton = new Button(backClose)
        backCloseButton.spriteName = 'back_close'
        backCloseButton.callback = () => this.prevPage()
        backCloseButton.activeFrame = false

        const turnRightButton = new Button(turnRight)
        turnRightButton.spriteName = 'turn0001'
        turnRightButton.callback = () => this.nextPage()
        turnRightButton.activeFrame = false
    }

    showPage(page) {
        this.pages[this.page].visible = false
        this.page = page
        this.pages[this.page].visible = true
        this.backClose.visible = this.page > 0
    }

    nextPage() {
        if (this.page < this.pages.length - 1) this.showPage(this.page + 1)
    }

    prevPage() {
        if (this.page > 0) this.showPage(this.page - 1)
    }

}
