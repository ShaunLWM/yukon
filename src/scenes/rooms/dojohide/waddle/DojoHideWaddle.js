import BaseContainer from "../../../base/BaseContainer";
import Button from "../../../components/Button";
import ShowHint from "../../../components/ShowHint";
import SeatPoint from "../../../shared_prefabs/seat/SeatPoint";

export default class DojoHideWaddle extends BaseContainer {

    constructor(scene, x, y, matFrame) {
        super(scene, x ?? 0, y ?? 0);

        this.moveToX = 0;
        this.moveToY = 0;

        const mat = scene.add.image(0, 0, "dojohide", matFrame);
        mat.setOrigin(0.5, 0.5);
        this.add(mat);

        const done1 = new SeatPoint(scene, 51, -70);
        done1.visible = false;
        this.add(done1);

        const done0 = new SeatPoint(scene, -49, -70);
        done0.visible = false;
        this.add(done0);

        const seat1 = new SeatPoint(scene, 71, -15);
        seat1.visible = false;
        this.add(seat1);

        const seat0 = new SeatPoint(scene, -60, -15);
        seat0.visible = false;
        this.add(seat0);

        const matButton = new Button(mat);
        matButton.spriteName = matFrame;
        matButton.activeFrame = false;
        matButton.pixelPerfect = true;
        const matShowHint = new ShowHint(mat);
        matShowHint.text = "card_hint";

        seat1.sitFrame = 3;
        seat1.donePoint = done1;
        seat0.sitFrame = 7;
        seat0.donePoint = done0;

        this.seat1 = seat1;
        this.seat0 = seat0;

        mat.on('pointerup', (pointer) => {
            if (pointer.button !== 0) return;
            this.scene.world.client.sendMove(this.moveToX, this.moveToY);
        });
    }
}
