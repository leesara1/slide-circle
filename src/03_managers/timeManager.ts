export class TimeManager {
  private duration: number; // 전체 시간 (초)
  private remaining: number;
  private onComplete: () => void;

  constructor(seconds: number, onComplete: () => void) {
    this.duration = seconds;
    this.remaining = seconds;
    this.onComplete = onComplete;
  }

  update(delta: number) {
    this.remaining -= delta / 1000;
    if (this.remaining <= 0) {
      this.remaining = 0;
      this.onComplete();
    }
  }

  getRemainingSeconds(): number {
    return Math.ceil(this.remaining);
  }

  reset() {
    this.remaining = this.duration;
  }
}
