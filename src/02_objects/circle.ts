import Phaser from "phaser";
import { SOUND_KEYS } from "../05_assets/sounds";

export class Circle {
  scene: Phaser.Scene;
  circle!: Phaser.GameObjects.Arc;
  color!: number;

  readonly RADIUS = 80;
  startX: number;
  startY: number;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    const width = this.scene.cameras.main.width;
    const height = this.scene.cameras.main.height;

    // 화면 기준 중앙에 위치
    this.startX = width / 2;
    this.startY = height / 2;
  }

  createCircle(color: number) {
    this.color = color;
    this.circle = this.scene.add.circle(
      this.startX,
      this.startY,
      this.RADIUS,
      color
    );
  }

  setColor(color: number) {
    this.color = color;
    this.circle.setFillStyle(color);
  }

  resetPosition() {
    this.circle.setPosition(this.startX, this.startY);
    this.circle.setStrokeStyle(0);
  }

  explodeSuccessEnhanced(onComplete: () => void) {
    this.scene.sound.play(SOUND_KEYS.EXPLODE_SUCCESS);

    // 여러 개의 작은 원들이 퍼져나가는 효과
    const numParticles = 8;
    for (let i = 0; i < numParticles; i++) {
      const angle = (i / numParticles) * Math.PI * 2;
      const particle = this.scene.add.circle(
        this.circle.x,
        this.circle.y,
        5,
        this.color
      );

      this.scene.tweens.add({
        targets: particle,
        x: this.circle.x + Math.cos(angle) * 100,
        y: this.circle.y + Math.sin(angle) * 100,
        alpha: 0,
        scale: 0,
        duration: 350,
        ease: "Power2",
        onComplete: () => particle.destroy(),
      });
    }

    // 메인 원 애니메이션
    this.scene.tweens.add({
      targets: this.circle,
      scale: 2.5,
      alpha: 0,
      duration: 350,
      ease: "Elastic.easeOut",
      onComplete: () => {
        console.log("✨ 향상된 성공 애니메이션 완료!");
        onComplete();
      },
    });
  }

  explodeFailureEnhanced(onComplete: () => void) {
    this.scene.sound.play(SOUND_KEYS.EXPLODE_FAILURE);

    // 강한 진동
    this.scene.cameras.main.shake(300, 0.007);

    // 원이 여러 조각으로 나뉘는 효과
    const numFragments = 6;
    for (let i = 0; i < numFragments; i++) {
      const fragment = this.scene.add.circle(
        this.circle.x,
        this.circle.y,
        this.RADIUS / 3,
        this.color
      );

      const angle = (i / numFragments) * Math.PI * 2;
      const distance = Phaser.Math.Between(30, 70);

      this.scene.tweens.add({
        targets: fragment,
        x: this.circle.x + Math.cos(angle) * distance,
        y: this.circle.y + Math.sin(angle) * distance,
        rotation: Phaser.Math.Between(-Math.PI, Math.PI),
        alpha: 0,
        scale: 0,
        duration: 600,
        ease: "Power2",
        onComplete: () => fragment.destroy(),
      });
    }

    // 메인 원은 바로 사라지기
    this.scene.tweens.add({
      targets: this.circle,
      alpha: 0,
      scale: 0,
      duration: 200,
      onComplete: () => {
        console.log("🔥 향상된 실패 애니메이션 완료!");
        onComplete();
      },
    });
  }
}
