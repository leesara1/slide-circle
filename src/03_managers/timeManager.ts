import Phaser from 'phaser';
import { createText } from '../08_ui/createText';

export class TimeManager {
    private scene: Phaser.Scene;
    private timeLeft: number;
    private timerText!: Phaser.GameObjects.Text;
    private onTimeUp: () => void;

    constructor(scene: Phaser.Scene, durationSec: number, onTimeUp: () => void) {
        this.scene = scene;
        this.timeLeft = durationSec;
        this.onTimeUp = onTimeUp;

        this.timerText = createText(this.scene, scene.scale.width - 120, 10, "");

        this.updateText();
    }

    update(delta: number) {
        this.timeLeft -= delta / 1000;
        if (this.timeLeft <= 0) {
            this.timeLeft = 0;
            this.updateText();
            this.onTimeUp();
        } else {
            this.updateText();
        }
    }

    private updateText() {
        this.timerText.setText('Time: ' + Math.floor(this.timeLeft));
    }

    getTimeLeft() {
        return this.timeLeft;
    }

    stop() {
        this.timeLeft = 0;
        this.updateText();
    }
}
