export default class Work {

    constructor(room, config) {
        this.room = room
        this.penguinItem = config.penguinItem
        this.shopItem = config.shopItem
        this.pickupItem = config.pickupItem
        this.arrow = config.arrow
        this.coin = config.coin
        this.coinText = config.coinText
        this.animKeys = config.animKeys || {}
        this.counterPos = config.counterPos
        this.pickupRadius = config.pickupRadius || 125
        this.deliveryRadius = config.deliveryRadius || 100
        this.itemOffsetY = config.itemOffsetY || -10
        this.doneSound = config.doneSound || 'job_pizza_done'

        this.isCollecting = false
        this.isDelivering = false
        this.deliveryX = 0
        this.deliveryY = 0
        this.deliveringGroup = this.room.add.group()
        this.deliveredGroup = this.room.add.group()
        this.deliveringItems = {}
        this.arrowTween = null

        this.addListeners()
    }

    get world() {
        return this.room.world
    }

    get client() {
        return this.room.world.client
    }

    get interface() {
        return this.room.interface
    }

    get network() {
        return this.room.network
    }

    addListeners() {
        this.network.events.on('work_request', this.handleWorkRequest, this)
        this.network.events.on('work_picked', this.handleWorkPicked, this)
        this.network.events.on('work_delivered', this.handleWorkDelivered, this)
    }

    removeListeners() {
        this.network.events.off('work_request', this.handleWorkRequest, this)
        this.network.events.off('work_picked', this.handleWorkPicked, this)
        this.network.events.off('work_delivered', this.handleWorkDelivered, this)
    }

    update() {
        for (let id in this.deliveringItems) {
            let penguin = this.room.penguins[id]
            let sprite = this.deliveringItems[id]
            if (penguin && sprite) {
                sprite.x = penguin.x - 1
                sprite.y = penguin.y - 100
            }
        }

        this.checkCollection()
    }

    handleWorkRequest(args) {
        this.pickupItem.visible = true
        this.room.soundManager.playSfx('order_bell')

        let frames = Object.keys(this.animKeys)
        let frame = Phaser.Utils.Array.GetRandom(frames)

        this.shopItem.setFrame(frame)
        this.penguinItem.setFrame(frame)

        this.world.room.counter_arrow.setVisible(true).setDepth(5000)
        this.arrow.setVisible(false)

        if (this.world.room.book) {
            this.world.room.book.visible = false
        }

        this.deliveryX = args.x
        this.deliveryY = args.y
        this.isCollecting = true
        this.isDelivering = false
    }

    handleWorkPicked(args) {
        let workerId = args.workerId
        let penguin = this.room.penguins[workerId]
        if (penguin && !this.deliveringItems[workerId]) {
            let sprite = this.room.add.sprite(penguin.x, penguin.y - 100, this.pickupItem.texture.key, args.frame)
            sprite.setDepth(1000)
            sprite.setScale(0.6)
            this.deliveringItems[workerId] = sprite
            this.deliveringGroup.add(sprite)
        }
    }

    handleWorkDelivered(args) {
        let workerId = args.workerId
        let sprite = this.deliveringItems[workerId]
        if (sprite) {
            sprite.destroy()
            delete this.deliveringItems[workerId]
        }

        let delivered = this.room.add.sprite(args.deliveryX + 50, args.deliveryY, this.pickupItem.texture.key, args.frame)
        delivered.setDepth(1000)
        delivered.setScale(0.6)
        this.deliveredGroup.add(delivered)

        let animKey = this.animKeys[args.frame]
        if (animKey) delivered.play(animKey)
    }

    checkCollection() {
        if (this.isCollecting) {
            let penguin = this.world.client.penguin
            if (!penguin) return

            let dist = Phaser.Math.Distance.Between(penguin.x, penguin.y, this.counterPos.x, this.counterPos.y)
            if (dist <= this.pickupRadius) {
                this.pickupItem.visible = false
                this.isCollecting = false
                this.isDelivering = true

                if (this.world.room.book) {
                    this.world.room.book.visible = true
                }
                if (this.room.rectangle_1) {
                    this.room.rectangle_1.visible = true
                }
                this.world.room.counter_arrow.setVisible(false)

                let frame = this.penguinItem.frame.name
                this.network.send('work_picked', { frame: frame })
            }
        } else if (this.isDelivering) {
            let penguin = this.world.client.penguin
            if (!penguin) return

            this.penguinItem.x = penguin.x - 1
            this.penguinItem.y = penguin.y + this.itemOffsetY
            this.penguinItem.setDepth(1000)
            this.arrow.setVisible(true).setDepth(5000)

            if (!this.arrowTween) {
                this.arrow.x = this.deliveryX
                this.arrow.y = this.deliveryY - 125
                this.arrowTween = this.room.tweens.add({
                    targets: [this.arrow],
                    y: { from: this.arrow.y + 25, to: this.arrow.y - 25 },
                    duration: 500,
                    ease: 'Sine.easeInOut',
                    yoyo: true,
                    repeat: -1
                })
            }

            let dist = Phaser.Math.Distance.Between(penguin.x, penguin.y, this.deliveryX, this.deliveryY)
            if (dist <= this.deliveryRadius) {
                this.isDelivering = false
                this.penguinItem.x = -150
                this.penguinItem.y = 300
                this.arrow.setPosition(-150, 400).setVisible(false)

                let frame = this.penguinItem.frame.name
                let animKey = this.animKeys[frame]

                let delivered = this.room.add.sprite(this.deliveryX + 50, this.deliveryY, this.pickupItem.texture.key, frame)
                delivered.setDepth(1000)
                delivered.setScale(0.6)
                this.deliveredGroup.add(delivered)
                if (animKey) delivered.play(animKey)

                if (this.arrowTween) {
                    this.arrowTween.stop()
                    this.arrowTween.destroy()
                    this.arrowTween = null
                }

                let mySprite = this.deliveringItems[this.world.client.id]
                if (mySprite) {
                    mySprite.destroy()
                    delete this.deliveringItems[this.world.client.id]
                }

                this.network.send('work_fulfilled', {
                    workerId: this.world.client.id,
                    deliveryX: this.deliveryX,
                    deliveryY: this.deliveryY,
                    frame: frame,
                    animation: animKey
                })
            }
        }
    }

    showCoinRewardToPlayer(penguin, coins) {
        this.coin.setPosition(penguin.x, penguin.y - 50)
        this.coin.setDepth(1002)
        this.coin.visible = true
        this.coinText.setText('+' + coins)

        this.room.tweens.add({
            targets: [this.coin],
            y: { from: this.coin.y, to: this.coin.y - 70 },
            ease: 'Linear',
            duration: 1000,
            onComplete: () => this.coin.visible = false
        })

        this.interface.refreshPlayerCard()

        if (this.world.room.cooldown_timer) {
            this.world.room.cooldown_timer.visible = true
            this.world.room.cooldown_timer.__Animation.play()
            this.world.room.cooldown_timer.once('animationcomplete', () => {
                this.world.room.cooldown_timer.visible = false
            })
        }

        this.room.soundManager.playSfx(this.doneSound)
    }

}
