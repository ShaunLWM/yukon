import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive } from '@components/components'


export default class Library extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const bg = scene.add.image(760, 480, 'library', 'bg')
        this.add(bg)

        const shelf = scene.add.image(760, 480, 'library', 'shelf')
        this.add(shelf)

        const leftCandle = scene.add.image(200, 300, 'library', 'left_candle_holder')
        this.add(leftCandle)

        const rightCandle = scene.add.image(1320, 300, 'library', 'right_candle_holder')
        this.add(rightCandle)

        const purpleBook = scene.add.image(760, 400, 'library', 'purple_book')
        this.add(purpleBook)

        new Interactive(block)

        const purpleBookButton = new Button(purpleBook)
        purpleBookButton.spriteName = 'purple_book'
        purpleBookButton.callback = () => this.close()
        purpleBookButton.activeFrame = false
    }

}
