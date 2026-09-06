import BaseLoader from './BaseLoader'


export default class WalkingPuffleLoader extends BaseLoader {

    constructor(scene) {
        super(scene)

        this.baseURL = '/assets/media/puffles/sprites/'
        this.keyPrefix = 'puffles_'
        this.sharedKey = 'puffles_shared'
    }

    loadPuffle(penguin, colorName, callback) {
        const key = this.getKey(colorName)
        let needsLoad = false

        if (!this.textureExists(this.sharedKey)) {
            this.multiatlas(this.sharedKey, 'puffles_shared.json')
            needsLoad = true
        }

        if (!this.textureExists(key)) {
            this.multiatlas(key, `${colorName}.json`)
            needsLoad = true
        }

        if (!needsLoad) {
            callback(key)
            return
        }

        const onComplete = () => {
            if (this.textureExists(key) && this.textureExists(this.sharedKey)) {
                this.scene.load.off('filecomplete', onComplete)
                this.off('filecomplete', onComplete)
                callback(key)
            }
        }
        this.on('filecomplete', onComplete)
        this.start()
    }

}
