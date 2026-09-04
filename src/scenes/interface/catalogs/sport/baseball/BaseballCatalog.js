import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive } from '@components/components'


export default class BaseballCatalog extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        this.page = 0

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const page3 = scene.add.container(0, 0)
        page3.visible = false
        this.add(page3)
        page3.add(scene.add.image(760, 480, 'apr24-sport', 'bg_three'))

        const page2 = scene.add.container(0, 0)
        page2.visible = false
        this.add(page2)
        page2.add(scene.add.image(760, 480, 'apr24-sport', 'bg_two'))

        const page1 = scene.add.container(0, 0)
        this.add(page1)
        page1.add(scene.add.image(760, 480, 'apr24-sport', 'bg_one'))

        const backBtn = scene.add.image(200, 60, 'apr24-sport', 'bg_back')
        backBtn.visible = false
        this.add(backBtn)

        this.pages = [page1, page2, page3]
        this.backBtn = backBtn

        new Interactive(block)

        const backBtnButton = new Button(backBtn)
        backBtnButton.spriteName = 'bg_back'
        backBtnButton.callback = () => this.prevPage()

        block.on('pointerup', () => {
            if (this.page < this.pages.length - 1) this.nextPage()
            else this.close()
        })
    }

    showPage(page) {
        this.pages[this.page].visible = false
        this.page = page
        this.pages[this.page].visible = true
        this.backBtn.visible = this.page > 0
    }

    nextPage() {
        if (this.page < this.pages.length - 1) this.showPage(this.page + 1)
    }

    prevPage() {
        if (this.page > 0) this.showPage(this.page - 1)
        else this.close()
    }

}
