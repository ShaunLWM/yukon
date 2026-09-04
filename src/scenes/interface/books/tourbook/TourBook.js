import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive } from '@components/components'


export default class TourBook extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        this.page = 0

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const page2 = scene.add.container(0, 0)
        page2.visible = false
        this.add(page2)
        page2.add(scene.add.image(760, 480, 'tour-book', 'pg3_tour'))

        const page1 = scene.add.container(0, 0)
        this.add(page1)
        page1.add(scene.add.image(760, 480, 'tour-book', 'pg2_book'))

        this.pages = [page1, page2]

        const buttons = scene.add.container(0, 0)
        this.add(buttons)

        const closeRight = scene.add.image(1090, 50, 'tour-pageturns', 'closeRight')
        buttons.add(closeRight)

        const pageRight = scene.add.image(1090, 480, 'tour-pageturns', 'pageRight')
        buttons.add(pageRight)

        const pageLeft = scene.add.image(430, 480, 'tour-pageturns', 'pageLeft')
        pageLeft.visible = false
        buttons.add(pageLeft)

        this.pageRight = pageRight
        this.pageLeft = pageLeft

        new Interactive(block)

        const closeBtn = new Button(closeRight)
        closeBtn.spriteName = 'closeRight'
        closeBtn.callback = () => this.close()

        const rightBtn = new Button(pageRight)
        rightBtn.spriteName = 'pageRight'
        rightBtn.callback = () => this.nextPage()

        const leftBtn = new Button(pageLeft)
        leftBtn.spriteName = 'pageLeft'
        leftBtn.callback = () => this.prevPage()
    }

    showPage(page) {
        this.pages[this.page].visible = false
        this.page = page
        this.pages[this.page].visible = true
        this.pageLeft.visible = this.page > 0
        this.pageRight.visible = this.page < this.pages.length - 1
    }

    nextPage() {
        if (this.page < this.pages.length - 1) this.showPage(this.page + 1)
    }

    prevPage() {
        if (this.page > 0) this.showPage(this.page - 1)
    }

}
