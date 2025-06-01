import Phaser from "phaser";

export class ScoreManager {
  private scene: Phaser.Scene;
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.scoreText = this.scene.add.text(10, 10, "score: 0", {
      fontSize: "24px",
      color: "#fff",
    });
  }

  increase() {
    this.score++;
    this.scoreText.setText(`score: ${this.score}`);
  }

  getScore() {
    return this.score;
  }
}
