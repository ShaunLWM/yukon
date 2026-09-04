import Animation from './Animation'


/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class HoverAnimation extends Animation {

    constructor(gameObject) {
        super(gameObject);

        this.onHover = true;

        gameObject["__HoverAnimation"] = this;
    }

    /** @returns {HoverAnimation} */
    static getComponent(gameObject) {
        return gameObject["__HoverAnimation"];
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
