import BaseDynamicWidget from '@scenes/base/BaseDynamicWidget'

import { Button, Interactive, SimpleButton } from '@components/components'


class ArchiveNewspaperItem extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0)

        this.issueOffset = 1

        const newsContainer = scene.add.container(0, 0)
        this.add(newsContainer)

        const newspaper = scene.add.image(0, 0, 'archives', 'newspaper')
        newsContainer.add(newspaper)

        const headlineText = scene.add.text(-558, -100, '', {})
        headlineText.setStyle({
            align: 'center',
            color: '#333333',
            fixedWidth: 1110,
            fontFamily: 'Burbank Small',
            fontSize: '50px',
            fontStyle: 'bold',
            stroke: '#333333'
        })
        newsContainer.add(headlineText)

        const issueText = scene.add.text(555, -153, '', {})
        issueText.setOrigin(1, 0)
        issueText.setStyle({
            align: 'right',
            color: '#333333',
            fontFamily: 'Burbank Small',
            fontSize: '20px',
            stroke: '#333333'
        })
        newsContainer.add(issueText)

        const dateText = scene.add.text(-560, -153, '', {})
        dateText.setStyle({
            color: '#333333',
            fontFamily: 'Burbank Small',
            fontSize: '20px',
            stroke: '#333333'
        })
        newsContainer.add(dateText)

        const hitArea = scene.add.rectangle(0, -150, 1200, 100)
        hitArea.fillColor = 0xdf0000
        this.add(hitArea)

        const btn = new SimpleButton(hitArea)
        btn.hoverCallback = () => this.onHover()
        btn.hoverOutCallback = () => this.onHoverOut()
        btn.callback = () => this.openNewspaper()

        this.headlineText = headlineText
        this.issueText = issueText
        this.dateText = dateText
        this.newsContainer = newsContainer
        this.crumbs = this.scene.crumbs
    }

    updateText() {
        this.issueNumber = this.crumbs.newspapers.length - this.issueOffset
        this.issue = this.crumbs.newspapers[this.issueNumber - 1]

        if (this.issue) {
            this.dateText.text = this.issue.date
            if (this.issue.notcanon) {
                this.issueText.visible = false
            } else {
                this.issueText.text = 'Issue #' + this.issueNumber
            }
            this.headlineText.text = this.issue.headline
        } else {
            this.newsContainer.visible = false
        }
    }

    onHover() {
        this.scene.tweens.add({
            targets: [this.newsContainer],
            y: { from: 0, to: -84 },
            ease: Phaser.Math.Easing.Expo.InOut,
            duration: 166
        })
    }

    onHoverOut() {
        this.scene.tweens.add({
            targets: [this.newsContainer],
            y: { from: -84, to: 0 },
            ease: 'Linear',
            duration: 208
        })
    }

    openNewspaper() {
        if (this.issue) {
            this.scene.interface.loadNewspaper(this.issueNumber - 1)
        }
    }
}


export default class Archives extends BaseDynamicWidget {

    constructor(scene, x, y) {
        super(scene, x ?? 760, y ?? 480)

        const block = scene.add.rectangle(-12, 10, 128, 90)
        block.scaleX = 12.517257088815434
        block.scaleY = 12.517257088815434
        block.alpha = 0.3
        block.isFilled = true
        block.fillColor = 0
        block.strokeColor = 0
        this.add(block)
        new Interactive(block)

        const bg = scene.add.image(0, 0, 'archives', 'bg')
        this.add(bg)

        const item5 = new ArchiveNewspaperItem(scene, 9, -111)
        item5.scaleX = 0.7
        item5.scaleY = 0.7
        item5.angle = 0
        this.add(item5)

        const item4 = new ArchiveNewspaperItem(scene, 7, -64)
        item4.scaleX = 0.73
        item4.scaleY = 0.73
        item4.angle = 1
        this.add(item4)

        const item3 = new ArchiveNewspaperItem(scene, 7, -12)
        item3.scaleX = 0.77
        item3.scaleY = 0.77
        item3.angle = -0.5
        this.add(item3)

        const item2 = new ArchiveNewspaperItem(scene, 9, 47)
        item2.scaleX = 0.81
        item2.scaleY = 0.81
        item2.angle = -1
        this.add(item2)

        const item1 = new ArchiveNewspaperItem(scene, 8, 111)
        item1.scaleX = 0.85
        item1.scaleY = 0.85
        item1.angle = 1
        this.add(item1)

        const item0 = new ArchiveNewspaperItem(scene, 9, 167)
        item0.scaleX = 0.9
        item0.scaleY = 0.9
        this.add(item0)

        const front = scene.add.image(3, 271, 'archives', 'front')
        this.add(front)

        const closeBtn = scene.add.image(646, -421, 'archives', 'closebtn')
        this.add(closeBtn)

        this.newspaperItems = [item0, item1, item2, item3, item4, item5]

        const close = new Button(closeBtn)
        close.spriteName = 'closebtn'
        close.callback = () => this.close()
        close.activeFrame = true

        item5.issueOffset = 6
        item4.issueOffset = 5
        item3.issueOffset = 4
        item2.issueOffset = 3
        item1.issueOffset = 2

        this.updateItems()
    }

    show(config) {
        super.show()
        this.updateItems(config)
    }

    updateItems(config) {
        this.newspaperItems.forEach(item => {
            if (config?.addedOffset !== undefined) {
                item.issueOffset = item.issueOffset + config.addedOffset
            }
            item.updateText()
        })
    }
}
