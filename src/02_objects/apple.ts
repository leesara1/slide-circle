import Phaser from "phaser";

export class Apple {
  public sprite: Phaser.GameObjects.Image;
  public readonly number: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.number = Phaser.Math.Between(1, 5);
    this.sprite = scene.add.image(x, y, `apple${this.number}`);
    this.sprite.setOrigin(0.5, 1);
    const isMobile = scene.scale.width < 600;
    this.sprite.setScale(isMobile ? 0.6 : 1);
  }

  getHeight(): number {
    return this.sprite.displayHeight;
  }
}
