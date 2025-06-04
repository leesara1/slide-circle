import Phaser from "phaser";
import { createStartUI } from "../08_ui/StartUI";
import { preloadCommonSounds } from "../05_assets/sounds";
import { preloadAppleImages } from "../05_assets/images";

export class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  preload() {
    preloadAppleImages(this);
    preloadCommonSounds(this);
  }

  create() {
    createStartUI(() => {
      this.scene.start("GameScene");
    });
    // 랜덤 사과 생성
    const randomIndex = Phaser.Math.Between(1, 5);
    const apple = this.add
      .image(250, 150, `apple${randomIndex}`)
      .setInteractive();

    this.input.setDraggable(apple);

    // 클릭하면 소리
    apple.on("pointerdown", () => {
      this.sound.play("click");
    });

    this.input.on("dragstart", () => console.log("drag start"));
    this.input.on(
      "drag",
      (
        pointer: any,
        gameObject: { setPosition: (arg0: any, arg1: any) => void },
        dragX: any,
        dragY: any
      ) => {
        console.log("dragging...");
        gameObject.setPosition(dragX, dragY);
      }
    );
    this.input.on("dragend", () => console.log("drag end"));
  }

  shutdown() {
    document.getElementById("start-ui")?.remove();
  }
}
