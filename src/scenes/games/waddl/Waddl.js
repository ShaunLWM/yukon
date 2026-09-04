import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'
import { Interactive } from '@components/components'


export default class Waddl extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const bg = scene.add.image(760, 480, 'waddl', 'help-bg')
        this.add(bg)

        const logo = scene.add.image(760, 300, 'waddl', 'waddl-logo')
        this.add(logo)

        const interactive = new Interactive(block)
        interactive.callback = () => this.close()
    }

}
