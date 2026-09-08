import { Interactive, ShowHint } from '@components/components'


export default class UnlockSlot extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        const slot = scene.add.image(0, -11.766840215372177, 'unlock', 'slot')
        slot.setOrigin(0.5, 0.41085727109566533)
        this.add(slot)

        const itemContainer = scene.add.container(0, 0)
        itemContainer.scaleX = 0.9
        itemContainer.scaleY = 0.9
        this.add(itemContainer)

        const coins = scene.add.container(0, -13)
        coins.visible = false
        this.add(coins)

        const prompt_coin = scene.add.image(0, 0, 'main', 'prompt_coin')
        prompt_coin.scaleX = 0.45
        prompt_coin.scaleY = 0.45
        coins.add(prompt_coin)

        const coinCount = scene.add.text(0, 48, '', {})
        coinCount.setOrigin(0.5, 0.5)
        coinCount.setStyle({ align: 'center', color: '#4a4a4aff', fontFamily: 'Burbank Small', fontSize: '27px', fontStyle: 'bold' })
        coins.add(coinCount)

        new Interactive(slot)
        const slotShowHint = new ShowHint(slot)
        slotShowHint.text = 'Item'

        this.slot = slot
        this.itemContainer = itemContainer
        this.coinCount = coinCount
        this.coins = coins

        this.baseURL = '/assets/media/clothing/icon/120/'
        this.keyPrefix = 'clothing/icon/120/'
    }

    showCoins(amount) {
        this.itemContainer.visible = false
        this.coinCount.text = amount
        this.coins.visible = true
        this.slot.__ShowHint.text = `${amount} coins`
    }

    loadItem(itemId) {
        this.coins.visible = false
        this.itemContainer.visible = true

        let key = `${this.keyPrefix}${itemId}`

        if (this.scene.textures.exists(key)) {
            this.showIcon(itemId, key)
            return
        }

        this.scene.load.image(key, `${this.baseURL}${itemId}.png`)
        this.scene.load.once(`filecomplete-image-${key}`, () => this.showIcon(itemId, key))
        this.scene.load.once('loaderror', () => this.showIcon(itemId, 'main', 'x-icon'))
        this.scene.load.start()
    }

    showIcon(itemId, key, frame = null) {
        let icon = this.scene.add.image(0, 0, key, frame)
        this.itemContainer.add(icon)

        let name = this.scene.crumbs.items[itemId]?.name || 'Item'
        this.slot.__ShowHint.text = name
    }

}
