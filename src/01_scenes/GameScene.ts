import Phaser from "phaser";
import { Walls } from "../02_objects/walls";
import { Circle } from "../02_objects/circle";
import { getDistinctColorPair } from "../07_constants/colors";
import { SWIPE_THRESHOLD, MOVE_DURATION } from "../07_constants/constants";
import { InputController } from "../04_controllers/inputController";
import { ScoreManager } from "../03_managers/scoreManager";
import { TimeManager } from "../03_managers/timeManager";
import { Direction } from "../07_constants/direction";
import { preloadCommonSounds } from "../05_assets/sounds";
import { ScoreHUD } from "../08_ui/ScoreHUD";
import { TimeHUD } from "../08_ui/TimeHUD";
import { createResultUI } from "../08_ui/ResultUI";

export class GameScene extends Phaser.Scene {
  private scoreHud?: ScoreHUD;
  private timeHud?: TimeHUD;
  private walls!: Walls;
  private circle!: Circle;
  private inputController!: InputController;
  private scoreManager!: ScoreManager;
  private timeManager!: TimeManager;

  private isMoving = false;
  private moveDirection: Direction | null = null;

  constructor() {
    super("GameScene");
  }

  preload() {
    preloadCommonSounds(this);
  }

  create() {
    // HUD 생성은 start 버튼 누를 때 외부에서 호출되도록
    const { left: leftColor, right: rightColor } = getDistinctColorPair();

    this.walls = new Walls(this);
    this.walls.createWalls(leftColor, rightColor);

    this.circle = new Circle(this);
    this.circle.createCircle(leftColor);

    this.scoreHud = new ScoreHUD();
    this.timeHud = new TimeHUD();
    this.scoreManager = new ScoreManager();
    this.timeManager = new TimeManager(20, () => this.endGame());

    this.time.delayedCall(200, () => {
      this.inputController = new InputController(
        this,
        SWIPE_THRESHOLD,
        (direction) => {
          if (!this.isMoving) this.startMove(direction as Direction);
        }
      );
    });

    this.events.once("shutdown", () => {
      this.scoreHud?.destroy();
      this.timeHud?.destroy();
    });
  }

  update(time: number, delta: number) {
    this.timeManager.update(delta);
    this.timeHud?.update(this.timeManager.getRemainingSeconds());

    if (!this.isMoving) return;

    const targetX = this.getTargetX();
    const currentX = this.circle.circle.x;
    const dist = Math.abs(targetX - currentX);
    const step = (delta / MOVE_DURATION) * Math.max(dist, 100);

    if (this.moveDirection === Direction.LEFT) {
      const newX = Math.max(currentX - step, targetX);
      this.circle.circle.x = newX;
      if (newX <= targetX + 1) this.completeMove(Direction.LEFT);
    } else if (this.moveDirection === Direction.RIGHT) {
      const newX = Math.min(currentX + step, targetX);
      this.circle.circle.x = newX;
      if (newX >= targetX - 1) this.completeMove(Direction.RIGHT);
    }

    this.checkWallCollision();
  }

  private checkWallCollision() {
    const circleX = this.circle.circle.x;
    const circleRadius = this.circle.RADIUS;

    const leftWallRight = this.walls.leftWall.x + this.walls.WIDTH / 2;
    if (
      circleX - circleRadius <= leftWallRight &&
      this.isMoving &&
      this.moveDirection === Direction.LEFT
    ) {
      this.completeMove(Direction.LEFT);
    }

    const rightWallLeft = this.walls.rightWall.x - this.walls.WIDTH / 2;
    if (
      circleX + circleRadius >= rightWallLeft &&
      this.isMoving &&
      this.moveDirection === Direction.RIGHT
    ) {
      this.completeMove(Direction.RIGHT);
    }
  }

  private getTargetX(): number {
    if (!this.moveDirection) return this.circle.circle.x;

    return this.moveDirection === Direction.LEFT
      ? this.walls.leftWall.x + this.walls.WIDTH / 2 + this.circle.RADIUS
      : this.walls.rightWall.x - this.walls.WIDTH / 2 - this.circle.RADIUS;
  }

  private completeMove(direction: Direction) {
    if (!this.isMoving) return;
    this.isMoving = false;
    this.checkMatch(direction);
  }

  private startMove(direction: Direction) {
    if (this.isMoving) return;
    this.isMoving = true;
    this.moveDirection = direction;
  }

  private checkMatch(wallSide: Direction) {
    const matched = this.isColorMatched(wallSide);

    if (matched) {
      this.circle.explodeSuccessEnhanced(() => {
        this.scoreManager.increase();
        this.scoreHud?.update(this.scoreManager.getScore());
        this.resetCircleAndWalls();
        this.isMoving = false;
        this.moveDirection = null;
      });
    } else {
      this.circle.explodeFailureEnhanced(() => {
        this.resetCircleAndWalls();
        this.isMoving = false;
        this.moveDirection = null;
      });
    }
  }

  private isColorMatched(wallSide: Direction): boolean {
    return wallSide === Direction.LEFT
      ? this.circle.color === this.walls.leftColor
      : this.circle.color === this.walls.rightColor;
  }

  private resetCircleAndWalls() {
    const { left: leftColor, right: rightColor } = getDistinctColorPair();

    this.walls.leftWall.setFillStyle(leftColor);
    this.walls.rightWall.setFillStyle(rightColor);
    this.walls.leftColor = leftColor;
    this.walls.rightColor = rightColor;

    const newCircleColor = Phaser.Utils.Array.GetRandom([
      leftColor,
      rightColor,
    ]);

    this.circle.setColor(newCircleColor);
    this.circle.resetPosition();
    this.circle.circle.setAlpha(1);
    this.circle.circle.setScale(1);
  }

  endGame() {
    const score = this.scoreManager.getScore();
    this.scene.start("ResultScene", { score });
  }
}
