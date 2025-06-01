import Phaser from "phaser";
import { StartScene } from "./01_scenes/StartScene";
import { GameScene } from "./01_scenes/GameScene";
import { ResultScene } from "./01_scenes/ResultScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#222222",
  scene: [StartScene, GameScene, ResultScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

new Phaser.Game(config);
