import Phaser from "phaser";

export class InputController {
  private scene: Phaser.Scene;
  private startX = 0;
  private startY = 0;
  private threshold: number;
  private callback: (direction: "left" | "right") => void;

  constructor(
    scene: Phaser.Scene,
    threshold: number,
    callback: (dir: "left" | "right") => void
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

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > this.threshold) {
      if (dx > 0) this.callback("right");
      else this.callback("left");
    }
  }

  disable() {
    this.scene.input.off("pointerdown", this.onPointerDown, this);
    this.scene.input.off("pointerup", this.onPointerUp, this);
  }
}
