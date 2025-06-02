import "./styles.css";

export class TimeHUD {
  private timeEl: HTMLElement;

  constructor() {
    this.timeEl = document.createElement("div");
    this.timeEl.id = "time-ui";
    this.timeEl.className = "hud-ui";
    this.timeEl.innerText = "남은 시간: 20";
    document.body.appendChild(this.timeEl);
  }

  update(seconds: number) {
    this.timeEl.innerText = `남은 시간: ${seconds}`;
  }

  destroy() {
    this.timeEl.remove();
  }
}
