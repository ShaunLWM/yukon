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

        /* END-USER-CTR-CODE */
    }

    /** @returns {Button} */
    static getComponent(gameObject) {
        return gameObject["__Button"];
    }


    /* START-USER-CODE */

    start() {
        super.start()
        this.gameObject.on('pointerdown', (pointer) => this.onDown(pointer))
    }

    hasFrame(name) {
        return this.gameObject.texture.has(name)
    }

    onOver() {
        if (!this.lockFrame) {
            let frame = `${this.spriteName}-hover`
            if (this.hasFrame(frame)) this.gameObject.setFrame(frame)
        }

        super.onOver()
    }

    onOut() {
        if (!this.lockFrame) {
            if (this.hasFrame(this.spriteName)) this.gameObject.setFrame(this.spriteName)
        }

        super.onOut()
    }

    onDown(pointer) {
        if (pointer.button != 0) {
            return
        }

        if (this.activeFrame) {
            let frame = `${this.spriteName}-active`
            if (this.hasFrame(frame)) this.gameObject.setFrame(frame)
        } else {
            let frame = `${this.spriteName}-hover`
            if (this.hasFrame(frame)) this.gameObject.setFrame(frame)
        }
    }

    onUp(pointer) {
        if (pointer.button != 0) {
            return
        }

        if (this.activeFrame) {
            if (this.hasFrame(this.spriteName)) this.gameObject.setFrame(this.spriteName)
        } else {
            let frame = `${this.spriteName}-hover`
            if (this.hasFrame(frame)) this.gameObject.setFrame(frame)
        }

        super.onUp(pointer)
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
