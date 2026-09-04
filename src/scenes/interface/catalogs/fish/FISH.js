import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive } from '@components/components'


export default class FISH extends BaseDynamicWidget {

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
        page4.add(scene.add.image(760, 480, 'fish-catalog', 'pg11'))

        const page3 = scene.add.container(0, 0)
        page3.visible = false
        this.add(page3)
        page3.add(scene.add.image(760, 480, 'fish-catalog', 'pg10'))

        const page2 = scene.add.container(0, 0)
        page2.visible = false
        this.add(page2)
        page2.add(scene.add.image(760, 480, 'fish-catalog', 'pg6'))

        const page1 = scene.add.container(0, 0)
        this.add(page1)
        page1.add(scene.add.image(760, 480, 'fish-catalog', 'pg1'))

        const frontTurn = scene.add.image(1200, 700, 'fish-catalog', 'front-turn')
        page1.add(frontTurn)

        const pgTurn = scene.add.image(1200, 700, 'fish-catalog', 'pg-turn')
        pgTurn.visible = false
        this.add(pgTurn)

        this.pages = [page1, page2, page3, page4]
        this.pgTurn = pgTurn

        new Interactive(block)

        const frontTurnButton = new Button(frontTurn)
        frontTurnButton.spriteName = 'front-turn'
        frontTurnButton.callback = () => this.nextPage()
        frontTurnButton.activeFrame = false

        const pgTurnButton = new Button(pgTurn)
        pgTurnButton.spriteName = 'pg-turn'
        pgTurnButton.callback = () => this.nextPage()
        pgTurnButton.activeFrame = false
    }

    showPage(page) {
        this.pages[this.page].visible = false
        this.page = page
        this.pages[this.page].visible = true

        this.pgTurn.visible = this.page > 0 && this.page < this.pages.length - 1

        if (this.page === this.pages.length - 1) {
            this.pgTurn.visible = false
        }
    }

    nextPage() {
        if (this.page < this.pages.length - 1) this.showPage(this.page + 1)
        else this.close()
    }

}
