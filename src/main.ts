import Phaser from "phaser";
import { StartScene } from "./01_scenes/StartScene";
import { GameScene } from "./01_scenes/GameScene";
import { ResultScene } from "./01_scenes/ResultScene";

function setRealVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setRealVh();
window.addEventListener("resize", setRealVh);

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#f2f2f2",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  render: { antialias: true },
  scene: [StartScene, GameScene, ResultScene],
  parent: "app",
};

new Phaser.Game(config);
