import BaseContainer from '@scenes/base/BaseContainer'
import { Animation, Interactive, Button } from '@components/components'
import UnlockSlot from './UnlockSlot'


export default class UnlockCode extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 760, y ?? 480)

        // bg
        const bg = scene.add.image(-759, -479, 'load', 'bg')
        bg.setOrigin(0, 0)
        this.add(bg)

        // radial
        const radial = scene.add.image(0, 0, 'unlock', 'radial')
        this.add(radial)

        // choose_view
        const choose_view = scene.add.container(0, -138)
        this.add(choose_view)

        // closed book
        const closed = scene.add.image(0, 0, 'unlock', 'closed')
        closed.scaleX = 0.95
        closed.scaleY = 0.95
        choose_view.add(closed)

        // stuffbg
        const stuffbg = scene.add.image(0, 356, 'unlock', 'stuffbg')
        choose_view.add(stuffbg)

        // code_view
        const code_view = scene.add.container(0, 387)
        choose_view.add(code_view)

        // input background
        const inputbg = scene.add.image(0, -25, 'unlock', 'input')
        code_view.add(inputbg)

        // "Enter your code" text
        const enteryourcode = scene.add.text(0, -101, '', {})
        enteryourcode.setOrigin(0.5, 0.5)
        enteryourcode.text = 'Enter your code!\nMake sure you enter it exactly as it appears.'
        enteryourcode.setStyle({ align: 'center', color: '#ffffffff', fontFamily: 'Burbank Small', fontSize: '20px', fontStyle: 'bold', 'shadow.offsetX': 2, 'shadow.offsetY': 2, 'shadow.color': '#00000089', 'shadow.stroke': true, 'shadow.fill': true })
        code_view.add(enteryourcode)

        // confirm button
        const confirmBtn = scene.add.image(0, 47, 'unlock', 'btn-small')
        confirmBtn.scaleX = 0.8
        confirmBtn.scaleY = 0.8
        code_view.add(confirmBtn)

        const nexttxt = scene.add.text(0, 46, '', {})
        nexttxt.setOrigin(0.5, 0.5)
        nexttxt.text = 'Next'
        nexttxt.setStyle({ align: 'center', color: '#ffffffff', fontFamily: 'Burbank Small', fontSize: '25px', fontStyle: 'bold', 'shadow.offsetX': 2, 'shadow.offsetY': 2, 'shadow.color': '#00000089', 'shadow.stroke': true, 'shadow.fill': true })
        code_view.add(nexttxt)

        // spinner
        const spinnerImg = scene.add.image(0, 351, 'main', 'spinner')
        spinnerImg.visible = false
        choose_view.add(spinnerImg)

        // congrats_view
        const congrats_view = scene.add.container(0, 194)
        congrats_view.visible = false
        this.add(congrats_view)

        const open_back = scene.add.image(8, -428, 'unlock', 'open/back')
        congrats_view.add(open_back)

        const particles = scene.add.sprite(3, -306, 'unlock', 'open/particles0001')
        congrats_view.add(particles)

        const open_shine = scene.add.image(44, -497, 'unlock', 'open/shine')
        congrats_view.add(open_shine)

        const slots = scene.add.container(0, -112)
        congrats_view.add(slots)

        const open_front = scene.add.image(0, 0, 'unlock', 'open/front')
        congrats_view.add(open_front)

        const stuffbg_1 = scene.add.nineslice(2, -32, 'unlock', 'stuffbg', 550, 200, 32, 30, 29, 30)
        congrats_view.add(stuffbg_1)

        // "Enter another code" button
        const enteranothercode = scene.add.image(-126, 110, 'unlock', 'btn-large')
        enteranothercode.scaleX = 0.8
        enteranothercode.scaleY = 0.8
        congrats_view.add(enteranothercode)

        // "Done" button
        const playnoww = scene.add.image(128, 110, 'unlock', 'btn-large')
        playnoww.scaleX = 0.8
        playnoww.scaleY = 0.8
        congrats_view.add(playnoww)

        const enteranothercodee = scene.add.text(-126, 109, '', {})
        enteranothercodee.setOrigin(0.5, 0.5)
        enteranothercodee.text = 'Enter another code'
        enteranothercodee.setStyle({ color: '#ffffffff', fontFamily: 'Burbank Small', fontSize: '20px', fontStyle: 'bold', 'shadow.offsetX': 2, 'shadow.offsetY': 2, 'shadow.color': '#00000089', 'shadow.stroke': true, 'shadow.fill': true })
        congrats_view.add(enteranothercodee)

        const playnow = scene.add.text(128, 109, '', {})
        playnow.setOrigin(0.5, 0.5)
        playnow.text = 'Done'
        playnow.setStyle({ color: '#ffffffff', fontFamily: 'Burbank Small', fontSize: '20px', fontStyle: 'bold', 'shadow.offsetX': 2, 'shadow.offsetY': 2, 'shadow.color': '#00000089', 'shadow.stroke': true, 'shadow.fill': true })
        congrats_view.add(playnow)

        const congratulationsss = scene.add.text(0, -53, '', {})
        congratulationsss.setOrigin(0.5, 0.5)
        congratulationsss.text = 'Congratulations!'
        congratulationsss.setStyle({ color: '#ffffffff', fontFamily: 'Burbank Small', fontSize: '40px', fontStyle: 'bold', 'shadow.offsetX': 2, 'shadow.offsetY': 2, 'shadow.color': '#00000089', 'shadow.stroke': true, 'shadow.fill': true })
        congrats_view.add(congratulationsss)

        // x button
        const x_button = scene.add.image(710, -431, 'main', 'blue-button')
        this.add(x_button)

        const blue_x = scene.add.image(711, -433, 'main', 'blue-x')
        this.add(blue_x)

        // unlock icon
        const unlockicon = scene.add.image(-640, -369, 'unlock', 'unlockicon')
        this.add(unlockicon)

        // Components
        new Interactive(bg)

        const confirmBtnButton = new Button(confirmBtn)
        confirmBtnButton.spriteName = 'btn-small'
        confirmBtnButton.callback = () => this.onUnlock()

        const particlesAnimation = new Animation(particles)
        particlesAnimation.key = 'open/particles'
        particlesAnimation.end = 30
        particlesAnimation.autoPlay = false

        const enteranothercodeButton = new Button(enteranothercode)
        enteranothercodeButton.spriteName = 'btn-large'
        enteranothercodeButton.callback = () => this.newCode()
        enteranothercodeButton.activeFrame = true

        const playnowwButton = new Button(playnoww)
        playnowwButton.spriteName = 'btn-large'
        playnowwButton.callback = () => this.hide()
        playnowwButton.activeFrame = true

        const x_buttonButton = new Button(x_button)
        x_buttonButton.spriteName = 'blue-button'
        x_buttonButton.callback = () => this.hide()
        x_buttonButton.activeFrame = true

        this.code_view = code_view
        this.spinnerImg = spinnerImg
        this.choose_view = choose_view
        this.particles = particles
        this.congrats_view = congrats_view
        this.slots = slots

        this.tweenSpots = {
            '1': { '1': { x: 0 } },
            '2': { '1': { x: -80 }, '2': { x: 80 } },
            '3': { '1': { x: -150 }, '2': { x: 0 }, '3': { x: 150 } },
            '4': { '1': { x: -225 }, '2': { x: -75 }, '3': { x: 75 }, '4': { x: 225 } },
            '5': { '1': { x: -150, y: -375 }, '2': { x: 0, y: -375 }, '3': { x: 150, y: -375 }, '4': { x: -80 }, '5': { x: 80 } },
            '6': { '1': { x: -150, y: -375 }, '2': { x: 0, y: -375 }, '3': { x: 150, y: -375 }, '4': { x: -150 }, '5': { x: 0 }, '6': { x: 150 } },
            '7': { '1': { x: -225, y: -375 }, '2': { x: -75, y: -375 }, '3': { x: 75, y: -375 }, '4': { x: 225, y: -375 }, '5': { x: -150 }, '6': { x: 0 }, '7': { x: 150 } },
            '8': { '1': { x: -225, y: -375 }, '2': { x: -75, y: -375 }, '3': { x: 75, y: -375 }, '4': { x: 225, y: -375 }, '5': { x: -225 }, '6': { x: -75 }, '7': { x: 75 }, '8': { x: 225 } },
            '9': { '1': { x: -300, y: -375 }, '2': { x: -150, y: -375 }, '3': { x: 0, y: -375 }, '4': { x: 150, y: -375 }, '5': { x: 300, y: -375 }, '6': { x: -300, y: -225 }, '7': { x: -150, y: -225 }, '8': { x: 0, y: -225 }, '9': { x: 150, y: -225 } },
            '10': { '1': { x: -300, y: -375 }, '2': { x: -150, y: -375 }, '3': { x: 0, y: -375 }, '4': { x: 150, y: -375 }, '5': { x: 300, y: -375 }, '6': { x: -300, y: -225 }, '7': { x: -150, y: -225 }, '8': { x: 0, y: -225 }, '9': { x: 150, y: -225 }, '10': { x: 300, y: -225 } }
        }

        this.unlockBusy = false
        this.allSlots = []

        // DOM text input
        const inputEl = document.createElement('input')
        inputEl.type = 'text'
        inputEl.maxLength = 16
        inputEl.spellcheck = false
        inputEl.autocomplete = 'off'
        inputEl.id = 'unlockcodeInput'

        this.codeInput = scene.add.dom(0, 224, inputEl, {
            width: '300px',
            height: '50px',
            fontSize: '22px',
            fontFamily: 'Burbank Small',
            fontWeight: 'bold',
            color: '#777777',
            textAlign: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            pointerEvents: 'auto'
        })
        this.add(this.codeInput)

        inputEl.addEventListener('focus', () => { scene.game.input.keyboard.enabled = false })
        inputEl.addEventListener('blur', () => { scene.game.input.keyboard.enabled = true })
        inputEl.addEventListener('input', () => { inputEl.value = inputEl.value.toUpperCase() })
        inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.onUnlock() })

        // spinner tween
        this.spinnerTween = scene.tweens.add({
            targets: spinnerImg,
            angle: { from: 0, to: 180 },
            duration: 900,
            repeat: -1,
            ease: 'Cubic',
            paused: true
        })
    }

    show() {
        super.show()

        this.network.events.on('unlock_code_reward', this.handleUnlockReward, this)

        this.codeInput.node.style.visibility = 'visible'
        this.congrats_view.visible = false
        this.choose_view.visible = true
        this.code_view.visible = true
        this.destroySlots()
        this.showInput()
    }

    hide() {
        this.network.events.off('unlock_code_reward', this.handleUnlockReward, this)
        this.codeInput.node.style.visibility = 'hidden'
        this.scene.game.input.keyboard.enabled = true
        this.spinnerTween.destroy()
        this.interface.removeWidget(this)
        this.destroy()
    }

    onUnlock() {
        if (this.unlockBusy) return
        let code = this.codeInput.node.value.trim()
        if (!code) return

        this.codeInput.node.style.visibility = 'hidden'

        this.spinnerImg.visible = true
        this.spinnerTween.seek(0)
        this.spinnerTween.resume()

        this.unlockBusy = true
        this.code_view.visible = false
        this.network.send('redeem_unlock_code', { code: code })
    }

    showInput() {
        this.unlockBusy = false
        this.code_view.visible = true
        this.spinnerImg.visible = false
        this.spinnerTween.pause()
    }

    destroySlots() {
        for (let slot of this.allSlots) {
            if (slot.move) slot.move.stop()
            slot.destroy()
        }
        this.allSlots = []
        if (this.particles.__Animation) this.particles.__Animation.stop()
    }

    newCode() {
        this.codeInput.node.style.visibility = 'visible'
        this.codeInput.node.value = ''
        this.congrats_view.visible = false
        this.code_view.visible = true
        this.choose_view.visible = true
        this.destroySlots()
    }

    handleUnlockReward(args) {
        let rewardsObj = {}
        for (let i = 0; i < args.items.length; i++) {
            rewardsObj[`item${i + 1}`] = args.items[i]
        }
        if (args.coins) {
            rewardsObj.coins = args.coins
        }

        this.interface.refreshPlayerCard()

        this.spinnerImg.visible = false
        this.spinnerTween.pause()
        this.unlockBusy = false
        this.congrats_view.visible = true
        this.choose_view.visible = false
        if (this.particles.__Animation) this.particles.__Animation.play()
        this.codeInput.node.style.visibility = 'hidden'

        let t = Object.keys(rewardsObj).length
        for (let i = 1; i < t + 1; i++) {
            let slot = new UnlockSlot(this.scene, 0, 0)
            this.slots.add(slot)
            this.allSlots.push(slot)

            if (rewardsObj.coins && i == t) {
                slot.showCoins(rewardsObj.coins)
            } else {
                slot.loadItem(rewardsObj[`item${i}`])
            }

            slot.move = this.scene.tweens.chain({
                targets: slot,
                ease: 'Linear',
                tweens: [
                    {
                        y: { from: 0, to: -225 },
                        duration: 750
                    },
                    {
                        x: { from: 0, to: this.tweenSpots[t][i].x },
                        y: { from: -225, to: this.tweenSpots[t][i].y ? this.tweenSpots[t][i].y : -225 },
                        duration: 500
                    }
                ],
                onComplete: () => slot.move = null
            }).play()
        }
    }

}
