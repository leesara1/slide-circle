import Phaser from "phaser";
import { preloadCommonSounds, SOUND_KEYS } from "../05_assets/sounds";
import { Direction } from "../07_constants/direction";
import { Apple } from "../02_objects/apple";
import { preloadAppleImages } from "../05_assets/images";
import { InputController } from "../04_controllers/inputController";
import { ScoreHUD } from "../08_ui/ScoreHUD";
import { ScoreManager } from "../03_managers/scoreManager";
import { TimeManager } from "../03_managers/timeManager";
import { TimeHUD } from "../08_ui/TimeHUD";

export class GameScene extends Phaser.Scene {
  private leftStack: Apple[] = [];
  private rightStack: Apple[] = [];
  private currentApple?: Apple;
  private score = 0;
  private readonly MAX_STACK = 10;

  private scoreManager!: ScoreManager;
  private scoreHUD!: ScoreHUD;
  private timeManager!: TimeManager;
  private timeHUD!: TimeHUD;

  constructor() {
    super("GameScene");
  }

  preload() {
    preloadAppleImages(this);
    preloadCommonSounds(this);
  }

  create() {
    this.scoreHUD = new ScoreHUD();
    this.scoreManager = new ScoreManager(this.scoreHUD);
    this.timeHUD = new TimeHUD();
    this.timeManager = new TimeManager(
      20,
      () => {
        const score = this.scoreManager.getScore();
        this.scene.start("ResultScene", { score });
      },
      this.timeHUD
    );

    this.events.once("shutdown", () => {
      this.scoreHUD.destroy();
      this.timeHUD.destroy();
    });

    new InputController(this, 30, (dir: Direction) => {
      if (!this.currentApple) return;

      switch (dir) {
        case Direction.LEFT:
        case Direction.RIGHT:
          this.slideAppleTo(dir);
          break;
        case Direction.UP:
          this.replaceApple();
          break;
        case Direction.DOWN:
          break;
      }
    });

    this.currentApple = this.spawnApple();
  }

  update(time: number, delta: number) {
    this.timeManager.update(delta);
  }

  private slideAppleTo(direction: Direction) {
    if (!this.currentApple) return;

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const isMobile = width < 600;

    const STACK_X_OFFSET = isMobile ? 100 : 180;
    const STACK_BOTTOM_MARGIN = isMobile ? 80 : 100;
    const APPLE_HEIGHT = isMobile ? 50 : 80;

    const stack =
      direction === Direction.LEFT ? this.leftStack : this.rightStack;

    const x =
      direction === Direction.LEFT ? STACK_X_OFFSET : width - STACK_X_OFFSET;
    const y = height - STACK_BOTTOM_MARGIN - stack.length * APPLE_HEIGHT;

    const apple = this.currentApple;
    const sprite = apple.sprite;
    this.currentApple = undefined;

    this.sound.play(SOUND_KEYS.CLICK);

    this.tweens.add({
      targets: sprite,
      x,
      y,
      duration: 200,
      onComplete: () => {
        stack.push(apple);
        this.checkStack(direction);
        this.currentApple = this.spawnApple();
      },
    });
  }

  private replaceApple() {
    this.currentApple?.sprite.destroy(); // 현재 사과 제거
    this.currentApple = this.spawnApple(); // 새 사과 생성
  }

  private spawnApple() {
    const x = this.cameras.main.centerX;
    return new Apple(this, x, 400);
  }

  private getStackNumberSum(stack: Apple[]): number {
    return stack.reduce((sum, apple) => sum + apple.number, 0);
  }

  private checkStack(direction: Direction) {
    const stack =
      direction === Direction.LEFT ? this.leftStack : this.rightStack;
    const totalNumber = this.getStackNumberSum(stack);
    console.log(totalNumber);

    if (totalNumber === this.MAX_STACK) {
      this.scoreManager.increase();
      while (stack.length > 0) {
        const apple = stack.pop();
        apple?.sprite.destroy();
      }
    }

    if (totalNumber > this.MAX_STACK) {
      while (stack.length > 0) {
        const apple = stack.pop();
        apple?.sprite.destroy();
      }
    }
  }
}
