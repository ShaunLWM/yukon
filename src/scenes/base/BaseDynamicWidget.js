import BaseWidget from './BaseWidget'


export default class BaseDynamicWidget extends BaseWidget {

    /**
     * Frame in the other_sprites atlas that other penguins see this one
     * holding while the widget is open, e.g. the map or newspaper.
     *
     * @readonly
     */
    get heldSprite() {
        return null
    }

    show(...args) {
        super.show(...args)

        if (this.heldSprite && !this.isHoldingSprite) {
            this.isHoldingSprite = true
            this.network.send('open_sprite', { sprite: this.heldSprite })
        }
    }

    close() {
        if (this.isHoldingSprite) {
            this.isHoldingSprite = false
            this.network.send('close_sprite')
        }

        super.close()

        this.destroyTweens(this)

        this.once('destroy', () => this.interface.removeWidget(this))
        this.destroy()
    }

    // Recursively destroy tweens
    destroyTweens(container) {
        this.scene.tweens.killTweensOf(container)

        container.each(child => {
            this.scene.tweens.killTweensOf(child)

            if (child.type === 'Container') {
                this.destroyTweens(child)
            }
        })
    }

}
