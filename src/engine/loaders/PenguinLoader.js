import PenguinSpriteFactory from './PenguinSpriteFactory'
import WalkingPuffleLoader from './WalkingPuffleLoader'


// Sorts above the body, items and puffle inside the penguin container
const heldSpriteDepth = 100

export default class PenguinLoader {

    constructor(world) {
        this.world = world

        this.nameStyle = {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#000000',
            align: 'center',
            fixedWidth: 250
        }
    }

    loadPenguin(penguin) {
        this.addPenguin(penguin)

        if (this.isBuddy(penguin)) {
            this.addBuddyRing(penguin)
        }

        this.addShadow(penguin)
        this.addInput(penguin)

        if (penguin.walking && penguin.walkingPuffleType != null) {
            this.addPuffle(penguin, penguin.walkingPuffleType)
        }

        // Already holding a map, newspaper etc. when this client joined. The
        // client's own penguin never shows one: its widgets are on screen
        if (penguin.openSprite && penguin.id !== this.world.client?.id) {
            this.openSprite(penguin, penguin.openSprite)
        } else {
            penguin.openSprite = null
        }

        penguin.playFrame(penguin.frame)
    }

    /**
     * Shows a penguin holding a sprite from the other_sprites atlas, such as the
     * map or newspaper, while its player has that open. It stands still on
     * frame 1 until the sprite is closed.
     *
     * @param {Penguin} penguin - Penguin object
     * @param {string} sprite - Frame in the other_sprites atlas
     */
    openSprite(penguin, sprite) {
        this.closeSprite(penguin, false)

        penguin.openSprite = sprite

        if (penguin.textures.get('other_sprites').has(sprite)) {
            penguin.heldSprite = penguin.room.add.image(0, 0, 'other_sprites', sprite)

            // Above every item slot, as clothing loading re-sorts by depth
            penguin.heldSprite.depth = heldSpriteDepth
            penguin.add(penguin.heldSprite)
            penguin.sort('depth')
        }

        penguin.playFrame(1)
    }

    closeSprite(penguin, playFrame = true) {
        if (penguin.heldSprite) {
            penguin.heldSprite.destroy()
            penguin.heldSprite = null
        }

        if (!penguin.openSprite) {
            return
        }

        penguin.openSprite = null

        // Frames received while holding were recorded but not shown
        if (playFrame) {
            penguin.playFrame(penguin.frame)
        }
    }

    isBuddy(penguin) {
        return !!this.world.client?.buddies.find(b => b.id == penguin.id)
    }

    addPenguin(penguin) {
        penguin.bodySprite = PenguinSpriteFactory.create(penguin, 'body', 1)
        penguin.penguinSprite = PenguinSpriteFactory.create(penguin, 'penguin', 2)
    }

    addShadow(penguin) {
        let shadow = penguin.room.add.image(0, 0, 'penguin_base', 'shadow')

        penguin.addAt(shadow, 0)
    }

    addRing(penguin, destroy = false) {
        if (penguin.ring) {
            penguin.remove(penguin.ring, 0)
        }
        if (!destroy) {
            penguin.ring = penguin.room.add.image(0, 0, 'penguin_base', 'ring')
            penguin.addAt(penguin.ring, 0)
        }
    }

    addBuddyRing(penguin) {
        if (penguin.ring) {
            penguin.remove(penguin.ring, 0)
        }
        penguin.ring = penguin.room.add.image(0, 0, 'penguin_base', 'buddy_ring')
        penguin.addAt(penguin.ring, 0)
    }

    removeBuddyRing(penguin) {
        if (penguin.ring) {
            penguin.ring.destroy()
            penguin.ring = null
        }
    }

    addName(penguin) {
        let x = penguin.x
        let y = penguin.y + 40
        let nameTag = penguin.room.add.text(x, y, penguin.username, this.nameStyle)

        nameTag.setOrigin(0.5)
        nameTag.depth = penguin.depth + 2000 // Keep nametag above everything else

        return nameTag
    }

    addInput(penguin) {
        let hitArea = new Phaser.Geom.Ellipse(0, -20, 70, 90)

        penguin.setInteractive({
            cursor: 'pointer',
            hitArea: hitArea,
            hitAreaCallback: Phaser.Geom.Ellipse.Contains
        })

        penguin.on('pointerup', () => this.onPenguinClick(penguin.id, penguin.username))
    }

    onPenguinClick(id, username) {
        this.world.interface.showCard(id, username)
    }

    addPuffle(penguin, typeId) {
        if (!(typeId in this.world.crumbs.puffles)) return

        const colorName = this.world.crumbs.puffles[typeId].name
        const loader = new WalkingPuffleLoader(penguin.room)

        loader.loadPuffle(penguin, colorName, (key) => {
            if (!penguin.active) return

            penguin.pufflesprite = PenguinSpriteFactory.create(penguin, key, 3)
            penguin.hasPuffle = true
            penguin.puffleColor = colorName
            penguin.walkingPuffleType = typeId

            if (penguin.textures.exists('puffles_shared')) {
                penguin.pufflespecialsprite = PenguinSpriteFactory.create(penguin, 'puffles_shared', 2)
            }

            // Loads after the items may have sorted, e.g. under a held sprite
            penguin.sort('depth')

            penguin.playFrame(penguin.frame)
        })
    }

    removePuffle(penguin) {
        if (penguin.pufflesprite) {
            penguin.pufflesprite.destroy()
            penguin.pufflesprite = null
        }
        if (penguin.pufflespecialsprite) {
            penguin.pufflespecialsprite.destroy()
            penguin.pufflespecialsprite = null
        }
        penguin.hasPuffle = false
        penguin.puffleColor = null
        penguin.walkingPuffleType = null
    }

}
