export class ScoreManager {
  private score = 0;

  increase() {
    this.score++;
  }

  getScore() {
    return this.score;
  }

  reset() {
    this.score = 0;
  }
}
