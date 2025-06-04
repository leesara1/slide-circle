import type { TimeHUD } from "../08_ui/TimeHUD";

export class TimeManager {
  private duration: number;
  private remaining: number;
  private onComplete: () => void;
  private hud?: TimeHUD;

  private lastReportedSeconds = -1; // 중복 UI 업데이트 방지

  constructor(seconds: number, onComplete: () => void, hud?: TimeHUD) {
    this.duration = seconds;
    this.remaining = seconds;
    this.onComplete = onComplete;
    this.hud = hud;
  }

  update(delta: number) {
    this.remaining -= delta / 1000;
    if (this.remaining < 0) {
      this.remaining = 0;
    }

    // 남은 시간이 바뀌었을 때만 UI 갱신
    const currentSeconds = Math.ceil(this.remaining);
    if (currentSeconds !== this.lastReportedSeconds) {
      this.lastReportedSeconds = currentSeconds;
      this.hud?.update(currentSeconds);
    }

    if (this.remaining <= 0) {
      this.onComplete();
    }
  }

  getRemainingSeconds(): number {
    return Math.ceil(this.remaining);
  }

  reset() {
    this.remaining = this.duration;
    this.lastReportedSeconds = -1;
    this.hud?.update(this.getRemainingSeconds());
  }
}
