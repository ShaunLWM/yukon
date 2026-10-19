import BaseContainer from '@scenes/base/BaseContainer'

import PathEngine from './pathfinding/PathEngine'
import PenguinItems from './PenguinItems'
import PenguinSpriteFactory from '../../loaders/PenguinSpriteFactory'
import TransformLoader from '../../loaders/TransformLoader'

import adjustRedemptionItem from './frames/adjustRedemptionItem'


export default class Penguin extends BaseContainer {

    constructor(user, room) {
        super(room, user.x, user.y)

        // Assign user attributes
        Object.assign(this, user)
        this.room = room

        this.items = new PenguinItems(this)
        this.clothingLoader = this.world.clothingLoader
        this.transformLoader = new TransformLoader(this)

        this.bodySprite
        this.penguinSprite
        this.transformSprite
        this.transformTintedSprite
        this.pufflesprite = null
        this.pufflespecialsprite = null
        this.hasPuffle = false
        this.puffleColor = null
        this.puffleHidden = false
        this.puffleDigging = false

        PathEngine.setStartPos(this)

        this.depth = this.y
        this.tween
        this.direction

        this.nameTag = this.penguinLoader.addName(this)

        // Active balloon
        this.balloon

        this.balloonTimer = new Phaser.Time.TimerEvent()
        this.textBalloon
        this.emoteBalloon

        this.on('destroy', () => this.onDestroy())
        this.isButton = true

        // Function that is called after move completes, used to set a frame after move etc
        this.afterMove

        this.soundCallbacks = new Map()

        this.load()
    }

    get isTweening() {
        return (this.tween) ? true : false
    }

    get pos() {
        return { x: this.x, y: this.y }
    }

    get playerCard() {
        return this.interface.main.playerCard
    }

    get equipped() {
        return this.items.equipped
    }

    get isTransformed() {
        return this.transform !== 0 && this.transform !== undefined
    }

    get transformCrumb() {
        return this.crumbs.transformations[this.transform]
    }

    get equippedSprites() {
        return this.list.filter(child => {

            return child.type == 'Sprite'
                && child != this.bodySprite
                && child != this.penguinSprite
                && child != this.transformSprite
                && child != this.transformTintedSprite
                && child != this.pufflesprite
                && child != this.pufflespecialsprite
        })
    }

    get penguinLoader() {
        return this.world.penguinFactory.penguinLoader
    }

    get textures() {
        return this.room.textures
    }

    get anims() {
        return this.room.anims
    }

    get secretFramesCache() {
        return this.world.secretFramesCache
    }

    /**
     * this.body is a Phaser property and will result in an error on destruction,
     * so it must be deleted manually first.
     */
    onDestroy() {
        delete this.body
        delete this.pufflesprite
        delete this.pufflespecialsprite
        delete this.transformSprite
        delete this.transformTintedSprite
    }

    transformation(transformId) {
        if (this.isTransformed && this.transformSprite) {
            this.transformSprite.destroy()
            this.transformSprite = null
        }
        if (this.transformTintedSprite) {
            this.transformTintedSprite.destroy()
            this.transformTintedSprite = null
        }

        this.transform = transformId

        this.bodySprite.visible = !this.isTransformed
        this.penguinSprite.visible = !this.isTransformed

        for (const sprite of this.equippedSprites) {
            sprite.visible = !this.isTransformed
        }

        if (this.isTransformed) {
            this.transformLoader.loadTransform(this.transform)
            this.loadTransformAudio(this.transform)
        }

        if (!this.isTransformed) {
            this.playFrame(this.frame)
        }
    }

    loadTransformAudio(transformId) {
        const crumb = this.crumbs.transformations[transformId]
        if (!crumb?.sounds) return

        for (const frameKey of Object.keys(crumb.frames)) {
            if (crumb.frames[frameKey].sounds) {
                for (const s of crumb.frames[frameKey].sounds) {
                    this.room.soundManager?.loadSfx(`penguin/transforms/sounds/${s.sound}`)
                }
            }
        }
    }

    load() {
        this.penguinLoader.loadPenguin(this)
        this.loadItems()

        if (this.isTransformed) {
            this.bodySprite.visible = false
            this.penguinSprite.visible = false
            this.transformLoader.loadTransform(this.transform)
            this.loadTransformAudio(this.transform)
        }

        this.room.add.existing(this)
    }

    loadItems() {
        for (const slot in this.equipped) {
            const item = this.equipped[slot]

            if (item.id > 0) {
                this.loadItem(item.id, slot)
            }
        }

        this.clothingLoader.start()
    }

    loadItem(itemId, slot) {
        if (itemId === 0) {
            this.removeItem(slot)
            return
        }

        if (this.equipped[slot].sprite) {
            this.removeItem(slot)
        }

        this.clothingLoader.loadItem(itemId, () => this.addItem(slot, itemId))
    }

    addItem(slot, itemId) {
        if (!this.active) {
            return
        }

        const equipped = this.equipped[slot]

        if (itemId !== equipped.id) {
            return
        }

        const key = this.clothingLoader.getKey(itemId)

        if (equipped.sprite) {
            this.removeItem(slot)
        }

        // depth + 1 to ensure items are loaded on top of penguin body
        equipped.sprite = PenguinSpriteFactory.create(this, key, equipped.depth + 1)

        if (this.isTransformed) {
            equipped.sprite.visible = false
        }

        this.sort('depth')
        this.playFrame(this.frame)
    }

    removeItem(slot) {
        const item = this.equipped[slot]

        if (!item || !item.sprite) {
            return
        }

        this.removeSoundEvents(item.sprite)

        item.sprite.destroy()
        item.sprite = null

        this.playFrame(this.frame)
    }

    update(itemId, slot) {
        this.items.setItem(itemId, slot)

        if (slot == 'color' && this.bodySprite) {
            this.bodySprite.tint = this.world.getColor(itemId)
            if (this.isTransformed && this.transformCrumb.tinted && this.transformSprite) {
                this.transformSprite.tint = this.world.getColor(itemId)
            }
            if (this.isTransformed && this.transformCrumb.tinted_sprite && this.transformTintedSprite) {
                this.transformTintedSprite.tint = this.world.getColor(itemId)
            }
        }

        // Load item sprite
        if (slot in this.equipped) {
            this.loadItem(itemId, slot)
            this.clothingLoader.start()
        }

        // Load item paper, only if card is active
        if (this.playerCard.visible && this.playerCard.id == this.id) {
            this.playerCard.paperDoll.loadItem(itemId, slot)
        }
    }

    move(x, y) {
        const path = PathEngine.getPath(this, { x: x, y: y })

        if (path) {
            this.addMoveTween(path)
        }
    }

    setPos(x, y) {
        this.x = x
        this.y = y
    }

    /*========== Animations ==========*/

    playFrame(_frame, set = true) {
        // Moving penguin can only update when frames are movement frames (9-16)
        if (this.isTweening && (_frame < 9 || _frame > 16)) {
            return
        }

        // Get correct frame id
        const frame = ([25, 26].includes(_frame) && !this.isTransformed)
            ? this.getSecretFrame(_frame)
            : _frame

        this.createAnims(frame, frame != _frame)

        this.playAnims(frame)

        this.theFrame = _frame
        // Frames that aren't set get set to 1
        this.frame = (set) ? _frame : 1
    }

    createAnims(frame, isSecretFrame) {
        const penguinTexture = (isSecretFrame)
            ? `secret_frames/${frame}`
            : 'penguin'

        this.createAnim(`penguin_body_${frame}`, penguinTexture, frame, 'body/')
        this.createAnim(`penguin_${frame}`, penguinTexture, frame, 'penguin/')

        if (this.isTransformed && this.transformSprite) {
            this.createAnim(`${this.transformSprite.texture.key}_${frame}`, this.transformSprite.texture.key, frame, '', false, true)
            if (this.transformTintedSprite) {
                this.createAnim(`${this.transformTintedSprite.texture.key}/color_${frame}`, this.transformTintedSprite.texture.key, frame, 'color/', false, true)
            }
        }

        for (const { id, sprite } of Object.values(this.items.equipped)) {
            if (!id || !sprite) {
                continue
            }

            const anim = this.createAnim(`${sprite.texture.key}_${frame}`, sprite.texture.key, frame, '', true)

            this.checkAttachSound(frame, id, sprite, anim)
        }

        if (this.pufflesprite) {
            const puffleFrame = isSecretFrame ? 26 : frame
            this.createAnim(`${this.pufflesprite.texture.key}_${puffleFrame}`, this.pufflesprite.texture.key, puffleFrame, '')
        }
    }

    createAnim(key, textureKey, frame, prefix = '', checkItem = false, isTransform = false) {
        if (this.anims.exists(key)) {
            return this.anims.get(key)
        }

        if (!this.textures.exists(textureKey)) {
            return null
        }

        let animation

        if (isTransform && this.transformCrumb?.frames?.[frame]) {
            animation = this.transformCrumb.frames[frame]
        } else {
            animation = this.crumbs.penguin[frame]
        }

        if (textureKey === 'puffles_shared') {
            animation = this.crumbs.puffleanims.shared[frame]
        }

        if (!animation) {
            return null
        }

        if (checkItem && animation.items) {
            animation = this.checkAnimItems(animation, textureKey)
        }

        const frames = this.generateFrames(textureKey, frame, prefix, animation)

        const anim = this.anims.create({
            key: key,
            frames: frames,
            frameRate: 24,
            repeat: animation.repeat || 0
        })

        if (animation.chain) {
            anim.chainKeys = this.createChains(key, textureKey, frame, prefix, animation.chain)
        }

        return anim
    }

    checkAnimItems(animation, textureKey) {
        const check = adjustRedemptionItem(textureKey.split('/').pop())

        for (const item in animation.items) {
            const secretCheck = adjustRedemptionItem(item)

            if (check == secretCheck) {
                return animation.items[item]
            }
        }

        return animation
    }

    generateFrames(textureKey, frame, prefix, animation) {
        const frames = Phaser.Utils.Array.NumberArray(animation.start || 1, animation.end)

        const config = {
            prefix: `${prefix}${frame}_`,
            frames: frames
        }

        const textureFrames = this.textures.get(textureKey).getFrameNames(false)

        // Filter out null frames
        config.frames = config.frames.filter((i) => {
            return textureFrames.includes(`${prefix}${frame}_${i}`)
        })

        return this.anims.generateFrameNames(textureKey, config)
    }

    createChains(key, textureKey, frame, prefix, config) {
        const chainKeys = []

        for (let i = 0; i < config.length; i++) {
            const chain = config[i]

            const chainKey = `${key}/chain_${i + 1}`

            const frames = this.generateFrames(textureKey, frame, prefix, chain)

            this.anims.create({
                key: chainKey,
                frames: frames,
                frameRate: 24,
                repeat: chain.repeat || 0
            })

            chainKeys.push(chainKey)
        }

        return chainKeys
    }

    playAnims(frame) {
        // Holding an open sprite (map, newspaper etc.) keeps the penguin still
        if (this.openSprite && frame > 1) {
            return
        }

        if (this.isTransformed) {
            if (this.transformSprite) {
                this.playAnim(this.transformSprite, `${this.transformSprite.texture.key}_${frame}`)
            }
            if (this.transformTintedSprite) {
                this.playAnim(this.transformTintedSprite, `${this.transformTintedSprite.texture.key}/color_${frame}`)
            }
            return
        }

        this.playAnim(this.bodySprite, `penguin_body_${frame}`)
        this.playAnim(this.penguinSprite, `penguin_${frame}`)

        for (const sprite of this.equippedSprites) {
            const key = `${sprite.texture.key}_${frame}`

            this.playAnim(sprite, key)
        }

        if (this.pufflesprite && !this.puffleHidden && !this.puffleDigging) {
            const puffleFrame = frame >= 31 ? 26 : frame
            this.playAnim(this.pufflesprite, `${this.pufflesprite.texture.key}_${puffleFrame}`)
        }
    }

    playAnim(sprite, key) {
        if (!this.checkAnim(key)) {
            return sprite.visible = false
        }

        sprite.visible = true
        sprite.anims.play(key)

        // Reset current chain queue
        sprite.chain()

        const anim = this.anims.get(key)

        if (anim.chainKeys) {
            this.playChain(sprite, anim)
        }
    }

    playChain(sprite, anim) {
        const keys = anim.chainKeys

        for (const key of keys) {
            if (this.checkAnim(key)) {
                sprite.chain(key)
            }
        }
    }

    checkAnim(key) {
        const animation = this.anims.get(key)
        return animation && animation.frames.length > 0
    }

    getSecretFrame(frame) {
        const equipped = this.items.equippedFlat
        const frameString = this.getSecretFrameString(frame, equipped)

        if (this.secretFramesCache[frameString]) {
            return this.secretFramesCache[frameString]
        }

        for (const secret of this.crumbs.secret_frames[frame]) {
            if (this.checkSecretFrames(equipped, secret)) {

                this.secretFramesCache[frameString] = secret.secret_frame

                return secret.secret_frame
            }
        }

        return frame
    }

    checkSecretFrames(equipped, secret) {
        for (const item in equipped) {
            const check = adjustRedemptionItem(equipped[item])
            const secretCheck = adjustRedemptionItem(secret[item])

            if (check != secretCheck) {
                return false
            }
        }

        return secret.secret_frame in this.crumbs.penguin
            && this.checkSecretFrameTextures(secret.secret_frame)
    }

    checkSecretFrameTextures(frame) {
        return this.textures.exists(`secret_frames/${frame}`)
    }

    getSecretFrameString(frame, equipped) {
        const slots = this.items.slots.filter(slot => slot in equipped)

        const items = slots.map(slot => adjustRedemptionItem(equipped[slot]))

        return `${frame},${items.toString()}`
    }

    checkAttachSound(frame, itemId, sprite, anim) {
        if (!anim) {
            return
        }

        // Remove previous events if they exist
        this.removeSoundEvents(sprite)

        const adjustedId = adjustRedemptionItem(itemId)
        const soundKey = this.crumbs.sounds.items[adjustedId]

        if (!soundKey) {
            return
        }

        const soundConfig = this.crumbs.sounds.itemSounds[soundKey]

        if (soundConfig?.frame === frame) {
            this.attachSound(sprite, soundKey, soundConfig, anim)
        }
    }

    attachSound(sprite, soundKey, soundConfig, targetAnim) {
        if (!sprite) {
            return
        }

        const start = soundConfig.start || 1

        const callback = (anim, { index }) => {
            if (anim === targetAnim && index === start) {
                this.playItemSound(soundKey)
                this.removeSoundEvents(sprite)
            }
        }

        this.addSoundEvents(sprite, callback)
    }

    addSoundEvents(sprite, callback) {
        sprite.on('animationstart', callback)
        sprite.on('animationupdate', callback)

        this.soundCallbacks.set(sprite, callback)
    }

    removeSoundEvents(sprite) {
        const callback = this.soundCallbacks.get(sprite)

        if (!callback) {
            return
        }

        sprite.off('animationstart', callback)
        sprite.off('animationupdate', callback)

        this.soundCallbacks.delete(sprite)
    }

    playItemSound(key) {
        this.soundManager.play(`sounds/items/${key}`)
    }

    /*========== Puffle Animations ==========*/

    sendPuffleFrame(frame, onComplete, onUpdate) {
        if (!this.pufflesprite || this.puffleHidden || this.puffleDigging) return

        const key = `${this.pufflesprite.texture.key}_${frame}`

        const colorAnims = this.crumbs.puffleanims[this.puffleColor]
        const animConfig = colorAnims ? colorAnims[frame] : null
        if (!animConfig) return

        if (frame === 75) this.puffleDigging = true

        this.createAnim(key, this.pufflesprite.texture.key, frame, '')
        this.remove(this.pufflesprite)
        this.room.add.existing(this.pufflesprite)
        this.pufflesprite.x = this.x
        this.pufflesprite.y = this.y
        this.pufflesprite.depth = this.depth
        this.playAnim(this.pufflesprite, key)

        if (onUpdate) {
            this.pufflesprite.on('animationupdate', onUpdate)
        }

        this.pufflesprite.once('animationcomplete', () => {
            if (onUpdate) this.pufflesprite.off('animationupdate', onUpdate)
            if (onComplete) onComplete()
            if (frame === 75) this.puffleDigging = false
            this.room.children.remove(this.pufflesprite)
            this.pufflesprite.x = 0
            this.pufflesprite.y = 0
            this.add(this.pufflesprite)
        })
    }

    sendSpecialPuffleFrame(frame, onComplete) {
        if (!this.pufflespecialsprite || !this.pufflesprite) return

        const key = `puffles_shared_${frame}`

        setTimeout(() => {
            if (!this.pufflespecialsprite) return

            this.createAnim(key, this.pufflespecialsprite.texture.key, frame)
            this.playAnim(this.pufflespecialsprite, key)
            this.remove(this.pufflespecialsprite)
            this.room.add.existing(this.pufflespecialsprite)
            this.pufflespecialsprite.x = this.pufflesprite.x
            this.pufflespecialsprite.y = this.pufflesprite.y
            this.pufflespecialsprite.depth = this.pufflesprite.depth

            this.pufflespecialsprite.once('animationcomplete', () => {
                if (onComplete) onComplete()
                this.room.children.remove(this.pufflespecialsprite)
                this.pufflespecialsprite.setFrame('1_1')
                this.add(this.pufflespecialsprite)
                this.pufflespecialsprite.x = 0
                this.pufflespecialsprite.y = 0
            })
        }, 1000)
    }

    /*========== Tweening ==========*/

    addMoveTween(path) {
        if (this.tween) {
            this.removeTween(false)
        }

        this.playFrame(this.direction + 8) // + 8 for walking frame id

        let ease = 'Linear'
        let duration = path.duration

        if (this.room.shouldSlide?.()) {
            duration *= 1.15
            ease = 'Quad.easeInOut'
        }

        this.tween = this.room.tweens.add({
            targets: this,
            duration: duration,
            ease: ease,

            x: Math.round(path.target.x),
            y: Math.round(path.target.y),

            onUpdate: () => this.onMoveUpdate(),
            onComplete: () => this.onMoveComplete()
        })
    }

    onMoveUpdate() {
        this.depth = this.y + 1

        if (this.nameTag) {
            this.updateNameTag()
        }

        if (this.balloon) {
            this.updateBalloon()
        }
    }

    onMoveComplete() {
        this.onMoveUpdate()
        this.removeTween()

        if (this.afterMove) {
            this.afterMove()
            this.afterMove = null
        }

        // A frame sent mid-walk replaces a deferred open_sprite in afterMove
        if (this.openSprite && !this.heldSprite) {
            this.penguinLoader.openSprite(this, this.openSprite)
        }
    }

    updateNameTag() {
        this.nameTag.x = this.x
        this.nameTag.y = this.y + 40
        this.nameTag.depth = this.depth + 2000
    }

    updateBalloon() {
        this.balloon.updatePosition()
    }

    removeTween(playFrame = true) {
        if (!this.tween) {
            return
        }

        this.tween.stop()
        this.tween = null

        if (playFrame) {
            this.playFrame(this.direction)
        }
    }

}
