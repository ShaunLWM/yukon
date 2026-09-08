import BaseContainer from '@scenes/base/BaseContainer'
import { Button, Interactive, SimpleButton, ShowHint } from '@components/components'
import OutfitSlot from './OutfitSlot'


export default class Outfitsaver extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 740, y ?? 492)

        // Block clicks from passing through (matches CPJ: rect at -166,35 scaled ~4.79x4.97 on 128x128)
        const blocker = scene.add.rectangle(-166, 35, 128, 128)
        blocker.scaleX = 4.791874314738883
        blocker.scaleY = 4.969437201140557
        this.add(blocker)
        new Interactive(blocker)

        // Background (matches CPJ: nineslice at 103,340 origin 1,1)
        const bg = scene.add.nineslice(103, 340, 'main', 'chatlog/bg', 605, 613, 57, 60, 58, 60)
        bg.setOrigin(1, 1)
        this.add(bg)

        // Wear button
        const useBtn = scene.add.sprite(54, -203, 'main', 'grey-button')
        this.add(useBtn)
        const useBtnComp = new Button(useBtn)
        useBtnComp.spriteName = 'grey-button'
        useBtnComp.callback = () => this.onWear()
        useBtnComp.activeFrame = true
        new ShowHint(useBtn).text = 'Wear Outfit'

        // Save button
        const saveBtn = scene.add.image(54, -83, 'main', 'grey-button')
        this.add(saveBtn)
        const saveBtnComp = new Button(saveBtn)
        saveBtnComp.spriteName = 'grey-button'
        saveBtnComp.callback = () => this.onSave()
        saveBtnComp.activeFrame = true
        new ShowHint(saveBtn).text = 'Save Outfit'

        const saveIcon = scene.add.image(53, -84, 'iglooedit', 'button/save')
        saveIcon.scaleX = 0.3
        saveIcon.scaleY = 0.3
        this.add(saveIcon)

        // Delete button
        const deleteBtn = scene.add.sprite(55, -143, 'main', 'grey-button')
        this.add(deleteBtn)
        const deleteBtnComp = new Button(deleteBtn)
        deleteBtnComp.spriteName = 'grey-button'
        deleteBtnComp.callback = () => this.onDelete()
        deleteBtnComp.activeFrame = true
        new ShowHint(deleteBtn).text = 'Delete Outfit'

        const deleteIcon = scene.add.image(55, -145, 'main', 'grey-x')
        this.add(deleteIcon)

        const useIcon = scene.add.image(54.5, -205, 'main', 'emotes/1-small')
        useIcon.scaleX = 0.8
        useIcon.scaleY = 0.8
        this.add(useIcon)

        // Page 2 (hidden by default)
        this.page2 = scene.add.container(-680, -492)
        this.page2.visible = false
        this.add(this.page2)

        // Page 1
        this.page1 = scene.add.container(-680, -492)
        this.add(this.page1)

        // Create 12 slots
        this.slots = []

        // Page 1 slots (1-6)
        const p1Positions = [
            { x: -360, y: -135 }, { x: -165, y: -135 },
            { x: -360, y: 50 },   { x: -165, y: 50 },
            { x: -360, y: 235 },  { x: -165, y: 235 }
        ]
        for (let i = 0; i < 6; i++) {
            let slot = new OutfitSlot(scene, p1Positions[i].x, p1Positions[i].y)
            slot.slotID = i + 1
            this.slots.push(slot)
            this.page1.add(slot)
        }

        // Page 1 label
        const pageOneLabel = scene.add.text(720, 643, '1/2', {
            color: '#000000ff',
            fontFamily: 'Burbank Small',
            fontSize: '20px'
        })
        this.page1.add(pageOneLabel)

        // Page 2 slots (7-12)
        for (let i = 0; i < 6; i++) {
            let slot = new OutfitSlot(scene, p1Positions[i].x, p1Positions[i].y)
            slot.slotID = i + 7
            this.slots.push(slot)
            this.page2.add(slot)
        }

        // Page 2 label
        const pageTwoLabel = scene.add.text(717, 643, '2/2', {
            color: '#000000ff',
            fontFamily: 'Burbank Small',
            fontSize: '20px'
        })
        this.page2.add(pageTwoLabel)

        // Toggle arrow (slide panel in/out)
        const arrowContainer = scene.add.container(140, -167)
        this.add(arrowContainer)

        const toggleTab = scene.add.image(-26, 280, 'main', 'tab')
        toggleTab.angle = -90
        arrowContainer.add(toggleTab)

        const toggleArrow = scene.add.image(-38, 277, 'main', 'tab-arrow')
        toggleArrow.angle = 90
        arrowContainer.add(toggleArrow)

        const toggleBtn = new SimpleButton(toggleTab)
        toggleBtn.callback = () => this.onArrowClick()

        // Page down button
        const downBtn = scene.add.sprite(54, 280, 'main', 'grey-button')
        this.add(downBtn)
        const downBtnComp = new Button(downBtn)
        downBtnComp.spriteName = 'grey-button'
        downBtnComp.callback = () => this.onPageDown()
        downBtnComp.activeFrame = true

        const downArrow = scene.add.image(53.5, 278, 'main', 'grey-arrow')
        downArrow.flipY = true
        this.add(downArrow)

        // Page up button
        const upBtn = scene.add.sprite(54, 215, 'main', 'grey-button')
        this.add(upBtn)
        const upBtnComp = new Button(upBtn)
        upBtnComp.spriteName = 'grey-button'
        upBtnComp.callback = () => this.onPageUp()
        upBtnComp.activeFrame = true

        const upArrow = scene.add.image(54, 213, 'main', 'grey-arrow')
        this.add(upArrow)

        this.outfits = new Map()
        this.selectedOutfitSlot = null
        this._selectedSlotTile = null
        this.currentPage = 1

        this.network.send('get_all_slots')
    }

    setOutfits(outfitsList) {
        this.outfits = new Map(outfitsList.map(o => [o.slot, o]))
        this.renderPage()
    }

    renderPage() {
        this.clearSelection()

        let slotsPerPage = 6
        let visibleSlots = this.currentPage === 1 ? this.slots.slice(0, 6) : this.slots.slice(6, 12)

        visibleSlots.forEach((slot, i) => {
            let slotNum = (this.currentPage - 1) * slotsPerPage + i + 1
            slot.slotID = slotNum

            let outfit = this.outfits.get(slotNum)

            slot.paperDoll.visible = false
            slot.paperDoll.loadDoll({ head: 0, face: 0, neck: 0, body: 0, hand: 0, feet: 0, photo: 0, color: 1, flag: 0 })
            slot.nameLabel.visible = false
            slot.slotBackground.setFrame('large-box')

            if (outfit) {
                slot.paperDoll.visible = true
                slot.paperDoll.loadDoll(outfit)
                if (outfit.name) {
                    slot.nameLabel.text = outfit.name
                    slot.nameLabel.visible = true
                }
            }
        })
    }

    selectSlot(slotTile) {
        this.clearSelection()
        slotTile.slotBackground.setFrame('large-box-hover')
        this._selectedSlotTile = slotTile
        this.selectedOutfitSlot = slotTile.slotID
    }

    clearSelection() {
        if (this._selectedSlotTile) {
            this._selectedSlotTile.slotBackground.setFrame('large-box')
        }
        this._selectedSlotTile = null
        this.selectedOutfitSlot = null
    }

    onArrowClick() {
        // parentContainer is the wrapper, wrapper's parent is the PlayerCard
        let playerCard = this.parentContainer.parentContainer
        playerCard.inventory.visible = true
        this.visible = false
        this.clearSelection()
        playerCard.outfitarrowContainer.visible = true
    }

    onWear() {
        if (this.selectedOutfitSlot == null) {
            this.interface.prompt.showError('You need to select a save slot')
            return
        }
        this.interface.prompt.showWindow("Are you sure you want to equip this slot?\nYour current outfit won't be saved", 'dual', () => {
            this.network.send('load_slot', { slot: this.selectedOutfitSlot })
            this.interface.prompt.window.visible = false
        })
    }

    onDelete() {
        if (this.selectedOutfitSlot == null) {
            this.interface.prompt.showError('You need to select a save slot')
            return
        }
        this.interface.prompt.showWindow("Are you sure you want to delete this slot?\nThis cannot be undone", 'dual', () => {
            this.network.send('delete_slot', { slot: this.selectedOutfitSlot })
            this.interface.prompt.window.visible = false
        })
    }

    onSave() {
        if (this.selectedOutfitSlot == null) {
            this.interface.prompt.showError('You need to select a save slot')
            return
        }
        this.interface.prompt.showWindow("Are you sure you want to save over this slot?\nThis cannot be undone", 'dual', () => {
            this.network.send('save_outfit', { slot: this.selectedOutfitSlot })
            this.interface.prompt.window.visible = false
        })
    }

    onPageUp() {
        if (this.currentPage <= 1) return
        this.currentPage = 1
        this.page2.visible = false
        this.page1.visible = true
        this.renderPage()
    }

    onPageDown() {
        if (this.currentPage >= 2) return
        this.currentPage = 2
        this.page1.visible = false
        this.page2.visible = true
        this.renderPage()
    }

}
