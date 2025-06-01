import Phaser from "phaser";
import { createText } from "../08_ui/createText";

export class ScoreManager {
  private scene: Phaser.Scene;
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.scoreText = createText(this.scene, 20, 10, "점수: 0")
  }

  increase() {
    this.score++;
    this.scoreText.setText(`점수: ${this.score}`);
  }

  getScore() {
    return this.score;
  }
}
