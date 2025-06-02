import Phaser from "phaser";
import { GameScene } from "./01_scenes/GameScene";
import { createStartUI } from "./08_ui/startUI";

const dpr = window.devicePixelRatio || 1;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#222222",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth * dpr,
    height: window.innerHeight * dpr,
  },
  render: { antialias: true },
  scene: [GameScene],
  parent: "app",
};

const game = new Phaser.Game(config);

createStartUI(() => {
  const gameScene = game.scene.getScene("GameScene") as GameScene;
  gameScene.initUI();
  game.scene.start("GameScene");
  gameScene.sound.play("click");
});
