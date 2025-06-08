export class ScoreHUD {
  private scoreEl: HTMLDivElement;
  private leftStackEl: HTMLDivElement;
  private rightStackEl: HTMLDivElement;

  constructor() {
    this.scoreEl = document.createElement("div");
    this.scoreEl.id = "score-ui";
    this.scoreEl.className = "hud-ui";
    this.scoreEl.innerText = "0";
    document.body.appendChild(this.scoreEl);

    this.leftStackEl = document.createElement("div");
    this.leftStackEl.id = "left-stack-ui";
    this.leftStackEl.className = "hud-ui";
    this.leftStackEl.innerText = "0";
    document.body.appendChild(this.leftStackEl);

    this.rightStackEl = document.createElement("div");
    this.rightStackEl.id = "right-stack-ui";
    this.rightStackEl.className = "hud-ui";
    this.rightStackEl.innerText = "0";
    document.body.appendChild(this.rightStackEl);
  }

  update(score: number) {
    this.scoreEl.innerText = `${score}`;
  }

  updateStacks(leftTotal: number, rightTotal: number) {
    this.leftStackEl.innerText = `${leftTotal}`;
    this.rightStackEl.innerText = `${rightTotal}`;
  }

  destroy() {
    this.scoreEl.remove();
    this.leftStackEl.remove();
    this.rightStackEl.remove();
  }
}
