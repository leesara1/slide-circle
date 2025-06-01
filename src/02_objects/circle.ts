import Phaser from "phaser";

export class Circle {
  scene: Phaser.Scene;
  circle!: Phaser.GameObjects.Arc;
  color!: number;

  readonly RADIUS = 30;
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

  // 성공했을 때 - 화려한 폭발
  explodeSuccess(onComplete: () => void) {
    console.log("🎉 성공 애니메이션 시작!");

    // 카메라 살짝 shake (긍정적)
    this.scene.cameras.main.shake(150, 0.005);

    // 성공 애니메이션: 빛나면서 커지기
    this.scene.tweens.add({
      targets: this.circle,
      scale: 3,
      alpha: 0,
      rotation: Math.PI * 2, // 한바퀴 회전
      duration: 400,
      ease: "Back.easeOut",
      onStart: () => {
        // 색상을 밝게 변경 (흰색 또는 황금색)
        this.circle.setStrokeStyle(8, 0xffd700); // 황금색 테두리
      },
      onComplete: () => {
        console.log("🎉 성공 애니메이션 완료!");
        onComplete();
      },
    });
  }

  // 실패했을 때 - 거친 폭발
  explodeFailure(onComplete: () => void) {
    console.log("💥 실패 애니메이션 시작!");

    // 카메라 강하게 shake (부정적)
    this.scene.cameras.main.shake(300, 0.02);

    // 실패 애니메이션: 진동하면서 깨지듯이
    const originalX = this.circle.x;
    const originalY = this.circle.y;

    // 1단계: 빠르게 진동
    this.scene.tweens.add({
      targets: this.circle,
      x: originalX + Phaser.Math.Between(-10, 10),
      y: originalY + Phaser.Math.Between(-10, 10),
      duration: 80,
      repeat: 4,
      yoyo: true,
      onStart: () => {
        // 색상을 어둡게 변경
        this.circle.setStrokeStyle(4, 0xff0000); // 빨간색 테두리
      },
      onComplete: () => {
        // 2단계: 산산조각 나듯이 사라지기
        this.scene.tweens.add({
          targets: this.circle,
          scale: 0.3,
          alpha: 0,
          rotation: -Math.PI,
          duration: 250,
          ease: "Power3.easeIn",
          onComplete: () => {
            console.log("💥 실패 애니메이션 완료!");
            onComplete();
          },
        });
      },
    });
  }

  // 기존 메서드 (호환성 유지)
  explode(onComplete: () => void) {
    this.explodeSuccess(onComplete);
  }

  // 더 화려한 성공 애니메이션 (선택사항)
  explodeSuccessEnhanced(onComplete: () => void) {
    console.log("✨ 향상된 성공 애니메이션 시작!");

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
        duration: 500,
        ease: "Power2",
        onComplete: () => particle.destroy(),
      });
    }

    // 메인 원 애니메이션
    this.scene.tweens.add({
      targets: this.circle,
      scale: 2.5,
      alpha: 0,
      duration: 500,
      ease: "Elastic.easeOut",
      onComplete: () => {
        console.log("✨ 향상된 성공 애니메이션 완료!");
        onComplete();
      },
    });
  }

  // 더 드라마틱한 실패 애니메이션 (선택사항)
  explodeFailureEnhanced(onComplete: () => void) {
    console.log("🔥 향상된 실패 애니메이션 시작!");

    // 강한 진동
    this.scene.cameras.main.shake(400, 0.03);

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
      const distance = Phaser.Math.Between(50, 120);

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
