import BaseContainer from '@scenes/base/BaseContainer'
import { Button } from '@components/components'


export default class BroadcastPrompt extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 760, y ?? 480)

        const container = scene.add.container(0, -186)
        this.add(container)

        const bg = scene.add.image(-760, -435, 'main-broadcast', 'developer')
        bg.setOrigin(0, 0)
        container.add(bg)

        const title = scene.add.text(-602, -429, '', {})
        title.text = 'Message from the Developers'
        title.setStyle({
            color: '#f3f3f3ff',
            fontFamily: 'Burbank Small',
            fontSize: '30px',
            fontStyle: 'bold',
            stroke: '#000',
            'shadow.offsetY': 3,
            'shadow.color': '#0000007a',
            'shadow.fill': true
        })
        title.setPadding({ left: 10, top: 10, right: 10, bottom: 10 })
        title.setWordWrapWidth(1110)
        container.add(title)

        const text = scene.add.text(-588, -375, '', {})
        text.setStyle({
            color: '#f3f3f3ff',
            fixedWidth: 1300,
            fixedHeight: 65,
            fontFamily: 'Burbank Small',
            fontSize: '24px',
            maxLines: 2,
            stroke: '#000',
            'shadow.offsetY': 2,
            'shadow.color': '#0000007a',
            'shadow.fill': true
        })
        text.setLineSpacing(2)
        text.setWordWrapWidth(1200)
        container.add(text)

        const orangeBtn = scene.add.image(712, -401, 'main-broadcast', 'orange-button')
        container.add(orangeBtn)
        const orangeX = scene.add.image(712, -403, 'main-broadcast', 'orange-x')
        container.add(orangeX)

        const blueBtn = scene.add.image(712, -401, 'main', 'blue-button')
        blueBtn.visible = false
        container.add(blueBtn)
        const blueX = scene.add.image(712, -403, 'main', 'blue-x')
        blueX.visible = false
        container.add(blueX)

        const orangeBtnButton = new Button(orangeBtn)
        orangeBtnButton.spriteName = 'orange-button'
        orangeBtnButton.callback = () => this.onExit()
        orangeBtnButton.activeFrame = true

        const blueBtnButton = new Button(blueBtn)
        blueBtnButton.spriteName = 'blue-button'
        blueBtnButton.callback = () => this.onExit()
        blueBtnButton.activeFrame = true

        this.broadcastContainer = container
        this.bg = bg
        this.broadcastTitle = title
        this.broadcastText = text
        this.closebtn_orange = orangeBtn
        this.orange_x = orangeX
        this.closebtn_blue = blueBtn
        this.blue_x = blueX
        this.broadcastPlaying = false

        this.visible = false
    }

    show(message, mode) {
        if (this.broadcastPlaying) return

        switch (mode) {
            case 'eventalert':
                this.broadcastTitle.text = 'Community Event Happening Now!'
                this.bg.setTexture('main-broadcast', 'community')
                this.orange_x.visible = false
                this.closebtn_orange.visible = false
                this.blue_x.visible = true
                this.closebtn_blue.visible = true
                break
            case 'devalert':
            default:
                this.broadcastTitle.text = 'Message from the Developers'
                this.bg.setTexture('main-broadcast', 'developer')
                this.orange_x.visible = true
                this.closebtn_orange.visible = true
                this.blue_x.visible = false
                this.closebtn_blue.visible = false
                break
        }

        this.broadcastPlaying = true
        this.broadcastText.text = message
        this.visible = true
        this.broadcastText.x = -588
        this.playAlertIn()
    }

    playAlertIn() {
        this.scene.tweens.add({
            targets: this.broadcastContainer,
            y: { from: -186, to: -38 },
            duration: 870,
            ease: 'Expo.InOut',
            onComplete: () => {
                this.broadcastPlaying = false
            }
        })
    }

    onExit() {
        if (this.broadcastPlaying) return

        this.broadcastPlaying = true
        this.scene.tweens.add({
            targets: this.broadcastContainer,
            y: { from: -38, to: -186 },
            duration: 870,
            ease: 'Expo.InOut',
            onComplete: () => {
                this.visible = false
                this.broadcastPlaying = false
            }
        })
    }

    close() {
        this.visible = false
        this.broadcastPlaying = false
    }

}
