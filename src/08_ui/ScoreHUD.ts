export class ScoreHUD {
  private scoreEl: HTMLDivElement;

  constructor() {
    this.scoreEl = document.createElement("div");
    this.scoreEl.id = "score-ui";
    this.scoreEl.className = "hud-ui";
    this.scoreEl.innerText = "0";
    document.body.appendChild(this.scoreEl);
  }

  update(score: number) {
    this.scoreEl.innerText = `${score}`;
  }

  destroy() {
    this.scoreEl.remove();
  }
}
