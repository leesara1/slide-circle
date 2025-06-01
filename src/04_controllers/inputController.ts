import Phaser from "phaser";

export class InputController {
  private startX = 0;
  private startY = 0;
  private threshold: number;
  private callback: (direction: "left" | "right") => void;

  constructor(
    scene: Phaser.Scene,
    threshold: number,
    callback: (dir: "left" | "right") => void
  ) {
    this.threshold = threshold;
    this.callback = callback;

    scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      this.startX = pointer.x;
      this.startY = pointer.y;
    });

    scene.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
      const dx = pointer.x - this.startX;
      const dy = pointer.y - this.startY;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > this.threshold) {
        if (dx > 0) this.callback("right");
        else this.callback("left");
      }
    });
  }
}
