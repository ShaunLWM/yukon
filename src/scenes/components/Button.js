import SimpleButton from './SimpleButton'


/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Button extends SimpleButton {

    constructor(gameObject) {
        super(gameObject);

        /** @type {Phaser.GameObjects.Sprite} */
        this.gameObject;
        /** @type {string} */
        this.spriteName = "";
        /** @type {any} */
        this.hoverCallback = null;
        /** @type {any} */
        this.hoverOutCallback = null;
        /** @type {any} */
        this.callback = () => {};
        /** @type {boolean} */
        this.activeFrame = true;
        /** @type {boolean} */
        this.pixelPerfect = false;


        this.gameObject = gameObject;
        gameObject["__Button"] = this;

        /* START-USER-CTR-CODE */

        this.lockFrame = false
        this.lazyName = false

        /* END-USER-CTR-CODE */
    }

    /** @returns {Button} */
    static getComponent(gameObject) {
        return gameObject["__Button"];
    }


    /* START-USER-CODE */

    start() {
        let frameName = this.gameObject.frame?.name
        if (frameName && !this.lazyName && frameName.slice(-4) === '0001' &&
            this.hasFrame(frameName.slice(0, -4) + '0002') &&
            !this.hasFrame(frameName.slice(0, -4) + '-hover')) {
            this.lazyName = true
        }

        if (this.lazyName) {
            if (!this.spriteName) this.spriteName = (frameName || '').slice(0, -4)
            this.activeFrame = this.hasFrame(this.spriteName + '0003')
        }

        super.start()
        this.gameObject.on('pointerdown', (pointer) => this.onDown(pointer))
    }

    hasFrame(name) {
        return this.gameObject.texture.has(name)
    }

    getHoverFrame() {
        return `${this.spriteName}${this.lazyName ? '0002' : '-hover'}`
    }

    getNormalFrame() {
        return this.lazyName ? `${this.spriteName}0001` : this.spriteName
    }

    getActiveFrame() {
        return `${this.spriteName}${this.lazyName ? '0003' : '-active'}`
    }

    onOver() {
        if (!this.lockFrame) {
            let frame = this.getHoverFrame()
            if (this.hasFrame(frame)) this.gameObject.setFrame(frame)
        }

        super.onOver()
    }

    onOut() {
        if (!this.lockFrame) {
            let frame = this.getNormalFrame()
            if (this.hasFrame(frame)) this.gameObject.setFrame(frame)
        }

        super.onOut()
    }

    onDown(pointer) {
        if (pointer.button != 0) {
            return
        }

        if (this.activeFrame) {
            let frame = this.getActiveFrame()
            if (this.hasFrame(frame)) this.gameObject.setFrame(frame)
        } else {
            let frame = this.getHoverFrame()
            if (this.hasFrame(frame)) this.gameObject.setFrame(frame)
        }
    }

    onUp(pointer) {
        if (pointer.button != 0) {
            return
        }

        if (this.activeFrame) {
            let frame = this.getNormalFrame()
            if (this.hasFrame(frame)) this.gameObject.setFrame(frame)
        } else {
            let frame = this.getHoverFrame()
            if (this.hasFrame(frame)) this.gameObject.setFrame(frame)
        }

        super.onUp(pointer)
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
