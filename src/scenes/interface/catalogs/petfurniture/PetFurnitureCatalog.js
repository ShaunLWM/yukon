import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Interactive } from '@components/components'


export default class PetFurnitureCatalog extends BaseDynamicWidget {

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
        page4.add(scene.add.image(760, 480, 'new-petfurniture', 'p5'))

        const page3 = scene.add.container(0, 0)
        page3.visible = false
        this.add(page3)
        page3.add(scene.add.image(760, 480, 'new-petfurniture', 'p3'))

        const page2 = scene.add.container(0, 0)
        page2.visible = false
        this.add(page2)
        page2.add(scene.add.image(760, 480, 'new-petfurniture', 'p2'))

        const page1 = scene.add.container(0, 0)
        this.add(page1)
        page1.add(scene.add.image(760, 480, 'new-petfurniture', 'p1'))

        this.pages = [page1, page2, page3, page4]

        new Interactive(block)
        block.on('pointerup', () => {
            if (this.page < this.pages.length - 1) this.nextPage()
            else this.close()
        })
    }

    showPage(page) {
        this.pages[this.page].visible = false
        this.page = page
        this.pages[this.page].visible = true
    }

    nextPage() {
        if (this.page < this.pages.length - 1) this.showPage(this.page + 1)
    }

    prevPage() {
        if (this.page > 0) this.showPage(this.page - 1)
        else this.close()
    }

}
