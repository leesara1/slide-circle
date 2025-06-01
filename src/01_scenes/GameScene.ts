import Phaser from "phaser";
import { Walls } from "../02_objects/walls";
import { Circle } from "../02_objects/circle";
import { getDistinctColorPair } from "../07_constants/colors";
import { SWIPE_THRESHOLD, MOVE_DURATION } from "../07_constants/constants";
import { InputController } from "../04_controllers/inputController";
import { ScoreManager } from "../03_managers/scoreManager";
import { Direction } from "../07_constants/direction";

export class GameScene extends Phaser.Scene {
  private walls!: Walls;
  private circle!: Circle;
  private _inputController!: InputController;
  private scoreManager!: ScoreManager;

  private isMoving = false;
  private moveDirection: Direction | null = null;

  constructor() {
    super("GameScene");
  }

  create() {
    const { left: leftColor, right: rightColor } = getDistinctColorPair();

    this.walls = new Walls(this);
    this.walls.createWalls(leftColor, rightColor);

    this.circle = new Circle(this);
    this.circle.createCircle(leftColor);

    this.scoreManager = new ScoreManager(this);

    this._inputController = new InputController(
      this,
      SWIPE_THRESHOLD,
      (direction) => {
        console.log("👆 Swipe Detected:", direction);
        if (!this.isMoving) this.startMove(direction as Direction);
      }
    );
  }

  update(_time: number, delta: number) {
    if (!this.isMoving) return;

    const targetX = this.getTargetX();
    const currentX = this.circle.circle.x;
    const dist = Math.abs(targetX - currentX);
    const step = (delta / MOVE_DURATION) * Math.max(dist, 100); // 최소 이동 속도 보장

    console.log(
      `Moving: current=${currentX.toFixed(1)}, target=${targetX.toFixed(
        1
      )}, step=${step.toFixed(1)}`
    );

    if (this.moveDirection === Direction.LEFT) {
      const newX = Math.max(currentX - step, targetX);
      this.circle.circle.x = newX;

      // 도착 조건 확인 (여유를 둬서 확인)
      if (newX <= targetX + 1) {
        console.log("👆 LEFT 벽 도착!");
        this.completeMove(Direction.LEFT);
      }
    } else if (this.moveDirection === Direction.RIGHT) {
      const newX = Math.min(currentX + step, targetX);
      this.circle.circle.x = newX;

      // 도착 조건 확인 (여유를 둬서 확인)
      if (newX >= targetX - 1) {
        console.log("👆 RIGHT 벽 도착!");
        this.completeMove(Direction.RIGHT);
      }
    }

    // 추가 안전장치: 벽 경계를 넘어가지 않도록
    this.checkWallCollision();
  }

  private checkWallCollision() {
    const circleX = this.circle.circle.x;
    const circleRadius = this.circle.RADIUS;

    // 왼쪽 벽 충돌 체크
    const leftWallRight = this.walls.leftWall.x + this.walls.WIDTH / 2;
    if (circleX - circleRadius <= leftWallRight) {
      console.log("🔴 왼쪽 벽 충돌 감지!");
      if (this.isMoving && this.moveDirection === Direction.LEFT) {
        this.completeMove(Direction.LEFT);
      }
    }

    // 오른쪽 벽 충돌 체크
    const rightWallLeft = this.walls.rightWall.x - this.walls.WIDTH / 2;
    if (circleX + circleRadius >= rightWallLeft) {
      console.log("🔴 오른쪽 벽 충돌 감지!");
      if (this.isMoving && this.moveDirection === Direction.RIGHT) {
        this.completeMove(Direction.RIGHT);
      }
    }
  }

  private getTargetX(): number {
    if (!this.moveDirection) return this.circle.circle.x;

    return this.moveDirection === Direction.LEFT
      ? this.walls.leftWall.x + this.walls.WIDTH / 2 + this.circle.RADIUS
      : this.walls.rightWall.x - this.walls.WIDTH / 2 - this.circle.RADIUS;
  }

  private completeMove(direction: Direction) {
    if (!this.isMoving) return; // 중복 호출 방지

    console.log(`👆 ${direction} 끝 도착 - checkMatch 호출 직전`);
    console.log(
      `Circle position: ${this.circle.circle.x}, Target: ${this.getTargetX()}`
    );

    this.isMoving = false;
    this.checkMatch(direction);
  }

  private startMove(direction: Direction) {
    if (this.isMoving) return;

    console.log(`🚀 ${direction} 방향으로 이동 시작`);
    this.isMoving = true;
    this.moveDirection = direction;
  }

  private checkMatch(wallSide: Direction) {
    const matched = this.isColorMatched(wallSide);
    console.log(`🎯 매치 체크: ${matched ? "성공" : "실패"} (${wallSide})`);

    if (matched) {
      // 성공했을 때 - 화려한 애니메이션
      this.circle.explodeSuccess(() => {
        console.log("✅ Matched! 점수 증가");
        this.scoreManager.increase();
        this.resetCircleAndWalls();
        this.isMoving = false;
        this.moveDirection = null;
      });
    } else {
      // 실패했을 때 - 거친 애니메이션
      this.circle.explodeFailure(() => {
        console.log("❌ 색상이 안 맞음");
        // 실패시에는 점수 증가 없음
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

    console.log(`🔄 리셋: 새 색상 - Left: ${leftColor}, Right: ${rightColor}`);

    this.walls.leftWall.setFillStyle(leftColor);
    this.walls.rightWall.setFillStyle(rightColor);
    this.walls.leftColor = leftColor;
    this.walls.rightColor = rightColor;

    const newCircleColor = Phaser.Utils.Array.GetRandom([
      leftColor,
      rightColor,
    ]);

    console.log(`🟡 새 원 색상: ${newCircleColor}`);

    this.circle.setColor(newCircleColor);
    this.circle.resetPosition();
    this.circle.circle.setAlpha(1);
    this.circle.circle.setScale(1);
  }
}
