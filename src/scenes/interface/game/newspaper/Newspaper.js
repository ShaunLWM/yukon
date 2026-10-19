import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive, SimpleButton } from '@components/components'


const NAMED_PAGE_ORDER = [
    'Front Page',
    'Featured Story',
    'Support Story',
    'Upcoming Events',
    'Ask Aunt Arctic 1', 'AA 1',
    'Ask Aunt Arctic 2', 'AA 2',
    'Bonus Feature',
    'Bonus Feature 2',
    'Featured Igloos',
    'Jokes and Riddles', 'Jokes and Puzzle',
    'Art', 'Artwork',
    'NewspaperTip'
]

const NON_PAGE_FRAMES = new Set([
    'dottodot', 'dotodot', 'dotpicture', 'penguin_puzzle',
    'puzzleshuffle', 'tipbtn', 'tipbtn-hover',
    'submitvote', 'submitvote-active', 'submitvote-hover',
    'voteselection',
    'sweater0', 'sweater1', 'sweater2', 'sweater3', 'sweater4',
    'sweater5', 'sweater6', 'sweater7', 'sweater8', 'sweater9'
])


export default class Newspaper extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        this.page = 0
        this.pageContainers = []
    }

    get heldSprite() {
        return '1_1'
    }

    show(config) {
        const issueNum = typeof config === 'object' ? config.issueNum : config
        if (!issueNum) return

        const issueKey = `issue${issueNum}`
        const frames = this.getPageFrames(issueKey)

        if (frames.length === 0) return

        const block = this.scene.add.rectangle(760, 480, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.2
        this.add(block)
        new Interactive(block)

        for (let i = 0; i < frames.length; i++) {
            const isFirstPage = i === 0
            const cx = isFirstPage ? 677 : 0
            const cy = isFirstPage ? 437 : 0
            const ix = isFirstPage ? 263 : 785
            const iy = isFirstPage ? 88 : 524

            const container = this.scene.add.container(cx, cy)
            container.angle = -1
            container.visible = isFirstPage
            const pageImage = this.scene.add.image(ix, iy, issueKey, frames[i])
            container.add(pageImage)
            this.add(container)
            this.pageContainers.push(container)
        }

        if (this.scene.textures.exists('Classifieds')) {
            const container = this.scene.add.container(0, 0)
            container.angle = -1
            container.visible = false
            const page = this.scene.add.image(766, 478, 'Classifieds')
            container.add(page)
            this.add(container)
            this.pageContainers.push(container)
        } else if (this.hasFrame('news-common', 'classifieds-pg')) {
            const container = this.scene.add.container(0, 0)
            container.angle = -1
            container.visible = false
            const page = this.scene.add.image(766, 478, 'news-common', 'classifieds-pg')
            container.add(page)
            this.add(container)
            this.pageContainers.push(container)
        }

        this.buildNav()

        super.show()
    }

    getPageFrames(atlasKey) {
        if (!this.scene.textures.exists(atlasKey)) return []

        const allFrames = Object.keys(this.scene.textures.get(atlasKey).frames)
            .filter(f => f !== '__BASE')

        // pg1-pg10 naming (issues 89+)
        if (allFrames.includes('pg1')) {
            return allFrames
                .filter(f => /^pg\d+$/.test(f))
                .sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2)))
        }

        // Named pages - sort by known order, skip puzzle/UI frames
        const pages = allFrames.filter(f => !NON_PAGE_FRAMES.has(f))
        pages.sort((a, b) => {
            const ai = NAMED_PAGE_ORDER.indexOf(a)
            const bi = NAMED_PAGE_ORDER.indexOf(b)
            if (ai === -1 && bi === -1) return 0
            if (ai === -1) return 1
            if (bi === -1) return -1
            return ai - bi
        })

        return pages
    }

    hasFrame(atlas, frame) {
        if (!this.scene.textures.exists(atlas)) return false
        return !!this.scene.textures.get(atlas).frames[frame]
    }

    buildNav() {
        const atlas = this.scene.textures.exists('news-common') ? 'news-common' : 'newspaper-common'

        if (this.pageContainers.length > 0) {
            this.buildFrontPageNav(this.pageContainers[0], atlas)
        }

        const closeBtn = this.scene.add.image(1400, 158, atlas, 'close')
        closeBtn.angle = -1
        this.add(closeBtn)
        const close = new Button(closeBtn)
        close.spriteName = 'close'
        close.callback = () => this.close()
        this.closeBtn = closeBtn

        const mainBtn = this.scene.add.image(113, 201, atlas, 'main')
        mainBtn.angle = -1
        this.add(mainBtn)
        const main = new Button(mainBtn)
        main.spriteName = 'main'
        main.callback = () => this.showPage(0)
        this.mainBtn = mainBtn

        const leftBtn = this.scene.add.image(113, 777, atlas, 'left')
        leftBtn.angle = -1
        this.add(leftBtn)
        const left = new Button(leftBtn)
        left.spriteName = 'left'
        left.callback = () => this.prevPage()
        this.leftBtn = leftBtn

        const rightBtn = this.scene.add.image(1409, 754, atlas, 'right')
        rightBtn.angle = -1
        this.add(rightBtn)
        const right = new Button(rightBtn)
        right.spriteName = 'right'
        right.callback = () => this.nextPage()
        this.rightBtn = rightBtn

        this.updateButtons()
    }

    buildFrontPageNav(container, atlas) {
        const maxPage = this.pageContainers.length - 1

        const storyHit = this.scene.add.rectangle(194, 216, 848, 325)
        storyHit.isFilled = true
        storyHit.fillAlpha = 0.001
        container.add(storyHit)
        new SimpleButton(storyHit).callback = () => this.showPage(1)

        const headers = [
            { x: -279, y: -79, w: 377, h: 201, page: 2 },
            { x: 107, y: -78, w: 366, h: 186, page: 3 },
            { x: 485, y: -76, w: 336, h: 186, page: 4 },
        ]
        for (const h of headers) {
            if (h.page > maxPage) continue
            const hit = this.scene.add.rectangle(h.x, h.y, h.w, h.h)
            hit.isFilled = true
            hit.fillAlpha = 0.001
            container.add(hit)
            new SimpleButton(hit).callback = () => this.showPage(h.page)
        }

        const tocY = [98, 131, 164, 201, 236, 269, 300, 332]
        for (let i = 0; i < tocY.length; i++) {
            const targetPage = i + 1
            if (targetPage > maxPage) break
            const hit = this.scene.add.rectangle(-362, tocY[i], 204, 36)
            hit.fillColor = 0
            hit.fillAlpha = 0.2
            container.add(hit)
            const btn = new SimpleButton(hit)
            btn.hoverCallback = () => { hit.isFilled = true }
            btn.hoverOutCallback = () => { hit.isFilled = false }
            btn.callback = () => this.showPage(targetPage)
        }

        const fpRight = this.scene.add.image(610, 316, atlas, 'right')
        container.add(fpRight)
        const right = new Button(fpRight)
        right.spriteName = 'right'
        right.callback = () => this.nextPage()

        const fpClose = this.scene.add.image(614, -262, atlas, 'close')
        container.add(fpClose)
        const close = new Button(fpClose)
        close.spriteName = 'close'
        close.callback = () => this.close()
    }

    showPage(index) {
        if (index < 0 || index >= this.pageContainers.length) return

        this.pageContainers[this.page].visible = false
        this.page = index
        this.pageContainers[this.page].visible = true
        this.updateButtons()
    }

    nextPage() {
        this.showPage(this.page + 1)
    }

    prevPage() {
        this.showPage(this.page - 1)
    }

    updateButtons() {
        const inner = this.page > 0
        if (this.closeBtn) this.closeBtn.visible = inner
        if (this.mainBtn) this.mainBtn.visible = inner
        if (this.leftBtn) this.leftBtn.visible = inner
        if (this.rightBtn) this.rightBtn.visible = inner && this.page < this.pageContainers.length - 1
    }

}
