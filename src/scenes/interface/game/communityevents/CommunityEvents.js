import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive } from '@components/components'


export default class CommunityEvents extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        const block = scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)

        const bg = scene.add.image(760, 480, 'communityevents', 'noticeboard')
        this.add(bg)

        const pageTurn = scene.add.image(760, 850, 'communityevents', 'ce-pageturn')
        this.add(pageTurn)

        new Interactive(block)

        const turn = new Button(pageTurn)
        turn.spriteName = 'ce-pageturn'
        turn.callback = () => this.close()

        block.on('pointerup', () => this.close())
    }

}
