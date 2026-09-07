import BaseLoader from './BaseLoader'
import PenguinSpriteFactory from './PenguinSpriteFactory'


export default class TransformLoader extends BaseLoader {

    constructor(penguin) {
        super(penguin.room)

        this.penguin = penguin
        this.baseURL = '/assets/media/penguin/transforms/sprites/'
        this.keyPrefix = 'penguin/transforms/sprites/'
    }

    loadTransform(transformId) {
        if (transformId == 0) return

        const variant = this.getVariant(transformId)
        const key = `transformation_${variant}`

        if (!this.checkComplete('json', key, () => this.onFileComplete(transformId, key))) {
            this.multiatlas(key, `${variant}.json`)
            this.start()
        }
    }

    getVariant(transformId) {
        const crumb = this.penguin.crumbs.transformations[transformId]
        if (!crumb || !crumb.sprite_variants) return `${transformId}`

        const colorVariant = Object.keys(crumb.sprite_variants).find(
            suffix => crumb.sprite_variants[suffix]?.includes(this.penguin.color)
        )

        return `${transformId}${colorVariant ? '_' + colorVariant : ''}`
    }

    onFileComplete(transformId, key) {
        if (this.textureExists(key)) {
            this.addTransform(transformId)
        }
    }

    addTransform(transformId) {
        const variant = this.getVariant(transformId)
        const key = `transformation_${variant}`
        const crumb = this.penguin.crumbs.transformations[transformId]

        if (crumb.tinted_sprite) {
            this.penguin.transformTintedSprite = PenguinSpriteFactory.create(this.penguin, key, 98)
            this.penguin.transformTintedSprite.setTint(this.penguin.crumbs.colors[this.penguin.color - 1])
        }

        this.penguin.transformSprite = PenguinSpriteFactory.create(this.penguin, key, 99)

        if (crumb.tinted) {
            this.penguin.transformSprite.setTint(this.penguin.crumbs.colors[this.penguin.color - 1])
        }

        this.penguin.sort('depth')
        this.penguin.playFrame(this.penguin.frame)

        if (crumb.sounds) {
            this.penguin.transformSprite.on('animationupdate', () => {
                for (const frameKey of Object.keys(crumb.frames)) {
                    if (this.penguin.theFrame == frameKey && crumb.frames[frameKey].sounds) {
                        for (const s of crumb.frames[frameKey].sounds) {
                            if (this.penguin.transformSprite.anims.currentFrame.index == s.subframe) {
                                this.penguin.room.soundManager?.playSfx(`penguin/transforms/sounds/${s.sound}`)
                            }
                        }
                    }
                }
            })
        }
    }

}
