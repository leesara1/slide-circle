import Phaser from 'phaser';
import { createCenteredText } from '../08_ui/createText';
import { createButton } from '../08_ui/createButton';

export class ResultScene extends Phaser.Scene {
    private finalScore = 0;

    constructor() {
        super('ResultScene');
    }

    init(data: { score: number }) {
        this.finalScore = data.score;
    }

    create() {
        const { width, height } = this.scale;

        createCenteredText(this, width / 2, height / 2 - 80, '[게임 결과]');

        createCenteredText(this, width / 2, height / 2 - 20, `점수: ${this.finalScore}`);

        createButton(this, width / 2, height / 2 + 60, '다시 시작', {
            onClick: () => this.scene.start('GameScene'),
        });
    }
}
