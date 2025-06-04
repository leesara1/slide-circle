export function preloadAppleImages(scene: Phaser.Scene) {
  for (let i = 1; i <= 5; i++) {
    scene.load.image(`apple${i}`, `assets/images/apple${i}.png`);
  }
}
