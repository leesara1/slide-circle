import Phaser from 'phaser';

type TextOptions = Partial<Phaser.Types.GameObjects.Text.TextStyle>;

export function createText(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    style: TextOptions = {}
) {
    return scene.add.text(x, y, text, {
        fontFamily: 'Noto Sans',
        fontSize: '24px',
        color: '#ffffff',
        ...style,
    });
}

export function createCenteredText(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    style: TextOptions = {}
) {
    return createText(scene, x, y, text, style).setOrigin(0.5);
}
