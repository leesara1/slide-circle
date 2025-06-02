import Phaser from "phaser";
import { createStartUI } from "../08_ui/StartUI";

export class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  create() {
    createStartUI(() => {
      this.scene.start("GameScene");
    });
  }

  shutdown() {
    document.getElementById("start-ui")?.remove();
  }
}
