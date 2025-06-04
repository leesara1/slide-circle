import type { ScoreHUD } from "../08_ui/ScoreHUD";

export class ScoreManager {
  private score = 0;
  private hud?: ScoreHUD;

  constructor(hud?: ScoreHUD) {
    this.hud = hud;
  }

  increase() {
    this.score++;
    this.hud?.update(this.score); // 자동 UI 반영
  }

  getScore() {
    return this.score;
  }

  reset() {
    this.score = 0;
    this.hud?.update(this.score); // 초기화 반영
  }
}
