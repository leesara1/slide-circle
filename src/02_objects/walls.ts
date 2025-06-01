import Phaser from "phaser";

export class Walls {
  scene: Phaser.Scene;
  leftWall!: Phaser.GameObjects.Rectangle;
  rightWall!: Phaser.GameObjects.Rectangle;
  leftColor!: number;
  rightColor!: number;

  leftX!: number;
  rightX!: number;
  y!: number;
  readonly WIDTH = 10;
  HEIGHT: number;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    const width = this.scene.cameras.main.width;
    const height = this.scene.cameras.main.height;
    this.HEIGHT = height;

    this.leftX = width * 0.1;
    this.rightX = width * 0.9;
    this.y = height / 2;
  }

  createWalls(leftColor: number, rightColor: number) {
    const halfWidth = this.WIDTH / 2;
    this.leftX = halfWidth;
    this.rightX = this.scene.cameras.main.width - halfWidth;

    this.leftWall = this.scene.add.rectangle(
      this.leftX,
      this.y,
      this.WIDTH,
      this.HEIGHT,
      leftColor
    );

    this.rightWall = this.scene.add.rectangle(
      this.rightX,
      this.y,
      this.WIDTH,
      this.HEIGHT,
      rightColor
    );

    this.leftColor = leftColor;
    this.rightColor = rightColor;
  }
}
