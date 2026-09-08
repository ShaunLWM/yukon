import BaseLayer from '@scenes/base/BaseLayer'

import PackFileLoader from '@engine/loaders/PackFileLoader'


export default class WidgetManager extends BaseLayer {

    constructor(scene) {
        super(scene)

        this.depth = -1

        this.activeWidgets = {}
        this.loadedPacks = []

        this.lastLoadingKey = null

        this.packLoader = new PackFileLoader(scene)

        this.packLoader.on('progress', progress =>
            this.setLoadingProgress(progress)
        )

        this.packLoader.on('filecomplete', (key, type) =>
            this.onFileComplete(key, type)
        )
    }

    get activeWidgetObjects() {
        return Object.values(this.activeWidgets)
    }

    get isLoadingVisible() {
        return this.interface.prompt.loading.visible
    }

    onFileComplete(key, type) {
        if (type === 'packfile') {
            this.loadedPacks.push(key)
        }
    }

    async loadWidget(key, floatingLayer, config = null) {
        if (!config && !this.keyExists(key)) return
        if (this.keyActive(key)) return

        this.lastLoadingKey = key

        const widgetDef = config || this.crumbs.widgets[key]
        const { path, preload } = widgetDef

        this.showLoading(this.getString(key))

        const widgetClass = await this.loadWidgetClass(path)

        if (!widgetClass) {
            return
        }

        const callback = () => this.onWidgetLoaded(key, widgetClass.default, floatingLayer, config)

        if (!preload) {
            callback()
            return
        }

        this.packLoader.loadPack(preload.key, preload.url, () => callback())
    }

    async loadNewspaper(issueIndex) {
        if (issueIndex < 0 || issueIndex >= this.crumbs.newspapers.length) return

        const issueNum = issueIndex + 1
        const config = {
            path: 'interface/game/newspaper/Newspaper',
            preload: {
                key: `issue${issueNum}-pack`,
                url: `assets/media/interface/game/newspaper/issue${issueNum}/issue${issueNum}-pack.json`
            },
            issueNum: issueNum
        }

        return await this.loadWidget('Newspaper', null, config)
    }

    async loadWidgetClass(path) {
        try {
            const widgetClass = await (import(
                /* webpackInclude: /\.js$/ */
                `@scenes/${path}`
            ))

            return widgetClass

        } catch (error) {
            console.error(error)

            this.closeLoading()

            return null
        }
    }

    onWidgetLoaded(key, widgetClass, floatingLayer, config = null) {
        const createWidget = this.isLoadingVisible && key === this.lastLoadingKey

        // Floating widgets skip createWidget check
        if (!floatingLayer && !createWidget) {
            return
        }

        if (key === this.lastLoadingKey) {
            this.closeLoading()
        }

        this.createWidget(key, widgetClass, floatingLayer, config)
    }

    createWidget(key, widgetClass, floatingLayer, config = null) {
        const scene = floatingLayer
            ? floatingLayer.scene
            : this.scene

        const widget = new widgetClass(scene)

        this.activeWidgets[key] = widget

        if (floatingLayer) {
            widget.floatingLayer = floatingLayer
        } else {
            this.add(widget)
        }

        widget.show(config)

        this.events.emit(`create_widget_${key.toLowerCase()}`)
    }

    showLoading(text) {
        this.interface.prompt.showLoading(text)
    }

    closeLoading() {
        this.interface.prompt.loading.close()
    }

    setLoadingProgress(progress) {
        this.interface.prompt.loading.setProgress(progress)
    }

    keyExists(key) {
        return key in this.crumbs.widgets
    }

    keyActive(key) {
        return key in this.activeWidgets
    }

    getWidget(key) {
        return this.activeWidgets[key]
    }

    findWidget(filter) {
        return this.activeWidgetObjects.filter(filter)
    }

    removeWidget(widget) {
        for (const key in this.activeWidgets) {
            if (this.activeWidgets[key] === widget) {
                delete this.activeWidgets[key]
            }
        }
    }

    closeWidgets() {
        for (const widget of this.activeWidgetObjects) {
            widget.close()
        }
    }

    unloadWidgets() {
        this.closeWidgets()

        this.memory.unloadPacks(this.loadedPacks)

        this.loadedPacks = []
    }

}
