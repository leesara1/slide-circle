import Phaser from "phaser";
import { createResultUI } from "../08_ui/ResultUI";

export class ResultScene extends Phaser.Scene {
  constructor() {
    super("ResultScene");
  }

  create(data: { score: number }) {
    createResultUI(data.score, () => {
      this.scene.start("StartScene");
    });
  }

  shutdown() {
    document.getElementById("result-ui")?.remove();
  }
}
