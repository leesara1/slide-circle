import Phaser from 'phaser';

type ButtonOptions = {
    onClick?: () => void;
    textStyle?: Partial<Phaser.Types.GameObjects.Text.TextStyle>;
    backgroundColor?: string;
    padding?: Phaser.Types.GameObjects.Text.TextPadding;
};

export function createButton(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string,
    options: ButtonOptions = {}
) {
    const {
        onClick,
        textStyle = {},
        backgroundColor = '#333',
        padding = { left: 16, right: 16, top: 8, bottom: 8 },
    } = options;

    const btn = scene.add.text(x, y, label, {
        fontFamily: 'Noto Sans',
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor,
        padding,
        ...textStyle,
    })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

    if (onClick) {
        btn.on('pointerdown', () => {
            scene.sound?.play?.('click'); // 선택적 효과음
            onClick();
        });
    }

    return btn;
}
