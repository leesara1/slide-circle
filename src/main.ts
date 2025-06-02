import Phaser from "phaser";
import { StartScene } from "./01_scenes/StartScene";
import { GameScene } from "./01_scenes/GameScene";
import { ResultScene } from "./01_scenes/ResultScene";

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
  scene: [StartScene, GameScene, ResultScene],
  parent: "app",
};

const game = new Phaser.Game(config);
