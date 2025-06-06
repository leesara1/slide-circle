export class TimeHUD {
  private uiEl: HTMLElement;
  private fillEl: HTMLElement;
  private textEl: HTMLElement;
  private readonly maxSeconds: number;

  constructor(maxSeconds: number = 20) {
    this.maxSeconds = maxSeconds;

    // UI 전체 생성
    this.uiEl = document.createElement("div");
    this.uiEl.id = "time-ui";
    this.uiEl.className = "hud-ui";
    this.uiEl.innerHTML = `
      <div class="time-bar">
        <div class="time-fill"></div>
        <div class="time-text">20</div>
      </div>
    `;
    document.body.appendChild(this.uiEl);

    // 게이지 채우는 부분 참조 저장
    this.fillEl = this.uiEl.querySelector(".time-fill") as HTMLElement;
    this.textEl = this.uiEl.querySelector(".time-text") as HTMLElement;
  }

  update(seconds: number) {
    const percent = Math.max(0, (seconds / this.maxSeconds) * 100);
    this.fillEl.style.width = `${percent}%`;
    this.textEl.innerText = `${Math.ceil(seconds)}`;
  }

  destroy() {
    this.uiEl.remove();
  }
}
