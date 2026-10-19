import BaseDynamicWidget from "../../../base/BaseDynamicWidget"
import DraggableContainer from "../../../components/DraggableContainer"
import Button from "../../../components/Button"
import Interactive from "../../../components/Interactive"


export default class Stampbook extends BaseDynamicWidget {

    get heldSprite() {
        return '1_3'
    }

    constructor(scene, x, y) {
        super(scene, x ?? 760, y ?? 480)

        const block = scene.add.rectangle(0, 0, 1520, 960)
        block.isFilled = true
        block.fillColor = 0
        block.fillAlpha = 0.3
        this.add(block)
        new Interactive(block)

        this.inner = scene.add.container(-760, -480)
        this.add(this.inner)

        const client = this.world.client
        this.stampbookInfo = client.stampbookInfo || { colour: 1, clasp: 1, highlight: 1, pattern: 0 }
        this.savedCoverStamps = client.coverStamps || []

        // ── Cover layer ──
        this.coverContainer = scene.add.container(0, 0)
        this.inner.add(this.coverContainer)

        this.editBackground = scene.add.image(760, 480, "stampbook-editor", "editBackground")
        this.editBackground.visible = false
        this.coverContainer.add(this.editBackground)

        this.coverBgImage = scene.add.image(760, 520)
        this.coverContainer.add(this.coverBgImage)

        const coverDrag = new DraggableContainer(this)
        coverDrag.handle = this.coverBgImage

        const stageClasp = scene.add.image(1341, 531, "stampbook-inside", "stageClasp")
        this.coverContainer.add(stageClasp)

        this.claspImage = scene.add.image(1324, 524)
        this.claspImage.visible = false
        this.coverContainer.add(this.claspImage)

        this.highlightImage = scene.add.image(1341, 530)
        this.highlightImage.visible = false
        this.highlightImage.setBlendMode(2)
        this.coverContainer.add(this.highlightImage)

        // Penguin name with shadow effect (CPJ uses 7 layers)
        const nameContainer = scene.add.container(244, 671)
        this.coverContainer.add(nameContainer)
        this.nameFields = []
        const nameShadows = [
            { x: 6, y: 8, color: "#4DE5AD", alpha: 0.3 },
            { x: 2, y: 0, color: "#000000", alpha: 0.2 },
            { x: 0, y: 0, color: "#000000", alpha: 0.2 },
            { x: 0, y: 4, color: "#000000", alpha: 0.2 },
            { x: 4, y: 10, color: "#4DE5AD", alpha: 0.3 },
            { x: 8, y: 12, color: "#4DE5AD", alpha: 0.3 },
            { x: 4, y: 6, color: "#38A87D", alpha: 1.0 },
        ]
        for (const s of nameShadows) {
            const t = scene.add.text(s.x, s.y, "", {
                fontFamily: "Burbank Small",
                fontSize: "108px",
                fontStyle: "bold",
                color: s.color
            })
            t.alpha = s.alpha
            nameContainer.add(t)
            this.nameFields.push(t)
        }

        // Stamp count with shadow effect (same pattern, 28px)
        const countContainer = scene.add.container(490, 803)
        this.coverContainer.add(countContainer)
        this.countFields = []
        const countShadows = [
            { x: 1.5, y: 2, color: "#4DE5AD", alpha: 0.3 },
            { x: 0.5, y: 0, color: "#000000", alpha: 0.2 },
            { x: 0, y: 0, color: "#000000", alpha: 0.2 },
            { x: 0, y: 1, color: "#000000", alpha: 0.2 },
            { x: 1, y: 2.5, color: "#4DE5AD", alpha: 0.3 },
            { x: 2, y: 3, color: "#4DE5AD", alpha: 0.3 },
            { x: 1, y: 1.5, color: "#38A87D", alpha: 1.0 },
        ]
        for (const s of countShadows) {
            const t = scene.add.text(s.x, s.y, "", {
                fontFamily: "Burbank Small",
                fontSize: "28px",
                fontStyle: "bold",
                color: s.color
            })
            t.alpha = s.alpha
            countContainer.add(t)
            this.countFields.push(t)
        }

        this.coloredFields = [
            this.nameFields[0], this.nameFields[4], this.nameFields[5], this.nameFields[6],
            this.countFields[0], this.countFields[4], this.countFields[5], this.countFields[6]
        ]

        const claspBtn = new Button(stageClasp)
        claspBtn.spriteName = "stageClasp"
        claspBtn.callback = () => this.openBook()
        claspBtn.activeFrame = true

        const coverClose = scene.add.image(1342, 200, "stampbook-inside", "closebtn")
        this.coverContainer.add(coverClose)
        const coverCloseBtn = new Button(coverClose)
        coverCloseBtn.spriteName = "closebtn"
        coverCloseBtn.callback = () => this.close()
        coverCloseBtn.activeFrame = true

        // Cover stamp container (for draggable stamps placed on cover)
        this.coverStampContainer = scene.add.container(760, 480)
        this.coverContainer.add(this.coverStampContainer)

        // Edit button
        this.editBtn = scene.add.image(1471, 906, "stampbook-editor", "edit")
        this.editBtn.visible = false
        this.coverContainer.add(this.editBtn)
        const editButton = new Button(this.editBtn)
        editButton.spriteName = "edit"
        editButton.callback = () => this.onEdit()
        editButton.activeFrame = true

        // ── Editor layer ──
        this.editorContainer = scene.add.container(51, 0)
        this.editorContainer.visible = false
        this.coverContainer.add(this.editorContainer)

        const coverlist = scene.add.image(745, 0, "stampbook-editor", "coverlist")
        coverlist.setOrigin(0.5, 0)
        this.editorContainer.add(coverlist)

        // Clonable stamps container (inside coverlist bar, offset back to global x=0)
        this.clonableStampsContainer = scene.add.container(-51, 0)
        this.editorContainer.add(this.clonableStampsContainer)
        this.clonableOffset = 0
        this.clonableSlots = []

        const editorUi = scene.add.image(0, 303, "stampbook-editor", "editorui")
        this.editorContainer.add(editorUi)

        // Tool button thumbs (CPJ Thumb pattern: colorTool frame + colourThumb bg + typeThumb + overlay)
        this.thumbs = {}
        const thumbDefs = [
            { type: "colour", y: 219, popupY: 222 },
            { type: "highlight", y: 334, popupY: 335 },
            { type: "pattern", y: 450, popupY: 451 },
            { type: "clasp", y: 566, popupY: 566 },
        ]
        for (const def of thumbDefs) {
            const thumb = this.createThumbPreview(scene, 23, def.y)
            this.editorContainer.add(thumb.container)
            this.thumbs[def.type] = thumb

            const rect = scene.add.rectangle(23, def.y, 128, 90)
            this.editorContainer.add(rect)
            new Interactive(rect)
            rect.on("pointerup", () => this.toggleSelectionBox(def.type, 192, def.popupY))
        }

        // Left/right arrows for clonable stamps pagination
        this.clonableLeftArrow = scene.add.image(260, 60, "stampbook-inside", "upArrow")
        this.clonableLeftArrow.angle = -90
        this.clonableLeftArrow.visible = false
        this.clonableStampsContainer.add(this.clonableLeftArrow)
        const clonableLeftBtn = new Button(this.clonableLeftArrow)
        clonableLeftBtn.spriteName = "upArrow"
        clonableLeftBtn.callback = () => this.onClonableLeft()
        clonableLeftBtn.activeFrame = true

        this.clonableRightArrow = scene.add.image(1440, 60, "stampbook-inside", "upArrow")
        this.clonableRightArrow.angle = 90
        this.clonableRightArrow.visible = false
        this.clonableStampsContainer.add(this.clonableRightArrow)
        const clonableRightBtn = new Button(this.clonableRightArrow)
        clonableRightBtn.spriteName = "upArrow"
        clonableRightBtn.callback = () => this.onClonableRight()
        clonableRightBtn.activeFrame = true

        // Save button
        const saveBtn = scene.add.image(1414, 908, "stampbook-editor", "save")
        this.editorContainer.add(saveBtn)
        const saveButton = new Interactive(saveBtn)
        saveBtn.on("pointerup", () => this.onSave())

        this.selectionBox = null
        this.draggingStamp = null
        this.dragOffsetX = 0
        this.dragOffsetY = 0
        this.setupCoverDragListeners()

        // ── Inside layer ──
        this.insideContainer = scene.add.container(0, 0)
        this.insideContainer.visible = false
        this.inner.add(this.insideContainer)

        const page = scene.add.image(717, 480, "stampbook-inside", "insidePage")
        this.insideContainer.add(page)

        const insideDrag = new DraggableContainer(this)
        insideDrag.handle = page

        this.pageBackground = scene.add.image(40, 852)
        this.pageBackground.setOrigin(0, 1)
        this.pageBackground.visible = false
        this.insideContainer.add(this.pageBackground)

        const clips = scene.add.image(19, 477, "stampbook-inside", "clips")
        this.insideContainer.add(clips)

        this.insideLines = scene.add.image(766, 140, "stampbook-inside", "insideLines")
        this.insideContainer.add(this.insideLines)

        this.categoryImage = scene.add.image(225, 127)
        this.categoryImage.setScale(0.55)
        this.categoryImage.visible = false
        this.insideContainer.add(this.categoryImage)

        this.categoryTitle = scene.add.text(292, 125, "", {
            fontFamily: "Burbank Small, Arial",
            fontSize: "50px",
            fontStyle: "bold",
            color: "#666666"
        })
        this.categoryTitle.setOrigin(0, 0.5)
        this.insideContainer.add(this.categoryTitle)

        this.categoryTitleSmall = scene.add.text(1173, 100, "", {
            fontFamily: "Burbank Small, Arial",
            fontSize: "26px",
            fontStyle: "bold",
            color: "#666666",
            align: "right"
        })
        this.categoryTitleSmall.setOrigin(1, 0)
        this.insideContainer.add(this.categoryTitleSmall)

        this.collectedStampsText = scene.add.text(1173, 132, "", {
            fontFamily: "Burbank Small, Arial",
            fontSize: "26px",
            fontStyle: "bold",
            color: "#666666",
            align: "right"
        })
        this.collectedStampsText.setOrigin(1, 0)
        this.insideContainer.add(this.collectedStampsText)

        this.pageText = scene.add.text(1202, 109, "Page", {
            fontFamily: "Burbank Small, Arial",
            fontSize: "20px",
            color: "#666666"
        })
        this.insideContainer.add(this.pageText)

        this.pageNumberText = scene.add.text(1202, 136, "", {
            fontFamily: "Burbank Small, Arial",
            fontSize: "20px",
            color: "#666666"
        })
        this.insideContainer.add(this.pageNumberText)

        this.stampContainer = scene.add.container(0, 0)
        this.insideContainer.add(this.stampContainer)

        const exitBtn = scene.add.image(1377, 160, "stampbook-inside", "pageCurlExit")
        exitBtn.scaleY = -1
        this.insideContainer.add(exitBtn)
        const exitButton = new Button(exitBtn)
        exitButton.spriteName = "pageCurlExit"
        exitButton.callback = () => this.close()
        exitButton.activeFrame = true
        exitButton.pixelPerfect = true

        this.nextPageBtn = scene.add.image(1374, 761, "stampbook-inside", "pageCurl04")
        this.insideContainer.add(this.nextPageBtn)
        const nextButton = new Button(this.nextPageBtn)
        nextButton.spriteName = "pageCurl04"
        nextButton.callback = () => this.onNext()

        this.prevPageBtn = scene.add.image(100, 762, "stampbook-inside", "pageCurl03")
        this.prevPageBtn.flipX = true
        this.insideContainer.add(this.prevPageBtn)
        const prevButton = new Button(this.prevPageBtn)
        prevButton.spriteName = "pageCurl03"
        prevButton.callback = () => this.onPrev()

        this.coverBtn = scene.add.image(98, 151, "stampbook-inside", "pageCurlCover")
        this.coverBtn.angle = 180
        this.insideContainer.add(this.coverBtn)
        const coverButton = new Button(this.coverBtn)
        coverButton.spriteName = "pageCurlCover"
        coverButton.callback = () => this.onCover()
        coverButton.activeFrame = true
        coverButton.pixelPerfect = true

        this.upArrow = scene.add.image(1332, 255, "stampbook-inside", "upArrow")
        this.insideContainer.add(this.upArrow)
        const upBtn = new Button(this.upArrow)
        upBtn.spriteName = "upArrow"
        upBtn.callback = () => this.onScrollUp()
        upBtn.activeFrame = true

        this.downArrow = scene.add.image(1332, 740, "stampbook-inside", "downArrow")
        this.insideContainer.add(this.downArrow)
        const downBtn = new Button(this.downArrow)
        downBtn.spriteName = "downArrow"
        downBtn.callback = () => this.onScrollDown()
        downBtn.activeFrame = true

        this.tabContainer = scene.add.container(0, 0)
        this.insideContainer.add(this.tabContainer)

        this.tooltipContainer = null

        this.allGroups = []
        this.pages = []
        this.page = 0
        this.offset = 0

        this.stampRows = 4
        this.stampCols = 4
        this.stampsPerPage = 16

        this.pinCols = 7
        this.pinRows = 4
        this.pinsPerPage = 28

        this.loadedImages = new Set()

        this.buildPages()
        this.updatePage()
    }

    // ── Cover ──

    get userColour() { return this.stampbookInfo.colour }
    set userColour(v) { this.stampbookInfo.colour = v }

    get userClasp() { return this.stampbookInfo.clasp }
    set userClasp(v) { this.stampbookInfo.clasp = v }

    get userHighlightUnadjusted() { return this.stampbookInfo.highlight }
    set userHighlightUnadjusted(v) { this.stampbookInfo.highlight = v }

    get userHighlight() { return this.userHighlightUnadjusted + (this.userColour - 1) * 3 }
    set userHighlight(v) { this.userHighlightUnadjusted = v - (this.userColour - 1) * 3 }

    get userPattern() { return this.stampbookInfo.pattern }
    set userPattern(v) { this.stampbookInfo.pattern = v }

    get textColor() {
        const highlights = this.crumbs.cover?.highlight
        if (!highlights) return "0x38A87D"
        return highlights[this.userHighlight] || "0x38A87D"
    }

    updateTextColor() {
        const cssColor = "#" + this.textColor.slice(2)
        for (const field of this.coloredFields) {
            field.setStyle({ ...field.style, color: cssColor })
        }
    }

    createThumbPreview(scene, x, y) {
        const container = scene.add.container(x, y)
        const frame = scene.add.image(-2, 1, "stampbook-editor", "colorTool")
        container.add(frame)
        const bg = scene.add.image(0, 0)
        bg.visible = false
        container.add(bg)
        const main = scene.add.image(0, 0)
        main.visible = false
        container.add(main)
        const overlay = scene.add.image(0, 0)
        overlay.visible = false
        overlay.setBlendMode(2)
        container.add(overlay)
        const removeIcon = scene.add.image(0, -1, "stampbook-editor", "removePattern")
        removeIcon.visible = false
        container.add(removeIcon)
        return { container, bg, main, overlay, removeIcon }
    }

    loadThumbImage(dir, value, imageObj) {
        const key = `sb-thumb-${dir}-${value}`
        const path = `assets/media/interface/game/stampbook/${dir}/${value}.png`
        this.loadImage(key, path, () => {
            if (imageObj?.active !== false) {
                imageObj.setTexture(key)
                imageObj.visible = true
            }
        })
        if (this.scene.textures.exists(key)) {
            imageObj.setTexture(key)
            imageObj.visible = true
        }
    }

    updateEditorThumbs() {
        for (const [type, thumb] of Object.entries(this.thumbs)) {
            this.loadThumbImage("colourThumb", this.userColour, thumb.bg)
            const value = type === "colour" ? this.userColour
                : type === "highlight" ? this.userHighlight
                : type === "pattern" ? this.userPattern
                : this.userClasp
            if (type === "pattern" && value === 0) {
                thumb.main.visible = false
            } else {
                this.loadThumbImage(type + "Thumb", value, thumb.main)
            }
            if (type === "clasp") {
                this.loadThumbImage("claspHighlightThumb", this.userHighlight, thumb.overlay)
            } else {
                thumb.overlay.visible = false
            }
            thumb.removeIcon.visible = type === "pattern" && this.userPattern === 0
        }
    }

    showCoverContent() {
        const client = this.world.client
        const username = client.username || "Penguin"
        const earned = (client.stamps || []).length
        const total = this.getAllStampCount()

        for (const f of this.nameFields) f.text = username
        const countText = `Total Stamps: ${earned}/${total}`
        for (const f of this.countFields) f.text = countText

        this.loadCoverBackground()
        this.loadCoverClasp()
        this.loadCoverHighlight()
        this.updateTextColor()
        this.loadSavedCoverStamps()

        this.editBtn.visible = !this.editorContainer.visible
    }

    loadSavedCoverStamps() {
        if (this._coverStampsLoaded) return
        this._coverStampsLoaded = true

        for (const data of this.savedCoverStamps) {
            const img = this.scene.add.image(data.x, data.y)
            img.angle = data.rotation || 0
            img.visible = false
            img.stampId = data.stampId || 0
            img.itemId = data.itemId || 0

            if (data.stampId) {
                this.loadStampImage(data.stampId, img, null)
            } else if (data.itemId) {
                img.setScale(0.75)
                this.loadPinIcon(data.itemId, img, null, true)
            }

            this.coverStampContainer.add(img)
            this.makeCoverStampDraggable(img)
        }
    }

    loadCoverBackground() {
        const key = `sb-cover-${this.userColour}_${this.userPattern}`
        const path = `assets/media/interface/game/stampbook/coverBackground/${this.userColour}_${this.userPattern}.png`
        this.loadImage(key, path, () => {
            if (this.coverBgImage?.active !== false) {
                this.coverBgImage.setTexture(key)
                this.coverBgImage.visible = true
            }
        })
        if (this.scene.textures.exists(key)) {
            this.coverBgImage.setTexture(key)
            this.coverBgImage.visible = true
        }
    }

    loadCoverClasp() {
        const key = `sb-clasp-${this.userClasp}`
        const path = `assets/media/interface/game/stampbook/clasp/${this.userClasp}.png`
        this.loadImage(key, path, () => {
            if (this.claspImage?.active !== false) {
                this.claspImage.setTexture(key)
                this.claspImage.visible = true
            }
        })
        if (this.scene.textures.exists(key)) {
            this.claspImage.setTexture(key)
            this.claspImage.visible = true
        }
    }

    loadCoverHighlight() {
        const key = `sb-highlight-${this.userHighlight}`
        const path = `assets/media/interface/game/stampbook/highlight/${this.userHighlight}.png`
        this.loadImage(key, path, () => {
            if (this.highlightImage?.active !== false) {
                this.highlightImage.setTexture(key)
                this.highlightImage.visible = true
            }
        })
        if (this.scene.textures.exists(key)) {
            this.highlightImage.setTexture(key)
            this.highlightImage.visible = true
        }
    }

    // ── Editor ──

    onEdit() {
        this.editorContainer.visible = true
        this.editBackground.visible = true
        this.editBtn.visible = false
        this.updateEditorThumbs()
        this.loadClonableStamps()
    }

    onSave() {
        this.closeSelectionBox()
        this.editorContainer.visible = false
        this.editBackground.visible = false
        this.editBtn.visible = true

        const coverStamps = this.coverStampContainer.list.map(img => ({
            x: Math.round(img.x),
            y: Math.round(img.y),
            rotation: Math.round(img.angle),
            stampId: img.stampId || 0,
            itemId: img.itemId || 0
        }))

        const client = this.world.client
        client.stampbookInfo = this.stampbookInfo
        client.coverStamps = coverStamps

        this.network.send('update_stampbook', {
            stampbookInfo: this.stampbookInfo,
            coverStamps: coverStamps
        })
    }

    toggleSelectionBox(type, bx, by) {
        if (this.selectionBox && this.selectionBox.itemType === type) {
            this.closeSelectionBox()
            return
        }
        this.closeSelectionBox()

        const cover = this.crumbs.cover
        if (!cover) return

        let options = []
        if (type === "colour") {
            options = Object.keys(cover.color_highlight).map(Number)
        } else if (type === "highlight") {
            options = (cover.color_highlight[this.userColour] || []).map(Number)
        } else if (type === "pattern") {
            options = cover.pattern.map(Number)
        } else if (type === "clasp") {
            options = cover.clasp.map(Number)
        }
        if (options.length === 0) return

        const container = this.scene.add.container(bx, by)
        this.editorContainer.add(container)

        // CPJ EditorSelectionBox: bg at (-122, 1) with origin(0, 0.5)
        const hasTwoCols = options.length >= 4
        const bgW = hasTwoCols ? 244 : 122
        const bgH = 248

        const bg = this.scene.add.nineslice(-122, 1, "stampbook-editor", "selectionBackground", bgW, bgH, 24, 20, 25, 27)
        bg.setOrigin(0, 0.5)
        bg.alpha = 0.9
        container.add(bg)

        // Dismiss area
        const dismissRect = this.scene.add.rectangle(0, 0, 3040, 1840)
        container.add(dismissRect)
        container.sendToBack(dismissRect)
        new Interactive(dismissRect)
        dismissRect.on("pointerup", () => this.closeSelectionBox())

        // CPJ grid: 2 columns at x=-59/+61, 3 rows at y=-80/0/+80, cell size 119x80
        const colXs = hasTwoCols ? [-59, 61] : [-59]
        const rowYs = [-80, 0, 80]

        for (let i = 0; i < options.length && i < 6; i++) {
            const col = hasTwoCols ? i % 2 : 0
            const row = hasTwoCols ? Math.floor(i / 2) : i
            const cx = colXs[col]
            const cy = rowYs[row]

            const rect = this.scene.add.rectangle(cx, cy, 119, 80)
            rect.alpha = 0.91
            rect.fillColor = 0x98caea
            container.add(rect)
            new Interactive(rect)

            const optVal = options[i]

            // Thumb preview (colourThumb bg + type thumb) at scale 0.66
            const thumbContainer = this.scene.add.container(cx, cy)
            thumbContainer.setScale(0.66)
            container.add(thumbContainer)

            const thumbBg = this.scene.add.image(0, 0)
            thumbBg.visible = false
            thumbContainer.add(thumbBg)
            this.loadThumbImage("colourThumb", type === "colour" ? optVal : this.userColour, thumbBg)

            const thumbMain = this.scene.add.image(0, 0)
            thumbMain.visible = false
            thumbContainer.add(thumbMain)
            if (type === "pattern" && (optVal <= 0)) {
                const removeIcon = this.scene.add.image(0, -1, "stampbook-editor", "removePattern")
                removeIcon.setScale(1 / 0.66)
                thumbContainer.add(removeIcon)
            } else {
                this.loadThumbImage(type + "Thumb", optVal, thumbMain)
            }

            if (type === "clasp") {
                const thumbOverlay = this.scene.add.image(0, 0)
                thumbOverlay.visible = false
                thumbOverlay.setBlendMode(2)
                thumbContainer.add(thumbOverlay)
                this.loadThumbImage("claspHighlightThumb", this.userHighlight, thumbOverlay)
            }

            if (type === "pattern" && optVal > 0 && optVal === this.userPattern) {
                const selRemove = this.scene.add.image(0, -1, "stampbook-editor", "removePattern")
                selRemove.setScale(1 / 0.66)
                thumbContainer.add(selRemove)
            }

            rect.on("pointerover", () => { rect.isFilled = true })
            rect.on("pointerout", () => { rect.isFilled = false })
            rect.on("pointerup", () => {
                if (type === "pattern" && optVal === this.userPattern) {
                    this.selectOption(type, 0)
                } else {
                    this.selectOption(type, optVal)
                }
                this.closeSelectionBox()
            })
        }

        // Dividers
        const hDiv = this.scene.add.nineslice(-115, 39, "stampbook-editor", "selectionMenuHorizontalDivider", hasTwoCols ? 230 : 110, 5, 4, 9, 2, 1)
        hDiv.setOrigin(0, 0.5)
        hDiv.setBlendMode(2)
        container.add(hDiv)

        const hDiv2 = this.scene.add.nineslice(-115, -39, "stampbook-editor", "selectionMenuHorizontalDivider", hasTwoCols ? 230 : 110, 5, 4, 9, 2, 1)
        hDiv2.setOrigin(0, 0.5)
        hDiv2.setBlendMode(2)
        container.add(hDiv2)

        if (hasTwoCols) {
            const vDiv = this.scene.add.nineslice(0, 0, "stampbook-editor", "selectionMenuVerticalDivider", 5, 240, 1, 1, 7, 10)
            vDiv.setBlendMode(2)
            container.add(vDiv)
        }

        container.itemType = type
        this.selectionBox = container
    }

    closeSelectionBox() {
        if (this.selectionBox) {
            this.selectionBox.destroy()
            this.selectionBox = null
        }
    }

    selectOption(type, value) {
        if (type === "colour") {
            this.userColour = value
            this.userHighlightUnadjusted = 1
        } else if (type === "highlight") {
            this.userHighlight = value
        } else if (type === "pattern") {
            this.userPattern = value
        } else if (type === "clasp") {
            this.userClasp = value
        }
        this.showCoverContent()
        this.updateEditorThumbs()
    }

    // ── Clonable Stamps Strip ──

    loadClonableStamps() {
        for (const slot of this.clonableSlots) {
            if (slot.active !== false) slot.destroy()
        }
        this.clonableSlots = []

        const allStamps = this.getClonableItems()
        const slotsPerPage = 10
        const pageItems = allStamps.slice(this.clonableOffset * slotsPerPage, (this.clonableOffset + 1) * slotsPerPage)

        for (let i = 0; i < pageItems.length; i++) {
            const item = pageItems[i]
            const sx = 284 + 114 * i
            const sy = 68

            const slot = this.scene.add.container(sx, sy)
            slot.setScale(0.5)
            this.clonableStampsContainer.add(slot)
            this.clonableSlots.push(slot)

            const img = this.scene.add.image(0, 0)
            img.visible = false
            slot.add(img)

            if (item.type === 0) {
                this.loadStampImage(item.id, img, null)
            } else {
                this.loadPinIcon(item.id, img, null)
            }

            const hitArea = this.scene.add.rectangle(0, 0, 200, 160)
            slot.add(hitArea)
            new Interactive(hitArea)
            hitArea.on("pointerdown", (pointer) => {
                this.cloneStampToCover(item, pointer)
            })
        }

        const totalPages = Math.ceil(allStamps.length / slotsPerPage)
        this.clonableLeftArrow.visible = this.clonableOffset > 0
        this.clonableRightArrow.visible = this.clonableOffset < totalPages - 1
    }

    getClonableItems() {
        const items = []
        const stamps = this.world.client.stamps || []
        for (const sid of stamps) {
            items.push({ type: 0, id: sid })
        }
        const pins = this.getOwnedPins()
        for (const pid of pins) {
            items.push({ type: 1, id: pid })
        }
        return items
    }

    cloneStampToCover(item, pointer) {
        if (this.coverStampContainer.list.length >= 100) return

        const isPin = item.type === 1
        const img = this.scene.add.image(0, 0)
        img.visible = false
        if (isPin) img.setScale(0.75)
        this.coverStampContainer.add(img)

        img.stampId = isPin ? 0 : item.id
        img.itemId = isPin ? item.id : 0

        if (!isPin) {
            const key = `sb-stamp-${item.id}`
            if (this.scene.textures.exists(key)) {
                img.setTexture(key)
                img.visible = true
            } else {
                this.loadStampImage(item.id, img, null)
            }
        } else {
            const key = `clothing/icon/240/${item.id}`
            if (this.scene.textures.exists(key)) {
                img.setTexture(key)
                img.visible = true
            } else {
                this.loadPinIcon(item.id, img, null, true)
            }
        }

        img.x = 0
        img.y = 0

        this.makeCoverStampDraggable(img)

        this.draggingStamp = img
        this.dragOffsetX = 0
        this.dragOffsetY = 0
    }

    makeCoverStampDraggable(img) {
        img.setInteractive()

        img.on("pointerdown", (pointer) => {
            if (pointer.rightButtonDown()) {
                img.destroy()
                if (this.draggingStamp === img) this.draggingStamp = null
                return
            }
            this.draggingStamp = img
            this.dragOffsetX = img.x - (pointer.worldX - 760)
            this.dragOffsetY = img.y - (pointer.worldY - 480)
        })
    }

    setupCoverDragListeners() {
        if (this._coverDragSetup) return
        this._coverDragSetup = true

        this.scene.input.on("pointermove", (pointer) => {
            if (this.draggingStamp && this.draggingStamp.active !== false) {
                this.draggingStamp.x = pointer.worldX - 760 + this.dragOffsetX
                this.draggingStamp.y = pointer.worldY - 480 + this.dragOffsetY
            }
        })

        this.scene.input.on("pointerup", () => {
            this.draggingStamp = null
        })
    }

    onClonableLeft() {
        if (this.clonableOffset > 0) {
            this.clonableOffset--
            this.loadClonableStamps()
        }
    }

    onClonableRight() {
        this.clonableOffset++
        this.loadClonableStamps()
    }

    // ── Navigation ──

    openBook() {
        this.page = 1
        this.offset = 0
        this.updatePage()
    }

    buildPages() {
        const groups = this.crumbs.stamps
        if (!groups) return

        this.allGroups = groups
        this.pages = groups

        const client = this.world.client
        this.earnedSet = new Set(client.stamps || [])

        for (const group of groups) {
            if (group.parent_group_id === 0 && group.group_id !== 0) {
                this.loadImage(`sb-hdr-${group.group_id}`, `assets/media/interface/game/stampbook/categoryHeader/${group.group_id}.png`, () => {})
                this.loadImage(`sb-tab-active-${group.group_id}`, `assets/media/interface/game/stampbook/category/active/${group.group_id}.png`, () => {})
                this.loadImage(`sb-tab-inactive-${group.group_id}`, `assets/media/interface/game/stampbook/category/inactive/${group.group_id}.png`, () => {})
            }
        }
    }

    loadImage(key, path, callback) {
        if (this.scene.textures.exists(key)) {
            callback()
            return
        }
        if (this.loadedImages.has(key)) return
        this.loadedImages.add(key)

        this.scene.load.image(key, path)
        this.scene.load.once(`filecomplete-image-${key}`, () => {
            if (this.scene) callback()
        })
        this.scene.load.start()
    }

    loadPageBackground(groupId) {
        const key = `sb-bg-${groupId}`
        this.loadImage(key, `assets/media/interface/game/stampbook/insidePagesBackground/${groupId}.png`, () => {
            if (this.pageBackground && this.pageBackground.active !== false) {
                this.pageBackground.setTexture(key)
                this.pageBackground.visible = true
            }
        })
        if (this.scene.textures.exists(key)) {
            this.pageBackground.setTexture(key)
            this.pageBackground.visible = true
        } else {
            this.pageBackground.visible = false
        }
    }

    loadCategoryHeader(groupId) {
        const key = `sb-hdr-${groupId}`
        this.loadImage(key, `assets/media/interface/game/stampbook/categoryHeader/${groupId}.png`, () => {
            if (this.categoryImage && this.categoryImage.active !== false) {
                this.categoryImage.setTexture(key)
                this.categoryImage.visible = true
            }
        })
        if (this.scene.textures.exists(key)) {
            this.categoryImage.setTexture(key)
            this.categoryImage.visible = true
        } else {
            this.categoryImage.visible = false
        }
    }

    loadStampImage(stampId, imageObj, spinner) {
        const key = `sb-stamp-${stampId}`
        const destroySpinner = () => {
            if (spinner && spinner.active !== false) spinner.destroy()
        }
        this.loadImage(key, `assets/media/interface/game/stampbook/stamps/${stampId}.png`, () => {
            if (imageObj && imageObj.active !== false) {
                imageObj.setTexture(key)
                imageObj.visible = true
            }
            destroySpinner()
        })
        if (this.scene.textures.exists(key)) {
            imageObj.setTexture(key)
            imageObj.visible = true
            destroySpinner()
        }
    }

    loadPinIcon(itemId, imageObj, spinner, big = false) {
        const size = big ? 240 : 120
        const key = `clothing/icon/${size}/${itemId}`
        const path = `assets/media/clothing/icon/${size}/${itemId}.png`
        const destroySpinner = () => {
            if (spinner && spinner.active !== false) spinner.destroy()
        }
        this.loadImage(key, path, () => {
            if (imageObj && imageObj.active !== false) {
                imageObj.setTexture(key)
                imageObj.visible = true
            }
            destroySpinner()
        })
        if (this.scene.textures.exists(key)) {
            imageObj.setTexture(key)
            imageObj.visible = true
            destroySpinner()
        }
    }

    buildTabs() {
        this.tabContainer.removeAll(true)

        const topLevel = this.allGroups.filter(g => g.parent_group_id === 0 && !g.is_contents_page)
        const currentGroup = this.page > 0 ? this.pages[this.page - 1] : null
        const currentTopId = currentGroup ? this.getTopLevelParent(currentGroup.group_id) : null

        let i = 0
        for (const group of topLevel) {
            const tabX = 1471
            const tabY = 275 + 80 * i

            const isActive = currentTopId === group.group_id
            const frameName = isActive ? "iconTabButton-selected" : "iconTabButton"
            const tab = this.scene.add.image(tabX, tabY, "stampbook-inside", frameName)
            this.tabContainer.add(tab)

            const selectedTab = this.scene.add.image(tabX, tabY, "stampbook-inside", "iconTabButton-selected")
            selectedTab.visible = isActive
            this.tabContainer.add(selectedTab)
            tab.visible = !isActive

            const hdrKey = `sb-hdr-${group.group_id}`
            const hdrPath = `assets/media/interface/game/stampbook/categoryHeader/${group.group_id}.png`

            const addIcon = () => {
                if (!this.tabContainer || !this.tabContainer.active) return
                const icon = this.scene.add.image(tabX - 3, tabY, hdrKey)
                icon.setScale(0.45)
                this.tabContainer.add(icon)
            }

            if (this.scene.textures.exists(hdrKey)) {
                addIcon()
            } else {
                this.loadImage(hdrKey, hdrPath, addIcon)
            }

            const tabBtn = new Button(tab)
            tabBtn.spriteName = "iconTabButton"
            tabBtn.callback = () => this.setCategory(group)
            tabBtn.activeFrame = true

            i++
        }
    }

    getTopLevelParent(groupId) {
        const group = this.allGroups.find(g => g.group_id === groupId)
        if (!group) return groupId
        if (group.parent_group_id === 0 || group.is_contents_page) return groupId
        return this.getTopLevelParent(group.parent_group_id)
    }

    updatePage() {
        this.clearStamps()

        if (this.page === 0) {
            this.coverContainer.visible = true
            this.insideContainer.visible = false
            this.showCoverContent()
        } else {
            this.coverContainer.visible = false
            this.insideContainer.visible = true
            this.editorContainer.visible = false
            this.editBackground.visible = false
            this.buildTabs()

            const category = this.pages[this.page - 1]
            if (category) {
                this.loadPageBackground(category.group_id)
                if (!category.is_contents_page) {
                    this.loadCategoryHeader(category.group_id)
                }
                if (category.is_contents_page) {
                    this.showContents()
                } else if (category.is_pins_page) {
                    this.showPins()
                } else if (category.stamps && category.stamps.length > 0) {
                    this.showStamps(category)
                } else {
                    this.showSubgroups(category)
                }
            }

            this.updateNavVisibility()
        }
    }

    showContents() {
        this.categoryTitle.text = "Stamp Book"
        this.categoryTitle.x = 292

        const totalEarned = this.earnedSet.size
        const totalAll = this.getAllStampCount()
        this.categoryTitleSmall.text = "Total Stamps:"
        this.collectedStampsText.text = `${totalEarned}/${totalAll}`
        this.categoryImage.visible = false
        this.insideLines.visible = true
        this.pageBackground.visible = false

        this.pageText.visible = true
        this.pageNumberText.visible = true
        this.pageNumberText.text = `${this.page} of ${this.pages.length}`

        this.coverBtn.visible = true
        this.upArrow.visible = false
        this.downArrow.visible = false

        this.loadPageBackground(0)

        const topLevel = this.allGroups.filter(g => g.parent_group_id === 0)

        this.addCategoryRows(topLevel, 2, 400)
    }

    showSubgroups(category) {
        this.categoryTitle.text = category.name
        this.categoryTitle.x = 292
        this.categoryImage.visible = true
        this.insideLines.visible = true

        const subgroups = this.allGroups.filter(g => g.parent_group_id === category.group_id)
        const allStamps = this.getStampsForGroup(category)
        const earned = allStamps.filter(s => this.earnedSet.has(s.stamp_id)).length

        this.categoryTitleSmall.text = `${category.name}:`
        this.collectedStampsText.text = `${earned}/${allStamps.length}`
        this.pageText.visible = true
        this.pageNumberText.visible = true
        this.pageNumberText.text = `${this.page} of ${this.pages.length}`
        this.coverBtn.visible = true

        this.upArrow.x = 1259
        this.upArrow.y = 242
        this.downArrow.x = 1259
        this.downArrow.y = 613

        this.addCategoryRows(subgroups, 3, 362)

        const categoriesPerPage = 15
        this.upArrow.visible = this.offset > 0
        this.downArrow.visible = subgroups.length > (this.offset + 1) * categoriesPerPage
    }

    addCategoryRows(groups, cols, stepX) {
        const baseX = 223
        const baseY = 237
        const stepY = 90

        let idx = 0
        for (const group of groups) {
            const allStamps = this.getStampsForGroup(group)
            if (allStamps.length === 0 && !group.is_pins_page) continue

            const col = idx % cols
            const row = Math.floor(idx / cols)
            const cx = baseX + stepX * col
            const cy = baseY + stepY * row

            const earned = allStamps.filter(s => this.earnedSet.has(s.stamp_id)).length
            const total = allStamps.length

            const rect = this.scene.add.rectangle(cx - 61, cy + 5, 250, 50)
            rect.setOrigin(0, 0.5)
            rect.fillColor = 0xFF2D2D
            this.stampContainer.add(rect)
            new Interactive(rect)

            const inactiveKey = `sb-tab-inactive-${group.group_id}`
            const activeKey = `sb-tab-active-${group.group_id}`
            const inactivePath = `assets/media/interface/game/stampbook/category/inactive/${group.group_id}.png`
            const activePath = `assets/media/interface/game/stampbook/category/active/${group.group_id}.png`

            const inactiveIcon = this.scene.add.image(cx - 22, cy + 6)
            inactiveIcon.setScale(0.9)
            this.stampContainer.add(inactiveIcon)

            const activeIcon = this.scene.add.image(cx - 22, cy + 6)
            activeIcon.setScale(0.9)
            activeIcon.visible = false
            this.stampContainer.add(activeIcon)

            if (this.scene.textures.exists(inactiveKey)) {
                inactiveIcon.setTexture(inactiveKey)
            } else {
                this.loadImage(inactiveKey, inactivePath, () => {
                    if (inactiveIcon.active !== false) inactiveIcon.setTexture(inactiveKey)
                })
            }

            if (this.scene.textures.exists(activeKey)) {
                activeIcon.setTexture(activeKey)
            } else {
                this.loadImage(activeKey, activePath, () => {
                    if (activeIcon.active !== false) activeIcon.setTexture(activeKey)
                })
            }

            const nameText = this.scene.add.text(cx + 22, cy - 6, group.name, {
                fontFamily: "Burbank Small, Arial",
                fontSize: "25px",
                fontStyle: "bold",
                color: "#666666",
                stroke: "#666666"
            })
            this.stampContainer.add(nameText)

            rect.on('pointerover', () => {
                nameText.setStyle({ color: "#343434", stroke: "#343434", fontFamily: "Burbank Small, Arial", fontSize: "25px", fontStyle: "bold" })
                activeIcon.visible = true
                inactiveIcon.visible = false
            })
            rect.on('pointerout', () => {
                nameText.setStyle({ color: "#666666", stroke: "#666666", fontFamily: "Burbank Small, Arial", fontSize: "25px", fontStyle: "bold" })
                activeIcon.visible = false
                inactiveIcon.visible = true
            })
            rect.on('pointerup', () => this.setCategory(group))

            let countStr
            if (group.is_pins_page) {
                const ownedPins = this.getOwnedPins()
                countStr = `${ownedPins.length} pins`
            } else {
                countStr = `${earned}/${total}`
            }

            const countText = this.scene.add.text(cx + 22, cy + 18, countStr, {
                fontFamily: "Burbank Small, Arial",
                fontSize: "18px",
                color: earned > 0 || group.is_pins_page ? "#339933" : "#999999"
            })
            this.stampContainer.add(countText)

            idx++
        }
    }

    // ── Pins page ──

    getOwnedPins() {
        const inventory = this.world.client.inventory
        if (!inventory || !inventory.award) return []
        return inventory.award
    }

    showPins() {
        this.categoryTitle.text = "Pins"
        this.categoryTitle.x = 292
        this.categoryImage.visible = true
        this.insideLines.visible = true

        this.loadCategoryHeader(9001)

        const pins = this.getOwnedPins()

        this.categoryTitleSmall.text = "Pins:"
        this.collectedStampsText.text = `${pins.length}`
        this.pageText.visible = true
        this.pageNumberText.visible = true
        this.coverBtn.visible = true

        this.upArrow.x = 1332
        this.upArrow.y = 255
        this.downArrow.x = 1332
        this.downArrow.y = 740

        const startIdx = this.offset * this.pinsPerPage
        const pagePins = pins.slice(startIdx, startIdx + this.pinsPerPage)

        const baseX = 240
        const baseY = 280
        const stepX = 155
        const stepY = 155

        for (let i = 0; i < pagePins.length; i++) {
            const itemId = pagePins[i]
            const col = i % this.pinCols
            const row = Math.floor(i / this.pinCols)
            const px = baseX + stepX * col
            const py = baseY + stepY * row

            const pinImg = this.scene.add.image(px, py)
            pinImg.setScale(1.0)
            this.stampContainer.add(pinImg)

            const pinKey = `clothing/icon/120/${itemId}`
            if (this.scene.textures.exists(pinKey)) {
                pinImg.setTexture(pinKey)
            } else {
                const spinner = this.scene.add.image(px, py, "main", "spinner")
                this.stampContainer.add(spinner)
                this.scene.tweens.add({
                    targets: spinner,
                    angle: { from: 0, to: 180 },
                    duration: 900,
                    repeat: -1,
                    ease: "Cubic"
                })
                this.loadPinIcon(itemId, pinImg, spinner)
            }

            const hitArea = this.scene.add.rectangle(px, py, 120, 120)
            this.stampContainer.add(hitArea)
            new Interactive(hitArea)

            const itemData = this.crumbs.items?.[itemId]
            const itemName = itemData?.name || `Item ${itemId}`

            hitArea.on("pointerover", () => this.showPinTooltip(px, py - 80, itemName))
            hitArea.on("pointerout", () => this.hideTooltip())
        }

        const totalPages = Math.ceil(pins.length / this.pinsPerPage)
        this.pageNumberText.text = `${this.offset + 1} of ${totalPages || 1}`
        this.upArrow.visible = this.offset > 0
        this.downArrow.visible = this.offset < totalPages - 1
    }

    showPinTooltip(x, y, name) {
        this.hideTooltip()

        const container = this.scene.add.container(x, y)
        this.stampContainer.add(container)

        const bubble = this.scene.add.image(0, 0, "stampbook-inside", "chatBubble")
        bubble.setScale(1.1)
        container.add(bubble)

        const title = this.scene.add.text(0, -20, name, {
            fontFamily: "Burbank Small, Arial",
            fontSize: "24px",
            fontStyle: "bold",
            color: "#000000",
            align: "center",
            wordWrap: { width: 250 }
        })
        title.setOrigin(0.5, 0.5)
        container.add(title)

        this.tooltipContainer = container
    }

    // ── Stamps page ──

    showStamps(category) {
        this.categoryTitle.text = category.name
        this.categoryTitle.x = 292
        this.categoryImage.visible = true
        this.insideLines.visible = true

        const stamps = [...category.stamps].sort((a, b) => a.rank - b.rank)
        const earned = stamps.filter(s => this.earnedSet.has(s.stamp_id)).length

        this.categoryTitleSmall.text = `${category.name}:`
        this.collectedStampsText.text = `${earned}/${stamps.length}`
        this.pageText.visible = true
        this.pageNumberText.visible = true
        this.pageNumberText.text = `${this.page} of ${this.pages.length}`
        this.coverBtn.visible = true

        this.upArrow.x = 1332
        this.upArrow.y = 255
        this.downArrow.x = 1332
        this.downArrow.y = 740

        const startIdx = this.offset * this.stampsPerPage
        const pageStamps = stamps.slice(startIdx, startIdx + this.stampsPerPage)

        const baseX = 230
        const baseY = 254
        const stepX = 180
        const stepY = 170

        for (let i = 0; i < pageStamps.length; i++) {
            const stamp = pageStamps[i]
            const col = i % this.stampCols
            const row = Math.floor(i / this.stampCols)
            const sx = baseX + stepX * col
            const sy = baseY + stepY * row

            const isEarned = this.earnedSet.has(stamp.stamp_id)

            const stampImg = this.scene.add.image(sx, sy)
            stampImg.setScale(1.0)
            if (!isEarned) stampImg.setAlpha(0.4)
            this.stampContainer.add(stampImg)

            const stampKey = `sb-stamp-${stamp.stamp_id}`
            if (this.scene.textures.exists(stampKey)) {
                stampImg.setTexture(stampKey)
            } else {
                const spinner = this.scene.add.image(sx, sy, "main", "spinner")
                this.stampContainer.add(spinner)
                this.scene.tweens.add({
                    targets: spinner,
                    angle: { from: 0, to: 180 },
                    duration: 900,
                    repeat: -1,
                    ease: 'Cubic'
                })
                this.loadStampImage(stamp.stamp_id, stampImg, spinner)
            }

            const hitArea = this.scene.add.rectangle(sx, sy, 160, 140)
            this.stampContainer.add(hitArea)
            new Interactive(hitArea)
            hitArea.on('pointerover', () => this.showTooltip(sx, sy - 130, stamp, isEarned))
            hitArea.on('pointerout', () => this.hideTooltip())
        }

        const totalPages = Math.ceil(stamps.length / this.stampsPerPage)
        this.upArrow.visible = this.offset > 0
        this.downArrow.visible = this.offset < totalPages - 1
    }

    showTooltip(x, y, stamp, isEarned) {
        this.hideTooltip()

        const container = this.scene.add.container(x, y)
        this.stampContainer.add(container)

        const bubble = this.scene.add.image(0, 0, "stampbook-inside", "chatBubble")
        bubble.setScale(1.1)
        container.add(bubble)

        const title = this.scene.add.text(0, -38, stamp.name, {
            fontFamily: "Burbank Small, Arial",
            fontSize: "24px",
            fontStyle: "bold",
            color: "#000000",
            align: "center",
            wordWrap: { width: 250 }
        })
        title.setOrigin(0.5, 0)
        container.add(title)

        if (stamp.description) {
            const desc = this.scene.add.text(0, title.y + title.height + 2, stamp.description, {
                fontFamily: "Burbank Small, Arial",
                fontSize: "18px",
                color: "#595959",
                align: "center",
                wordWrap: { width: 250 }
            })
            desc.setOrigin(0.5, 0)
            container.add(desc)
        }

        this.tooltipContainer = container
    }

    hideTooltip() {
        if (this.tooltipContainer) {
            this.tooltipContainer.destroy()
            this.tooltipContainer = null
        }
    }

    // ── Navigation ──

    onNext() {
        if (this.page < this.pages.length) {
            this.offset = 0
            this.page++
            this.updatePage()
        }
    }

    onPrev() {
        this.offset = 0
        this.page--
        if (this.page < 0) this.page = 0
        this.updatePage()
    }

    onCover() {
        this.offset = 0
        this.page = 0
        this.updatePage()
    }

    onScrollDown() {
        this.offset++
        this.updatePage()
    }

    onScrollUp() {
        if (this.offset > 0) {
            this.offset--
            this.updatePage()
        }
    }

    setCategory(group) {
        this.offset = 0
        const idx = this.pages.findIndex(p => p.group_id === group.group_id)
        if (idx >= 0) {
            this.page = idx + 1
        }
        this.updatePage()
    }

    updateNavVisibility() {
        this.prevPageBtn.visible = this.page > 0
        this.nextPageBtn.visible = this.page < this.pages.length
    }

    getStampsForGroup(group) {
        const stamps = [...(group.stamps || [])]
        const subgroups = this.allGroups.filter(g => g.parent_group_id === group.group_id)
        for (const sub of subgroups) {
            stamps.push(...(sub.stamps || []))
            const subsubs = this.allGroups.filter(g => g.parent_group_id === sub.group_id)
            for (const subsub of subsubs) {
                stamps.push(...(subsub.stamps || []))
            }
        }
        return stamps
    }

    getAllStampCount() {
        let count = 0
        for (const g of this.allGroups) {
            count += (g.stamps || []).length
        }
        return count
    }

    clearStamps() {
        this.hideTooltip()
        this.stampContainer.removeAll(true)
    }

}
