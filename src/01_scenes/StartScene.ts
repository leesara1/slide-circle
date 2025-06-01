import Phaser from 'phaser';
import { createCenteredText } from '../08_ui/createText';
import { createButton } from '../08_ui/createButton';
import { preloadCommonSounds } from '../05_assets/sounds';

export class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    preload() {
        preloadCommonSounds(this);
    }

    create() {
        const { width, height } = this.scale;

        createCenteredText(this, width / 2, height / 2 - 100, 'Slide Circle');

        createButton(this, width / 2, height / 2, '게임 시작', {
            onClick: () => this.scene.start('GameScene')
        });
    }
}
