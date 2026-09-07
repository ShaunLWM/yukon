import BaseLoader from './BaseLoader'


export default class TransformPaperLoader extends BaseLoader {

    constructor(scene, container, callback) {
        super(scene)

        this.container = container
        this.callback = callback
        this.baseURL = '/assets/media/penguin/transforms/paper/'
        this.keyPrefix = 'penguin/transforms/paper/'
    }

    loadItem(transformId, isClient, paperColors, colorId) {
        const suffix = paperColors ? `_${colorId}` : ''
        const key = `${this.keyPrefix}${transformId}${suffix}`

        if (!this.checkComplete('image', key, () => this.onFileComplete(key, isClient))) {
            this.image(key, `${transformId}${suffix}.png`)
            this.start()
        }
    }

    onFileComplete(key, isClient) {
        if (!this.textureExists(key) || !this.container) return

        const sprite = this.container.scene.add.image(0, 0, key)

        if (isClient) {
            sprite.setInteractive({ cursor: 'pointer', pixelPerfect: true })
            sprite.on('pointerup', () => this.callback())
        }

        if (this.container.paper) {
            this.container.paper.destroy()
        }

        this.container.paper = sprite
        this.container.add(sprite)
    }

}
