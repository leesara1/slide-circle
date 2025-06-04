import Phaser from "phaser";
import { Direction } from "../07_constants/direction";

export class InputController {
  private scene: Phaser.Scene;
  private startX = 0;
  private startY = 0;
  private threshold: number;
  private callback: (direction: Direction) => void;

  constructor(
    scene: Phaser.Scene,
    threshold: number,
    callback: (dir: Direction) => void
  ) {
    this.scene = scene;
    this.threshold = threshold;
    this.callback = callback;

    this.scene.input.on("pointerdown", this.onPointerDown, this);
    this.scene.input.on("pointerup", this.onPointerUp, this);
  }

  private onPointerDown(pointer: Phaser.Input.Pointer) {
    this.startX = pointer.x;
    this.startY = pointer.y;
  }

  private onPointerUp(pointer: Phaser.Input.Pointer) {
    const dx = pointer.x - this.startX;
    const dy = pointer.y - this.startY;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // 슬라이드 방향 결정
    if (absDx > absDy && absDx > this.threshold) {
      this.callback(dx > 0 ? Direction.RIGHT : Direction.LEFT);
    } else if (absDy > this.threshold) {
      this.callback(dy > 0 ? Direction.DOWN : Direction.UP);
    } else {
      // 슬라이드가 아닌 클릭일 경우 (중앙 기준 좌우로 처리)
      const centerX = this.scene.cameras.main.centerX;
      this.callback(pointer.x < centerX ? Direction.LEFT : Direction.RIGHT);
    }
  }

  disable() {
    this.scene.input.off("pointerdown", this.onPointerDown, this);
    this.scene.input.off("pointerup", this.onPointerUp, this);
  }
}
